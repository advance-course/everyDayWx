import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getChatListApi, ChatItem } from "api/chat";
import { userInfoByOpenIdApi } from "api/user";

const app = Taro.getApp();

function watchChatList(coupleId) {
  console.log(app.globalData.lover_open_id);
  const db = Taro.cloud.database({
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: "develop-1gsdlqw8ff792ed2"
  });
  const _ = db.command;
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
}

const blankInfo = {
  avatarUrl: ""
};

export default function useWatchChatList(coupleId: number) {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [userInfo, setUserInfo] = useState({
    loverInfo: blankInfo,
    hostInfo: blankInfo
  });
  useEffect(() => {
    getChatListApi(coupleId)
      .then(res => {
        setChatList(res.data.chatList);
        watchChatList(coupleId);
      })
      .catch(error => console.error(error));

    Promise.all([
      userInfoByOpenIdApi(app.globalData.lover_open_id),
      userInfoByOpenIdApi(app.globalData.host_open_id)
    ])
      .then(res => {
        setUserInfo({
          loverInfo: res[0].data,
          hostInfo: res[1].data
        });
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Taro.pageScrollTo({
        scrollTop: 100000,
        duration: 0,
        success(res) {
          console.log(res);
          console.log("执行了");
        },
        fail(err) {
          console.error(err);
        }
      });
    }, 500);
  }, [chatList]);

  Taro.eventCenter.off("watchingChatList");
  Taro.eventCenter.on("watchingChatList", doc =>
    setChatList([...chatList, doc])
  );

  return {
    chatList,
    userInfo,
    setChatList
  };
}
