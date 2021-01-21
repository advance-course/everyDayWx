import React from "react";
import useLoadData from '../../hooks/useLoadData'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { userInfoApi, userTypeDesc, Userinfo } from "api/user";
import * as images from './img/images'
import "./index.scss";

const defaultDetails = {
  nickName: '',
  avatarUrl: '',
  gender: 1 as const,
  type: 3 as const,
  province: '',
  country: '',
  city: '',
  createTime: 0,
  language: 'zh_CN' as const,
}

const genderIcon = {
  0: '',
  1: images.male,
  2: images.female,
}

export default function Detail() {
  const id = getCurrentInstance().router?.params.id || ''
  const { loading, data: details, setRefresh } = useLoadData<Userinfo, string>(userInfoApi, id, defaultDetails)

  if (loading) {
    return (
      <View className="loadingio-spinner-spinner-ph286q2307f">
        <View className="ldio-avcon1hx5rb">
          <View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View>
        </View>
      </View>
    );
  }

  return (
    <View className='container'>
      <View className='info'>
        <Image className='bg' mode='widthFix' src={images.bg} />
        <View className='avatar-border'> <Image className='avatar' onClick={() => setRefresh(true)} src={details.avatarUrl || images.avatar} /></View>
        <View className='name'>
          {details.nickName || 'anonymous'}
          <Image className='sex' mode='widthFix' src={genderIcon[details.gender]} />
        </View>
        <View className='location'>{details.province} {details.country}</View>
      </View>
      <View className='detail'>
        <View> <Image src={images.user} /> {details.type ? userTypeDesc[details.type] : '无'} </View>
        <View> <Image src={images.city} /> {details.city || '无'} </View>
        <View> <Image src={images.date} /> {details.createTime ? new Date(details.createTime).toLocaleDateString() : '无'} </View>
        <View> <Image src={images.language} /> {details.language || '无'} </View>
      </View>
    </View>
  );
}