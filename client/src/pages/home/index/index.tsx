import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import useLoginEffect from 'hooks/useLoginEffect'
import './index.scss'

export default function Home() {
  useLoginEffect(() => {
    console.log('访问到了首页')
  })
  return (
    <View className='index'>
      <Text>home page.</Text>
      <View className="wish" onClick={()=> Taro.navigateTo({url: '/pages/home/wish/index/index'})}>心愿清单</View>
      <View className="wish" onClick={()=> Taro.navigateTo({url: '/pages/home/wish/index/index'})}>绑定情侣</View>
    </View>
  )
}