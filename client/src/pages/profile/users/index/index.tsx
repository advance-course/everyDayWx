import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { userListApi, userTypeDesc } from 'api/user'
import './index.scss'
import usePagination from 'hooks/usePagination'
import PaginationProvider from 'components/PaginationProvider'

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

export default function index() {
  const { list, loading, increasing, errMsg, setIncreasing, setLoading, updateList } = usePagination(userListApi, defQueryParams, false);
  
  useReachBottom(() => {
    if(!list.pagination.lastPage) {
      setIncreasing(true)
    }
  })

  usePullDownRefresh(() => {
    setLoading(true)
  })

  Taro.eventCenter.on('updateUserInfo', updateList)

  return(
    <PaginationProvider
      className='container'
      loading={loading} 
      increasing={increasing}
      lastPage={list.pagination.lastPage || true}
      list={list.list}
      errMsg={errMsg}
      renderItem={(item, index) => (
        <View className='user_item' key={item._id} onClick={() => { Taro.navigateTo({ url: `/pages/profile/users/detail/index?id=${item._id}&index=${index}` }) }}>
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
