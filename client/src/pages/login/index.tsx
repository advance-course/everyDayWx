import React, { Component } from 'react'
import Taro, { getUserInfo } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

import logo from './logo/logo.png'

export default class Login extends Component {
  bindGetUserInfo = e => {
    Taro.getUserInfo({
      success: res => {
        const db = Taro.cloud.database();
        const user = db.collection('User');
        const userInfo = {
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          city: e.detail.userInfo.city,
          country: e.detail.userInfo.country,
          province: e.detail.userInfo.province,
          gender: e.detail.userInfo.gender,
          openid: '',
          createTime: new Date().toLocaleString()
        }
        Taro.setStorageSync('userInfo', userInfo)

        Taro.cloud.callFunction({
          name: 'login',
          success: res => {
            userInfo.openid = res.result.openid
          }
        })

        user.where({
          _openid: userInfo.openid
        }).get().then(res => {
          if(res.data.length === 0) {
            Taro.showModal({
              title: '提示',
              content: '您还没注册，需要注册吗？',
              success(res) {
                if(res.confirm) {
                  user.add({
                    data: userInfo
                  }).then(
                    res => {
                      Taro.showToast({
                        title: '用户已注册成功',
                        success: res => {
                          setTimeout(() => {
                            Taro.switchTab({
                              url: '/pages/profile/index'
                            })
                          }, 2500);
                        }
                      })
                    }
                  )
                }
              }
            })
          } else {
            Taro.showToast({
              icon: 'none',
              title: '您已注册过了',
              success: res => {
                setTimeout(() => {
                  Taro.switchTab({
                    url: '/pages/profile/index'
                  })
                }, 2500);
              }
            })
          }
        })
      },
      fail: res => {
        Taro.showToast({
          icon: 'none',
          title: '授权失败',
        })
      }
    })
  }

  render() {
    return (
      <View className='loginPage'>
        <View className='logo'>
          <Image src={logo}></Image>
          <View className='logo-text'>
            <Text className='text-title'>登录日月卿</Text>
            <Text className='text-content'>日月卿 日为朝 月为暮 卿为朝朝暮暮</Text>
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
