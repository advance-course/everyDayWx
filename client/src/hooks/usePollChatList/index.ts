import { useState, useEffect, useRef } from "react";
import Taro, { usePullDownRefresh, stopPullDownRefresh } from "@tarojs/taro";
import { userInfoApi } from "api/user";
import { getChatListApi, getChatListApiV2, sendTextApi, Message } from "pages/home/chat/api/chat";
import { getDefCoupleInfo, getDefErrorInfo, CoupleInfo, FailMsg } from "hooks/useWatchChatList/entity";
import usePagination from "hooks/usePagination/index";

const app = Taro.getApp();

let isFirst = true;
let timer;

const pollChatList = async function(time) {
  let sendTime = time;
  async function getNewMessage() {
    try {
      const res = await getChatListApiV2({
        userId: app.globalData.lover_user_id
      });
      if ((res.data && res.data.sendTime || 0) > sendTime) {
        Taro.eventCenter.trigger("watchingChatList", res.data);
        sendTime = res.data.sendTime;
      }
      if (!isFirst) { // 是否退出页面判断
        timer = setTimeout(getNewMessage, 1000);
      }
    } catch (error) {
      clearTimeout(timer);
      console.error(error);
    }
  }
  getNewMessage();
};

export default function useWatchChatList() {
  const ref = useRef<Message[]>([]);
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>(getDefCoupleInfo());
  const [failMsg, setFailMsg] = useState<FailMsg>(getDefErrorInfo());
  const [errMsg, setErrMsg] = useState<string>("");
  const [storageList, setStorageList] = useState<Message[]>([]);
  const state = usePagination<Message>(
    getChatListApi,
    { coupleId: app.globalData.couple_id, current: 1, pageSize: 20, total: -1 },
    false
  );
  const { list, errMsg: pageErrMsg, loading, increasing, setIncreasing, setParams, unshift, updateList } = state;

  // page错误信息
  useEffect(() => {
    setErrMsg(pageErrMsg);
  }, [pageErrMsg]);

  // 首次加载时
  useEffect(() => {
    if (!loading && isFirst) {
      setParams({ total: list.pagination.total }); // 保存历史条数
      isFirst = false;
      targetToBottom();
      pollChatList(list.list.length && list.list[0].sendTime || 0);
    }
  }, [loading]);

  // 情侣信息
  useEffect(() => {
    if (!list.list.length) {
      const coupleInfoStorage = Taro.getStorageSync("coupleInfo");
      coupleInfoStorage && setCoupleInfo(coupleInfoStorage);
      const chatStorage = Taro.getStorageSync("chatStorage");
      chatStorage && chatStorage.length && setStorageList(chatStorage);
      targetToBottom();
    }
    Promise.all([userInfoApi(app.globalData.lover_user_id), userInfoApi(app.globalData.host_user_id)])
      .then(res => {
        setCoupleInfo({
          loverInfo: res[0].data,
          hostInfo: res[1].data
        });
      })
      .catch(error => {
        setErrMsg(error);
        console.error(error);
      });
    return () => {
      const list = JSON.parse(JSON.stringify(ref.current))
        .slice(0, 20)
        .reverse();
      Taro.setStorageSync("chatStorage", list);

      // 避免清除时机早于第一次轮询
      // setTimeout(() => clearTimeout(timer), 1000); 偶现没有清除到最新timer 暂弃用

      isFirst = true;
    };
  }, []);

  // 获取新数据后相关操作
  useEffect(() => {
    ref.current = list.list; // 保存数据
    Taro.eventCenter.on("watchingChatList", doc => {
      unshift(doc);
      targetToBottom();
    });
    return () => {
      Taro.eventCenter.off("watchingChatList");
    };
  }, [list.list.length]);

  // 情侣信息缓存
  useEffect(() => {
    Taro.setStorageSync("coupleInfo", coupleInfo);
  }, [coupleInfo]);

  // 发送失败设置状态
  useEffect(() => {
    if (!failMsg.update) return;
    const item = {
      ...list.list[failMsg.index],
      fail: true
    };
    updateList({ item, index: failMsg.index });
    setFailMsg(getDefErrorInfo());
  }, [failMsg.update]);

  // 下拉加载历史聊天
  usePullDownRefresh(() => {
    if (!list.pagination.lastPage) {
      setIncreasing(true);
    } else {
      stopPullDownRefresh();
      Taro.showToast({
        title: "已经到顶了",
        icon: "none",
        duration: 2000
      });
    }
  });

  // 发送文字消息
  const sendText = async function(text) {
    if (!text) {
      Taro.showToast({
        title: "请输入内容",
        icon: "none",
        duration: 2000
      });
      return;
    }
    const doc = {
      userId: app.globalData.host_user_id,
      textContent: text,
      msgType: "text",
      fail: false
    };
    try {
      unshift(doc);
      targetToBottom();
      await sendTextApi({
        text,
        userId: app.globalData.host_user_id,
        coupleId: app.globalData.couple_id
      });
    } catch (error) {
      setFailMsg({ index: list.list.length, update: true });
      console.error(error);
    }
  };

  const targetToBottom = function() {
    Taro.nextTick(() => {
      Taro.pageScrollTo({
        scrollTop: 10000, // 置底
        duration: 0
      });
    });
  };

  return {
    list: JSON.parse(JSON.stringify(list.list)).reverse(),
    storageList,
    errMsg,
    increasing,
    loading,
    coupleInfo,
    sendText
  };
}
