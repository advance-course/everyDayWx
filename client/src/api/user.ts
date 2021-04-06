import { UserInfo } from '@tarojs/taro'
import { Page, PaginationParam } from 'hooks/usePagination/entity'
// 共有 api，存放在共有目录中
import http from 'utils/http'

export interface Userinfo extends UserInfo {
  _id?: string,
  /** 
   * 1： 超级管理员
   * 2： 管理员
   * 3： 普通用户
   * 4： 付费用户
   */
  createTime: number,
  district: string,
  openid?: string,
  type?: 1 | 2 | 3 | 4,
  phone?: string
}

export const userTypeDesc = {
  1: '超级管理员',
  2: '管理员',
  3: '普通用户',
  4: '尊贵VIP',
}

export const userTypes = [
  {
    value: 1,
    desc: '超级管理员',
  },
  {
    value: 2,
    desc: '管理员',
  },
  {
    value: 3,
    desc: '普通用户',
  },
  {
    value: 4,
    desc: '尊贵VIP',
  }
]

export function registerApi(userinfo: UserInfo) {
  return http.post<Userinfo>('user/v1/register', userinfo)
}

export function loginApi() {
  return http.get<Userinfo>('user/v1/login')
}

export function userListApi(params: PaginationParam) {
  return http.get<Page<Userinfo>>('user/v1/list', params)
}

export function userUpdateApi(userid: string, params: Userinfo) {
   return http.get<string>('user/v1/update/info', {
     userid, ...params
   })
}

export function userInfoApi(userid: string) {
  return http.get<Userinfo>('user/v1/info', {
    userid
  })
}

export function userInfoByOpenIdApi(openId: string) {
  return http.get<Userinfo>('user/v1/infoV2', {
    openId
  })
}

export function coupleBindApi(prams) {
  return http.post<any>('user/v1/couple/bind', prams)
}