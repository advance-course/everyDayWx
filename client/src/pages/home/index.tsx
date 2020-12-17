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
    </View>
  )
}