import { Page, PaginationParam } from "hooks/usePagination/entity";
import http from "utils/http";

export interface WishInfo {
  _id?: string;
  couple_id?: string;
  title: string;
  state?: number;
  createTime?: Date;
  modifyTime?: Date;
}

export function createWishApi(wishinfo: WishInfo) {
  return http.post<WishInfo>("wish/v1/create", wishinfo);
}

export function getAllWishApi(params: PaginationParam) {
  return http.get<Page<WishInfo>>("wish/v1/all", params);
}

export function getWishDetailApi(_id: string) {
  return http.get<WishInfo>("wish/v1/detail", { _id });
}

export function editWishApi(_id: string, wishinfo: WishInfo) {
  return http.get<string>("wish/v1/edit", {
    _id,
    ...wishinfo
  });
}

export function finishWishApi(_id: string, openId: string) {
  return http.get<string>("wish/v1/finish", {
    _id,
    openId
  });
}
