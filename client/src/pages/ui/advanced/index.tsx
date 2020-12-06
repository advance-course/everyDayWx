import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import '../pages.scss'
import advanced from '../../../assets/uiPage/advanced.png'

export default class ViewPage extends Component {
  render () {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='header-icon'>
            <Image className='img' src={advanced}></Image>
          </View>
          <View className='page-title'>高阶组件</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>Calendar 日历</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
