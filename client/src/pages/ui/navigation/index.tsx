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
          <View className='page-title'>导航</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>NavBar 导航栏</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>TabBar 标签栏</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Segmented-Control 分段器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Pagination 分页器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Drawer 抽屉</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Indexes 索引选择器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
