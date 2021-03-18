import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Footer(props: {lastPage: boolean, increasing: boolean, loading: boolean}) {
  const {lastPage, increasing, loading} = props;
  return (
    <View className="paginationProvider_footer">
      { (increasing) && <Text className="footer_desc">数据加载中...</Text>}
      { (lastPage && !loading && !increasing) && <Text className="footer_desc">---END---</Text>}
    </View>
  )
}