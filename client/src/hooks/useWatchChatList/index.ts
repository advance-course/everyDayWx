import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getChatListApi, ChatItem } from "api/chat";

function watch(coupleId) {
  const app = Taro.getApp();
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

export default function useWatchChatList(coupleId: number) {
  const [chatList, setChatList] = useState<ChatItem[]>([]);

  useEffect(() => {
    getChatListApi(coupleId)
      .then(res => {
        setChatList(res.data.chatList);
        watch(coupleId);
      })
      .catch(error => console.error(error));
  }, []);

  Taro.eventCenter.off("watchingChatList");
  Taro.eventCenter.on("watchingChatList", doc =>
    setChatList([...chatList, doc])
  );

  return {
    chatList,
    setChatList
  };
}
