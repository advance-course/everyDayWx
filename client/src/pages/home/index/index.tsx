import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import useLoginEffect from 'hooks/useLoginEffect'
import './index.scss'
import arrowIcon from './arrow.png'

const app = Taro.getApp()

export default function Home() {
  useLoginEffect(() => {
    console.log('访问到了首页')
  })

  const targetToLover = function () {
    if (app.globalData.lover_open_id) {
      Taro.showToast({
        title: '您已绑定情侣关系',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      Taro.navigateTo({ url: '/pages/home/lover/index/index' })
    }
  }

  return (
    <View className='index'>
      <Text className="title">HOME PAGE.</Text>
      <View className="item" onClick={() => Taro.navigateTo({ url: '/pages/home/wish/index/index' })}>
        <Text>心愿清单</Text>
        <Image className="arrow-icon" mode="widthFix" src={arrowIcon}></Image>
      </View>
      <View className="item" onClick={targetToLover}>
        <Text>绑定情侣</Text>
        <Image className="arrow-icon" mode="widthFix" src={arrowIcon}></Image>
      </View>
    </View>
  )
}