import http from "utils/http";

export interface Message {
  _id?: string;
  coupleId?: string;
  openId: string;
  msgType?: string;
  textContent?: string;
  sendTime?: Date;
  fail?: boolean
}

export interface ChatList {
  chatList: Message[];
}

export function getChatListApi(coupleId) {
  return http.post<ChatList>("chat/v1/chatList", { coupleId });
}

export function sendTextApi(chatContent) {
  return http.post<Message>("chat/v1/send/text", chatContent);
}