import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import '../pages.scss'
import feedback from '../../../assets/uiPage/feedback.png'

export default class ViewPage extends Component {
  render () {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='header-icon'>
            <Image className='img' src={feedback}></Image>
          </View>
          <View className='page-title'>操作反馈</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>Action-Sheet 动作面板</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Activity-Indicator 活动指示器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Modal 模态框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Progress 进度条</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Toast 轻提示</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Swipe-Action 滑动操作</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Message 消息通知</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
