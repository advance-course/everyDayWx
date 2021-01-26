import React, { useState, useEffect } from "react";
import useLoadData from '../../hooks/useLoadData'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image, Picker } from "@tarojs/components";
import { userInfoApi, userUpdateApi, userTypeDesc, Userinfo } from "api/user";
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
  district: '',
  createTime: 0,
  language: 'zh_CN' as const,
}

const genderIcon = {
  0: '',
  1: images.male,
  2: images.female,
}

const language = [
  { label: '英语', value: 'en' },
  { label: '简体中文', value: 'zh_CN' },
  { label: '繁体中文', value: 'zh_TW' }
]

const userType = [
  { label: '超级管理员', value: 1 },
  { label: '管理员', value: 2 },
  { label: '普通用户', value: 3 },
  { label: '尊贵VIP', value: 4 },
]

export default function Detail() {
  const id = getCurrentInstance().router?.params.id || ''
  const { loading, data: details, setRefresh } = useLoadData<Userinfo, string>(userInfoApi, id, defaultDetails)
  const [updateData, setUpdateData] = useState({})

  const myInfo = Taro.getStorageSync('userinfo')
  let admin = false
  if (myInfo && myInfo.type) {
    admin = myInfo.type < 3
    if (myInfo.type === 2 && userType.length === 4) {
      userType.shift()
    }
  }

  useEffect(() => {
    const data = {
      ...details,
      ...updateData
    }
    delete data._id
    if (!loading) {
      userUpdateApi(id, data)
        .then(() => setRefresh(true))
        .catch(error => console.error(error))
    }
  }, [updateData])

  function changeRegion(e) {
    if (details.country !== 'China') {
      Taro.showToast({
        title: '仅支持修改中国地区',
        icon: 'none',
        duration: 1500
      })
      return
    }
    const region = {
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2]
    }
    setUpdateData(region)
  }

  function changeLanguage(e) {
    setUpdateData({
      language: language[e.detail.value].value
    })
  }

  function changeUserType(e) {
    setUpdateData({
      type: userType[e.detail.value].value
    })
  }

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
        <View className='avatar-border'>
          <Image className='avatar' src={details.avatarUrl || images.avatar} />
        </View>
        <View className='name'>
          {details.nickName || 'anonymous'}
          <Image className='sex' mode='widthFix' src={genderIcon[details.gender]} />
        </View>
        <View className='location'>{details.province} {details.country}</View>
      </View>

      <View className='detail'>
        <View>
          <Image src={images.user} /> {details.type ? userTypeDesc[details.type] : '无'}
          {admin && <Picker className="edit" mode='selector' rangeKey='label' value={0} range={userType} onChange={changeUserType}>
            <Image src={images.edit} /> </Picker>}
        </View>
        <View>
          <Image src={images.city} /> {`${details.city || '无'} ${details.district || ''}`}
          {admin && <Picker className="edit" mode='region' value={[]} onChange={changeRegion}>
            <Image src={images.edit} /> </Picker>}
        </View>
        <View> <Image src={images.date} /> {details.createTime ? new Date(details.createTime).toLocaleDateString() : '无'} </View>
        <View>
          <Image src={images.language} /> {details.language || '无'}
          {admin && <Picker className="edit" mode='selector' rangeKey='label' value={0} range={language} onChange={changeLanguage}>
            <Image src={images.edit} /> </Picker>}
        </View>
      </View>
    </View>
  );
}