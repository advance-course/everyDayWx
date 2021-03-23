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
  const { id = '', index = -1 } = getCurrentInstance().router?.params || {}
  const { loading, data, errMsg, updateData } = useInitData<Userinfo>({
    initApi: userInfoApi,
    updateApi: userUpdateApi,
    id,
    params: defaultDetails
  })

  const updateUserInfo = async function (item) {
    await updateData(item)
    Taro.eventCenter.trigger('updateUserInfo', { item, index })
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
          <ListRow.UserPicker userType={data.type || 3} image={images.user} text={data.type ? userTypeDesc[data.type] : '无'} onChange={updateUserInfo} ></ListRow.UserPicker>
          <ListRow.CityPicker image={images.city} admin={false} country={data.country} text={`${data.city || '无'} ${data.district || ''}`} onChange={value => updateData(value)} ></ListRow.CityPicker>
          <View>
            <Image src={images.date} /> {data.createTime ? new Date(data.createTime).toLocaleDateString() : '无'}
          </View>
          <ListRow.Picker image={images.language} admin={false} range={language} text={data.language || '无'} onChange={(e) => updateData({ language: language[e.detail.value].value })} ></ListRow.Picker>
        </View>

      </View>
    </Provider>
  );
}