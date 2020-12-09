import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Text>hello world, I am profile page.</Text>
        <Button onClick={() => {Taro.navigateTo({url: '/pages/ui/index'})}}>查看UI</Button>
      </View>
    )
  }

}
