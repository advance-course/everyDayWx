import {useEffect, useState} from 'react'
import {loginApi,coupleBindApi} from 'api/user'
import Taro from '@tarojs/taro'

// 预留配置项
export interface LoginOptions {

}

export default function useLoginEffect(cb: () => any, options: LoginOptions = {}) {
  const [refresh, setReresh] = useState(true)
  useEffect(() => {
    if (!refresh) {
      return
    }

    let isLaunch = false;
    const curPageStack = Taro.getCurrentPages()
    const launchPageInfo = Taro.getLaunchOptionsSync()
    if (curPageStack.length === 1 && launchPageInfo.path == curPageStack[0].route) {
      isLaunch = true
    }
    if (!isLaunch) {
      setReresh(false)
      cb()
      return
    }
    if (isLaunch) {
      loginApi()
        .then(res => {
          const app = Taro.getApp()
          app.globalData = {...res.data}
          setReresh(false)
          cb()
        })
        .catch(error => {
          console.error(error)
          // 登陆返回之后，执行一次回调，因此在这里监听，在登陆成功之后需要出发该监听
          Taro.eventCenter.on(`${launchPageInfo.path}/login`, cb)
          Taro.navigateTo({url: '/pages/home/login/index'})
          setReresh(false)
        })
    }
  }, [refresh])

  return {refresh, setReresh}
}