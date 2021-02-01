import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { userListApi, userTypeDesc } from 'api/user'
import './index.scss'
import usePagination from './usePagination'
import PaginationProvider from '../../components/PaginationProvider'

export interface Page<T> {
  pageSize?: number,
  current?: number,
  lastPage?: boolean,
  total?: number,
  list: T[]
}

export const defPageData = {
  list: [],
  current: 1,
  pageSize: 10,
  lastPage: false,
  total: 0
}

export const defQueryParams = {
  current: 1,
  pageSize: 10
}

export default function UserPage() {
  const { loading, increasing, isBottom, list, setLoading, setIncreasing } = usePagination(userListApi, defQueryParams)

  useReachBottom(() => {
    setIncreasing(true)
  })

  usePullDownRefresh(async() => {
    setLoading(true)
    setIncreasing(false)
  })
  
  return(
    <PaginationProvider 
      loading={loading} 
      increasing={increasing}
      isBottom={isBottom}
      list={list}
      renderItem={(item) => (
        <View className='user_item' key={item.id} onClick={() => { Taro.navigateTo({ url: `/pages/detail/index?id=${item._id}` }) }}>
          <Image className='user_avatar' src={item.avatarUrl}></Image>
          <View className="user_desc">
            <Text className='user_nickName'>{`${item.nickName}`}</Text>
            <Text className="user_city">{item.city ? `${item.city}` : '未填写'}</Text>
          </View>
          <View className="user_type">
            <Text className="type_content">{`${userTypeDesc[item.type]}`}</Text>
          </View>
        </View>
      )} />
  );
}