import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import '../pages.scss'
import layout from '../../../assets/uiPage/layout.png'

export default class ViewPage extends Component {
  render () {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='header-icon'>
            <Image className='img' src={layout}></Image>
          </View>
          <View className='page-title'>布局</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>Flex 弹性布局</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Grid 栅格</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>List 列表</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Card 卡片</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Float-Layout 浮动弹层</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Accordion 手风琴</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
