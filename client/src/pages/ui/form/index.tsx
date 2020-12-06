import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import '../pages.scss'
import form from '../../../assets/uiPage/form.png'

export default class ViewPage extends Component {
  render () {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='header-icon'>
            <Image className='img' src={form}></Image>
          </View>
          <View className='page-title'>表单</View>
        </View>
        <View className='page-body'>
          <View className='component-list'>
            <View className='list-item'>
              <View className='item-title'>Form 表单</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Input 输入框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Radio 单选框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>CheckBox 复选框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Switch 开关</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Rate 评分</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Input-Number 数字输入框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Textarea 多行文本框</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Picker 选择器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Picker-View 滚动选择器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Slider 滑动条</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Search-Bar 搜索栏</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Image-Picker 图片选择器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
            <View className='list-item'>
              <View className='item-title'>Range 范围选择器</View>
              <View className='item-arrow'>&gt;</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
