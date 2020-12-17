import React, { Component } from 'react'
import Taro, { Config, useResize } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  render () {
    return (
      <View className='index'>
        <Text>home page.</Text>
      </View>
    )
  }
}
