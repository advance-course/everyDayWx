import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { View, Button, Image, Text, Input } from '@tarojs/components'
import {Userinfo, userListApi, userTypeDesc} from 'api/user'
import './index.scss'

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
  const [queryParams, setQueryParams] = useState(defQueryParams)
  const [data, setData] = useState<Page<Userinfo>>(defPageData)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    fetchList(queryParams)
  }, [])

  if(loading) {
    Taro.showLoading({title: '数据加载中'})
  } else {
    Taro.hideLoading()
  }

  function ListFooter() {
    return (    
      <View className="user_list_bottom">
        <Text className="bottom_desc">---没有更多的信息了---</Text>
      </View>
    ) 
  }

  const fetchList = async(params) => {
    setLoading(true)
    const response = await userListApi(params);
    setData(response.data)
    console.log(response.data)
    if(params.current === 1) {
      setList(response.data.list)
    } else {
      setList([...list, ...response.data.list])
    }
    setLoading(false)
  }

  useReachBottom(async() => {
    if(!data.lastPage) {
      const newQuery = {
        ...queryParams,
        current: queryParams.current + 1
      }
      setQueryParams(newQuery)
      fetchList(newQuery)
    } else {
      setIsBottom(true)
    }
  })

  usePullDownRefresh(async() => {
    await fetchList(queryParams)
    Taro.stopPullDownRefresh()
  })
  
  return(
    <View className='user_list'>
    {
      list.map(item => (
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
      ))
    }
    {isBottom ? <ListFooter /> : null}
    </View>
  );
}