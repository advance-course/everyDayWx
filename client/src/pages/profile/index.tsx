import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Profile extends Component {
  toButtonUi() {
    Taro.navigateTo({url: '/pages/ui/index'})
  }
  render() {
    return (
      <View>
        <Text>hello world, I am profile page.</Text>
        <Button onClick={() => {this.toButtonUi()}}>查看UI</Button>
      </View>
    )
  }

}
