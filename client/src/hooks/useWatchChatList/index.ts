import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getChatListApi, sendTextApi, ChatItem } from "api/chat";
import { userInfoByOpenIdApi } from "api/user";

const app = Taro.getApp();

const blankInfo = {
  avatarUrl: ""
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

export default function useWatchChatList(coupleId: number) {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    loverInfo: blankInfo,
    hostInfo: blankInfo
  });

  useEffect(() => {
    Promise.all([
      userInfoByOpenIdApi(app.globalData.lover_open_id),
      userInfoByOpenIdApi(app.globalData.host_open_id),
      getChatListApi(coupleId)
    ])
      .then(res => {
        setUserInfo({
          loverInfo: res[0].data,
          hostInfo: res[1].data
        });
        setChatList(res[2].data.chatList);
        watchChatList(coupleId);
        setLoading(false);
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
    console.log(text);
    try {
      setChatList([
        ...chatList,
        {
          openId: app.globalData.host_open_id,
          textContent: text
        }
      ]);
      const res = await sendTextApi({
        text,
        coupleId: app.globalData.couple_id
      });
      // setChatList([...chatList, res.data])
    } catch (error) {
      setErrMsg(error);
      console.error(error);
    }
  };

  Taro.eventCenter.off("watchingChatList");
  Taro.eventCenter.on("watchingChatList", doc =>
    setChatList([...chatList, doc])
  );

  return {
    loading,
    errMsg,
    chatList,
    userInfo,
    sendText
  };
}
