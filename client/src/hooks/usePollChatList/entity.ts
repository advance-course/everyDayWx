import { getDefUserDetails } from "pages/profile/users/detail/config";
import { Userinfo } from "api/user";
import { Message } from "pages/home/chat/api/chat";
import { getDefPageData, PageData, Page } from "../usePagination/entity";

export interface State {
  loading: boolean;
  increasing: boolean;
  errMsg: string;
  list: PageData<Message>;
  params: any;
}

export interface CoupleInfo {
  loverInfo: Userinfo;
  hostInfo: Userinfo;
}

export interface FailMsg {
  update: boolean;
  index: number;
}

export function getDefChatState() {
  return {
    loading: true,
    increasing: false,
    errMsg: "",
    params: { current: 1, pageSize: 10, total: -1, coupleId: 0 },
    list: getDefPageData<Message>()
  };
}

export function getDefCoupleInfo() {
  return {
    loverInfo: getDefUserDetails(),
    hostInfo: getDefUserDetails()
  };
}

export function getDefErrorInfo() {
  return {
    update: false,
    index: -1
  };
}

export function mergePagination<T>(
  preData: PageData<T>,
  incomingData: Page<T>
): PageData<T> {
  if (!preData || !preData.list) {
    throw new Error("mergePagination: 当前数据格式不正确，无法进行分页合并");
  }
  if (!incomingData || !incomingData.current) {
    throw new Error("mergePagination: 传入的数据格式错误,无法进行分页合并");
  }

  if (incomingData.current == 1) {
    return {
      list: incomingData.list || [],
      pagination: {
        current: 1,
        pageSize: incomingData.pageSize,
        lastPage: incomingData.lastPage,
        total: incomingData.total
      }
    };
  }

  // 防止传入Observable对象
  let result = { ...preData };
  // 低概率情况下同样的接口被发送了两次，为了避免合并重复数据
  if (result.pagination.current != incomingData.current) {
    let _list = incomingData.list.concat(result.list || []);
    return {
      list: _list,
      pagination: {
        current: incomingData.current,
        pageSize: incomingData.pageSize,
        lastPage: incomingData.lastPage,
        total: incomingData.total
      }
    };
  }

  return result;
}
