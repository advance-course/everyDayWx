import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button, Image, CommonEventFunction } from '@tarojs/components'
import {registerApi} from 'api/user'
import './index.scss'

import logo from './logo/logo.png'

export default class Login extends Component {
  bindGetUserInfo: CommonEventFunction<any> = async res => {
    try {
      Taro.showLoading({title: '登陆中...'})
      const userinfo = res.detail.userInfo
      const response = await registerApi(userinfo)
      Taro.setStorageSync('userinfo', response.data)
      Taro.hideLoading()
      Taro.showToast({ title: '登陆成功！', icon: 'success' })
      Taro.eventCenter.trigger(`${Taro.getLaunchOptionsSync().path}/login`)
      Taro.navigateBack()
    } catch(e) {
      Taro.hideLoading()
      Taro.showToast({title: e.message, icon: 'none'})
    }
  }

  render() {
    return (
      <View className='loginPage'>
        <View className='logo'>
          <Image src={logo}></Image>
          <View className='logo-text'>
            <Text className='text-title'>日月卿</Text>
            <Text className='text-content'>日为朝 月为暮 卿为朝朝暮暮</Text>
          </View>
        </View>
        <Button
          openType='getUserInfo'
          onGetUserInfo={this.bindGetUserInfo}
        >
          微信一键登录
        </Button>
      </View>
    )
  }

}
