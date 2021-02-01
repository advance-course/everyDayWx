import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Footer(props: {isBottom: boolean, increasing: boolean}) {
  const {isBottom, increasing} = props;
  return (
    <View className="paginationProvider_footer">
      {isBottom && <Text className="footer_desc">---没有更多的信息了---</Text>}
      {increasing && <Text className="footer_desc">数据加载中...</Text>}
    </View>
  )
}