import http from "utils/http";
import { Page } from "hooks/usePagination/entity";

export interface Message {
  _id?: string;
  coupleId?: string;
  userId: string;
  msgType?: string;
  textContent?: string;
  sendTime?: Date;
  fail?: boolean;
}

export interface ChatList {
  chatList: Message[];
}

export function getChatListApi(params) {
  return http.post<Page<Message>>("chat/v1/chatList", params);
}

export function getChatListApiV2(params) {
  return http.post<Message>("chat/v1/chatListV2", params);
}

export function sendTextApi(chatContent) {
  return http.post<Message>("chat/v1/send/text", chatContent);
}
