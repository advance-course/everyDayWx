import React, { useEffect } from 'react'
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

interface props {
  errMsg: string,
  loading: boolean,
  increasing: boolean,
  children: JSX.Element
}

export default function Provider(props: props) {
  const { errMsg, loading, increasing } = props

  useEffect(() => {
    if (loading) {
      Taro.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 2000
      })
    } else {
      Taro.hideToast()
    }
  }, [loading])

  if (errMsg && !loading) {
    return (
      <View className="error-msg">
        错误信息:{errMsg}
      </View>
    )
  }

  return (
    <View className="provider">
      {increasing && <View className="header-text">数据加载中...</View>}
      { props.children}
    </View>
  )

}