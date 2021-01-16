import React, { useState, useEffect } from 'react'
import Taro, { useReachBottom } from '@tarojs/taro'
import { View, Button, Image, Text, Input } from '@tarojs/components'
import {userListApi, userTypeDesc} from 'api/user'
import './index.scss'

export default function UserPage() {
  const [query, setQuery] = useState({})
  const [list, setList] = useState([])
  useEffect(async() => {
    const response = await userListApi({current: 1, pageSize: 10});
    setQuery(response.data)
    setList(response.data.list)
  }, [])

  useReachBottom(async() => {
    if(query.current * query.pageSize < query.total ) {
      const newQuery = {
        ...query,
        current: query.current + 1
      }
       const response = await userListApi(newQuery)
       setList([...list, ...response.data.list])
       setQuery(newQuery)
    } else {
      Taro.showToast({
        title: '已经没有更多的用户信息了',
        icon: 'none',
        duration: 2000
      })
    }
  })
  
  return(
    <View className='user_list'>
    {
      list.map(item => (
        <View className='user_item' key={item.id}>
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
    </View>
  );
}