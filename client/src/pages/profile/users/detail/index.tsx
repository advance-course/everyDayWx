import React from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { userInfoApi, userUpdateApi, userTypeDesc, Userinfo } from "api/user";
import useInitData from 'hooks/useInitData'
import ListRow from "components/ListRow";
import Provider from "components/Provider";
import * as images from './img/images'
import { defaultDetails, genderIcon, language } from './config'
import "./index.scss";


export default function Detail() {
  const id = getCurrentInstance().router?.params.id || ''
  const { loading, data, errMsg, updateData } = useInitData<Userinfo>({
    initApi: userInfoApi,
    updateApi: userUpdateApi,
    id,
    params: defaultDetails
  })

  const myInfo = Taro.getStorageSync('userinfo')
  const admin = myInfo.type < 3

  const updateUserInfo = async function (value) {
    await updateData(value)
    value._id = id
    Taro.eventCenter.trigger('updateUserInfo', value)
  }
  
  return (
    <Provider errMsg={errMsg} loading={loading}>
      <View className='container'>

        <View className='info'>
          <Image className='bg' mode='widthFix' src={images.bg} />
          <View className='avatar-border'>
            <Image className='avatar' src={data.avatarUrl || images.avatar} />
          </View>
          <View className='name'>
            {data.nickName || 'anonymous'}
            <Image className='sex' mode='widthFix' src={genderIcon[data.gender]} />
          </View>
          <View className='location'>{data.province} {data.country}</View>
        </View>

        <View className='detail'>
          <ListRow.UserPicker userType={myInfo.type} image={images.user} text={data.type ? userTypeDesc[data.type] : '无'} changeFn={updateUserInfo} ></ListRow.UserPicker>
          <ListRow.CityPicker image={images.city} admin={false} country={data.country} text={`${data.city || '无'} ${data.district || ''}`} changeFn={value => updateData(value)} ></ListRow.CityPicker>
          <View>
            <Image src={images.date} /> {data.createTime ? new Date(data.createTime).toLocaleDateString() : '无'}
          </View>
          <ListRow.Picker image={images.language} admin={false} range={language} text={data.language || '无'} changeFn={(e) => updateData({ language: language[e.detail.value].value })} ></ListRow.Picker>
        </View>

      </View>
    </Provider>
  );
}