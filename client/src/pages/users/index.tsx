import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image, Text, Input } from '@tarojs/components'
import {userListApi} from 'api/user'
import './index.scss'

const userTypeDesc = {
  1: '超级管理员',
  2: '管理员',
  3: '普通用户',
  4: '尊贵VIP',
}

export default function UserPage() {
  const [data, setData] = useState({list: []})
  useEffect(async() => {
    const response = await userListApi();
    setData(response.data)
    console.log(response.data)
  }, [])
  return(
    <View className='user_list'>
    {
      data.list.map(item => (
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