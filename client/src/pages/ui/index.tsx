import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Icon, View, Image } from '@tarojs/components'
import './index.scss'
import basic from '../../assets/uiPage/basic.png'
import view from '../../assets/uiPage/view.png'
import feedback from '../../assets/uiPage/feedback.png'
import form from '../../assets/uiPage/form.png'
import layout from '../../assets/uiPage/layout.png'
import navigation from '../../assets/uiPage/navigation.png'
import advanced from '../../assets/uiPage/advanced.png'

export default class ButtonUi extends Component {
  toBasicPage() {
    Taro.navigateTo({url: '/pages/ui/basic/index'})
  }
  toViewPage() {
    Taro.navigateTo({url: '/pages/ui/view/index'})
  }
  toFeedbackPage() {
    Taro.navigateTo({url: '/pages/ui/feedback/index'})
  }
  toFormPage() {
    Taro.navigateTo({url: '/pages/ui/form/index'})
  }
  toLayoutPage() {
    Taro.navigateTo({url: '/pages/ui/layout/index'})
  }
  toNavigationPage() {
    Taro.navigateTo({url: '/pages/ui/navigation/index'})
  }
  toAdvancedPage() {
    Taro.navigateTo({url: '/pages/ui/advanced/index'})
  }
  render() {
    return (
      <View className='ui-page'>
        <View className='logo'></View>
        <View className='page-title'>EveryDay UI</View>
        <View className='module-list'>
          <View className='module' onClick={() => {this.toBasicPage()}}>
            <View className='module-img'>
              <Image className='img' src={basic}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>基础</View>
              <View className='module-content'>包含颜色、文本、图标等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toViewPage()}}>
            <View className='module-img'>
              <Image className='img' src={view}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>视图</View>
              <View className='module-content'>包含通告栏、标签、徽标等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toFeedbackPage()}}>
            <View className='module-img'>
              <Image className='img' src={feedback}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>操作反馈</View>
              <View className='module-content'>包含对话框、进度条、动作面板等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toFormPage()}}>
            <View className='module-img'>
              <Image className='img' src={form}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>表单</View>
              <View className='module-content'>包含输入框、单选框、复选框等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toLayoutPage()}}>
            <View className='module-img'>
              <Image className='img' src={layout}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>布局</View>
              <View className='module-content'>包含列表、浮层、卡片等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toNavigationPage()}}>
            <View className='module-img'>
              <Image className='img' src={navigation}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>导航</View>
              <View className='module-content'>包含标签栏、导航栏、分段器等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
          <View className='module' onClick={() => {this.toAdvancedPage()}}>
            <View className='module-img'>
              <Image className='img' src={advanced}></Image>
            </View>
            <View className='module-text'>
              <View className='module-title'>高阶组件</View>
              <View className='module-content'>包含日历等</View>
            </View>
            <View className='module-arrow'>&gt;</View>
          </View>
        </View>
      </View>
    )
  }

}
