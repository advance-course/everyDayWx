import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import useLoginEffect from 'hooks/useLoginEffect'
import './index.scss'

export default function Profile() {
  useLoginEffect(() => {
    console.log('访问到了 Profile 页')
  })
  return (
    <View>
      <Button onClick={() => { Taro.navigateTo({ url: '/pages/profile/ui/index' }) }}>查看UI</Button>
      <Button onClick={() => { Taro.navigateTo({ url: '/pages/profile/users/index/index' }) }}>查看用户列表</Button>
    </View>
  )
}
