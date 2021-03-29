import http from "utils/http";

export interface ChatItem {
  _id?: string;
  coupleId?: string;
  openId: string;
  msgType?: string;
  textContent?: string;
  sendTime?: Date;
}

export interface ChatList {
  chatList: ChatItem[];
}

export function getChatListApi(coupleId) {
  return http.post<ChatList>("chat/v1/chatList", { coupleId });
}

export function sendTextApi(chatContent) {
  return http.post<ChatItem>("chat/v1/send/text", chatContent);
}