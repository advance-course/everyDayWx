import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MenuItem from 'pages/home/index/components/MenuItem'
import useLoginEffect from 'hooks/useLoginEffect'
import './index.scss'

export default function Home() {
  useLoginEffect(() => {
    console.log('访问到了首页')
  })

  return (
    <View className='index'>
      <Text className="title">HOME PAGE.</Text>
      <MenuItem text='心愿清单' handleClick={() => Taro.navigateTo({ url: '/pages/home/wish/index/index' })}></MenuItem>
      <MenuItem text='绑定情侣' checkType='single' handleClick={() => Taro.navigateTo({ url: '/pages/home/lover/index/index' })}></MenuItem>
      <MenuItem text='情侣聊天' checkType='couple' handleClick={() => Taro.navigateTo({ url: '/pages/home/chat/index' })} ></MenuItem>
    </View>
  )
}