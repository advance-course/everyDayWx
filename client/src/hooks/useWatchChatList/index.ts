import Taro from "@tarojs/taro";
import { useState, useEffect, useRef } from "react";
import { getChatListApi, sendTextApi, Message } from "pages/home/chat/api/chat";
import { userInfoApi } from "api/user";
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
    .where({ coupleId, userId: app.globalData.lover_user_id })
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
  const [failMsg, setFailMsg] = useState<FailMsg>(getDefErrorInfo());

  const coupleId = app.globalData.couple_id;
  const chatList = state.chatList;

  const setChatList = function(chatList) {
    setState(
      produce(ref.current, (proxy: typeof state) => {
        proxy.chatList = chatList;
      })
    );
  };

  const setErrMsg = function(errMsg) {
    setState(
      produce(ref.current, (proxy: typeof state) => {
        proxy.errMsg = errMsg;
      })
    );
  };

  // 初始化聊天数据 & 情侣信息
  useEffect(() => {
    if (!chatList.length) {
      const chatStorage = Taro.getStorageSync("chatStorage");
      chatStorage && chatStorage.chatList.length && setState(chatStorage);
    }
    Promise.all([
      userInfoApi(app.globalData.lover_user_id),
      userInfoApi(app.globalData.host_user_id),
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
        Taro.eventCenter.on("watchingChatList", doc =>
          setChatList([...ref.current.chatList, doc])
        );
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
      userId: app.globalData.host_user_id,
      textContent: text,
      msgType: "text",
      fail: false
    };
    try {
      setChatList([...chatList, doc]);
      await sendTextApi({
        text,
        userId: app.globalData.host_user_id,
        coupleId: app.globalData.couple_id
      });
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
