import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getChatListApi, sendTextApi, ChatItem } from "api/chat";
import { userInfoByOpenIdApi } from "api/user";
import produce from "immer";

const app = Taro.getApp();

const blankInfo = {
  avatarUrl: ""
};

const blankMsg = {
  update: false,
  index: -1,
  data: {
    openId: "0"
  }
};

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
    if (snapshot.type !== "init") {
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case "enqueue": {
            Taro.eventCenter.trigger("watchingChatList", docChange.doc);
          }
        }
      }
    }
  }
};

interface State {
  loading: boolean;
  errMsg: string;
  userInfo: any;
  chatList: ChatItem[];
}
interface FailMsg {
  update: boolean;
  index: number;
  data: ChatItem;
}

export default function useWatchChatList(coupleId: number) {
  const [state, setState] = useState<State>({
    loading: true,
    errMsg: "",
    userInfo: { loverInfo: blankInfo, hostInfo: blankInfo },
    chatList: []
  });
  const [failMsg, setFailMsg] = useState<FailMsg>(blankMsg);

  const { chatList } = state;

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

  useEffect(() => {
    if (!failMsg.update) return;
    setState(
      produce(state, (proxy: typeof state) => {
        proxy.chatList[failMsg.index] = failMsg.data;
      })
    );
    setFailMsg(blankMsg);
  }, [failMsg.update]);

  useEffect(() => {
    Promise.all([
      userInfoByOpenIdApi(app.globalData.lover_open_id),
      userInfoByOpenIdApi(app.globalData.host_open_id),
      getChatListApi(coupleId)
    ])
      .then(res => {
        setState(
          produce(state, (proxy: typeof state) => {
            proxy.userInfo = {
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
      Taro.setStorageSync("chatRecord", chatList);
    };
  }, [chatList]);

  const sendText = async function(text) {
    const doc = {
      openId: app.globalData.host_open_id,
      textContent: text,
      fail: false
    };
    try {
      setChatList([...chatList, doc]);
      await sendTextApi({
        text,
        coupleId: app.globalData.couple_id
      });
    } catch (error) {
      const failDoc = { ...doc, fail: true };
      setFailMsg({
        index: chatList.length,
        data: failDoc,
        update: true
      });
      console.error(error);
    }
  };

  return {
    ...state,
    sendText
  };
}
