import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import basic from '../../../assets/uiPage/basic.png'

export default class BasicPage extends Component {
  toButtonPage() {
    Taro.navigateTo({url: '/pages/ui/basic/button/index'})
  }
  render () {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='header-icon'>
            <Image className='img' src={basic}></Image>
          </View>
          <View className='page-title'>基础</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>Color 颜色</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Icon 图标</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Typo 字体</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item' onClick={() => {this.toButtonPage()}}>
              <View className='item-title'>Button 按钮</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
