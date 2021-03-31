import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getChatListApi, sendTextApi } from "api/chat";
import { userInfoByOpenIdApi } from "api/user";
import { getDefChatState, getDefErrorInfo, State, FailMsg } from "./entity";
import produce from "immer";

const app = Taro.getApp();

// 监听聊天数据变化
const watchChatList = function(coupleId) {
  const db = Taro.cloud.database({
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: "develop-1gsdlqw8ff792ed2"
  });
  db.collection("chat")
    .where({ coupleId, openId: app.globalData.lover_open_id })
    .watch({
      onChange: onRealtimeMessageSnapshot,
      onError: e => {
        console.error(e);
      }
    });
  function onRealtimeMessageSnapshot(snapshot) {
    console.warn(`收到消息`, snapshot);
    if (snapshot.type === "init") return;
    for (const docChange of snapshot.docChanges) {
      switch (docChange.queueType) {
        case "enqueue": {
          Taro.eventCenter.trigger("watchingChatList", docChange.doc);
        }
      }
    }
  }
};

export default function useWatchChatList() {
  const [state, setState] = useState<State>(getDefChatState());
  const [failMsg, setFailMsg] = useState<FailMsg>(getDefErrorInfo());

  const coupleId = app.globalData.couple_id
  const chatList = state.chatList;

  const setChatList = function(chatList) {
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.chatList = chatList;
      })
    );
  };

  const setErrMsg = function(errMsg) {
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.errMsg = errMsg;
      })
    );
  };

  Taro.eventCenter.off("watchingChatList");
  Taro.eventCenter.on("watchingChatList", doc =>
    setChatList([...chatList, doc])
  );

  // 初始化聊天数据 & 情侣信息
  useEffect(() => {
    Promise.all([
      userInfoByOpenIdApi(app.globalData.lover_open_id),
      userInfoByOpenIdApi(app.globalData.host_open_id),
      getChatListApi(coupleId)
    ])
      .then(res => {
        setState(
          produce(state, (proxy: typeof state) => {
            proxy.coupleInfo = {
              loverInfo: res[0].data,
              hostInfo: res[1].data
            };
            proxy.chatList = res[2].data.chatList;
            proxy.loading = false;
          })
        );
        watchChatList(coupleId);
      })
      .catch(error => {
        setErrMsg(error);
        console.error(error);
      });
  }, []);

  // 获取新数据后置底 & 缓存
  useEffect(() => {
    if (!chatList.length) {
      const chatRecord = Taro.getStorageSync("chatRecord");
      chatRecord.length && setChatList(chatRecord);
    }
    setTimeout(() => {
      Taro.pageScrollTo({
        scrollTop: 100000,
        duration: 0
      });
    }, 500);
    return () => {
      // ? 怎样在仅整个页面组件销毁时缓存
      Taro.setStorageSync("chatRecord", chatList);
    };
  }, [chatList]);

  // 发送失败设置状态
  useEffect(() => {
    if (!failMsg.update) return;
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.chatList[failMsg.index].fail = true;
      })
    );
    setFailMsg(getDefErrorInfo());
  }, [failMsg.update]);

  // 发送文字消息
  const sendText = async function(text) {
    const doc = {
      openId: app.globalData.host_open_id,
      textContent: text,
      msgType: "text",
      fail: false
    };
    try {
      setChatList([...chatList, doc]);
      await sendTextApi({ text, coupleId: app.globalData.couple_id });
    } catch (error) {
      setFailMsg({ index: chatList.length, update: true });
      console.error(error);
    }
  };

  return {
    ...state,
    sendText
  };
}
