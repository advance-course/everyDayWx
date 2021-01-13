import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image, Text } from '@tarojs/components'
import {userListApi} from 'api/user'
import './index.scss'

export default function UserPage() {
  const [data, setData] = useState({list: []})
  useEffect(async() => {
    const response = await userListApi();
    setData(response.data)
  }, [])
  return(
    <View className='user_list'>
    {
      data.list.map(item => (
        <View className='user_item' key={item.id}>
          <Image className='user_avatar' src={item.avatarUrl}></Image>
          <Text className='user_nickName'>昵称：{`${item.nickName}`}</Text>
        </View>
      ))
    }
    </View>
  );
}