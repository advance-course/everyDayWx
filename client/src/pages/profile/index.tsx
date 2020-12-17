import React, { Component } from 'react'
import Taro, { getUserInfo } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Button onClick={() => {Taro.navigateTo({url: '/pages/ui/index'})}}>查看UI</Button>
      </View>
    )
  }

}
