import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import useLoginEffect from 'hooks/useLoginEffect'
import './index.scss'

const app = Taro.getApp()

export default function Home() {
  useLoginEffect(() => {
    console.log('访问到了首页')
  })

  const targetToLover = function() {
    if(app.globalData.lover_open_id) {
      Taro.showToast({
        title: '您已绑定情侣关系',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      Taro.navigateTo({url: '/pages/home/lover/index/index'})
    }
  }
  
  return (
    <View className='index'>
      <Text>home page.</Text>
      <View className="wish" onClick={()=> Taro.navigateTo({url: '/pages/home/wish/index/index'})}>心愿清单</View>
      <View className="wish" onClick={targetToLover}>绑定情侣</View>
    </View>
  )
}