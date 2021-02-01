import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Footer from './Footer/index';
import './index.scss'

interface PaginationProviderProps<T> {
  loading: boolean,
  increasing: boolean,
  isBottom: boolean,
  errMsg?: string,
  list: T[],
  renderItem: (item) => JSX.Element
}

export default function PaginationProvider(props: PaginationProviderProps<any>) {
  const {loading, isBottom, increasing, errMsg, list, renderItem} = props
  
  useEffect(() => {
    if(loading ) {
      Taro.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 2000
      })
    } else {
      Taro.hideToast()
    }
  }, [loading])

  if(errMsg) {
    Taro.showToast({title: '发生错误'})
  }

  return (
    <View className='paginationProvider'>
      {
        // list.map(item => (
        //   <View className='user_item' key={item.id} onClick={() => { Taro.navigateTo({ url: `/pages/detail/index?id=${item._id}` }) }}>
        //     <Image className='user_avatar' src={item.avatarUrl}></Image>
        //     <View className="user_desc">
        //       <Text className='user_nickName'>{`${item.nickName}`}</Text>
        //       <Text className="user_city">{item.city ? `${item.city}` : '未填写'}</Text>
        //     </View>
        //     <View className="user_type">
        //       <Text className="type_content">{`${userTypeDesc[item.type]}`}</Text>
        //     </View>
        //   </View>
        // ))
        list.map(renderItem)
      }
      <Footer isBottom={isBottom} increasing={increasing} />
    </View>
  )
}