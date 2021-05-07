import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { getChatListApi, sendTextApi } from "pages/home/chat/api/chat";
import { userInfoApi } from "api/user";
import {
  mergePagination,
  getDefChatState,
  getDefCoupleInfo,
  getDefErrorInfo,
  State,
  CoupleInfo,
  FailMsg
} from "./entity";
import produce from "immer";

const app = Taro.getApp();

// 监听聊天数据变化
const watchChatList = function() {
  const db = Taro.cloud.database({
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: "develop-1gsdlqw8ff792ed2"
  });
  db.collection("chat")
    .where({ userId: app.globalData.lover_user_id })
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
  const ref = useRef<State>(getDefChatState());
  const [state, setState] = useState<State>(getDefChatState());
  const [coupleInfo, setCoupleInfo] = useState<CoupleInfo>(getDefCoupleInfo());
  const [failMsg, setFailMsg] = useState<FailMsg>(getDefErrorInfo());

  const coupleId = app.globalData.couple_id;

  const { increasing, params, list } = state;

  const setErrMsg = function(errMsg) {
    setState(
      produce(ref.current, (proxy: typeof state) => {
        proxy.errMsg = errMsg;
      })
    );
  };

  // 初始化聊天数据 & 情侣信息
  useEffect(() => {
    if (!list.list.length) {
      const chatStorage = Taro.getStorageSync("chatStorage");
      chatStorage && chatStorage.list.list.length && setState(chatStorage);
    }
    Promise.all([
      userInfoApi(app.globalData.lover_user_id),
      userInfoApi(app.globalData.host_user_id),
      fetchList(params)
    ])
      .then(res => {
        setCoupleInfo({
          loverInfo: res[0].data,
          hostInfo: res[1].data
        });
        watchChatList();
        Taro.eventCenter.on("watchingChatList", doc => addMessage(doc));
      })
      .catch(error => {
        setErrMsg(error);
        console.error(error);
      });
    return () => {
      Taro.setStorageSync("chatStorage", ref.current);
      Taro.eventCenter.off("watchingChatList");
    };
  }, []);

  // 获取新数据后相关操作
  useEffect(() => {
    Taro.nextTick(() => {
      Taro.pageScrollTo({
        scrollTop: 100000, // 置底
        duration: 0
      });
    });
    ref.current = state; // 保存数据
  }, [list.list]);

  // 发送失败设置状态
  useEffect(() => {
    if (!failMsg.update) return;
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.list.list[failMsg.index].fail = true;
      })
    );
    setFailMsg(getDefErrorInfo());
  }, [failMsg.update]);

  useEffect(() => {
    const { current } = list.pagination;
    increasing &&
      fetchList({ current: current + 1, total: list.pagination.total });
  }, [increasing]);

  usePullDownRefresh(() => {
    if (!list.pagination.lastPage) {
      setIncreasing(true);
    }
  });

  const setParams = function(option) {
    const _param = { ...params, ...option, coupleId };
    setState(
      produce(state, df => {
        df.params = _param;
      })
    );
    return _param;
  };

  const setIncreasing = function(increasing: boolean) {
    setState(
      produce(state, df => {
        df.increasing = increasing;
      })
    );
  };

  const fetchList = async function(params) {
    const _param = params ? setParams(params) : state.params;
    const res = await getChatListApi(_param);
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.list = mergePagination(list, res.data);
        proxy.loading = false;
        proxy.increasing = false;
        proxy.errMsg = "";
      })
    );
    Taro.stopPullDownRefresh()
  };

  const addMessage = item => {
    setState(
      produce(state, (draft: typeof state) => {
        draft.list.list.push(item);
      })
    );
  };

  // 发送文字消息
  const sendText = async function(text) {
    const doc = {
      userId: app.globalData.host_user_id,
      textContent: text,
      msgType: "text",
      fail: false
    };
    try {
      addMessage(doc);
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

  return {
    ...state,
    coupleInfo,
    sendText,
    setIncreasing
  };
}
