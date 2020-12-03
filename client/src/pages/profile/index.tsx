import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import RButton from 'components/button/index'
import './index.scss'

export default class Profile extends Component {
  toButtonUi() {
    Taro.navigateTo({url: '/pages/buttonUi/index'})
  }
  render() {
    return (
      <View>
        <Text>hello world, I am profile page.</Text>
        <RButton type='primary' size='large' onClick={() => {this.toButtonUi()}}>按钮</RButton>
      </View>
    )
  }

}
