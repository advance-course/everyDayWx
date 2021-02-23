import http from "utils/http";

interface WishInfo {
  openid: string;
  title: string;
}

export function createWishApi(wishinfo: WishInfo) {
  return http.post<WishInfo>("wish/v1/create", wishinfo);
}
