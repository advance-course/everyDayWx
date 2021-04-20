import { getDefUserDetails } from "pages/profile/users/detail/config";
import { Userinfo } from "api/user";
import { Message } from "pages/home/chat/api/chat";

export interface State {
  loading: boolean;
  errMsg: string;
  coupleInfo: {
    loverInfo: Userinfo;
    hostInfo: Userinfo;
  };
  chatList: Message[];
}
export interface FailMsg {
  update: boolean;
  index: number;
}

export function getDefChatState() {
  return {
    loading: true,
    errMsg: "",
    coupleInfo: {
      loverInfo: getDefUserDetails(),
      hostInfo: getDefUserDetails()
    },
    chatList: []
  };
}

export function getDefErrorInfo() {
  return {
    update: false,
    index: -1,
  };
}