import React, { Component } from 'react'
import Taro, { render } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import logo from './uiIcon/logo.png'
import basic from './uiIcon/basic.png'
import view from './uiIcon/view.png'
import feedback from './uiIcon/feedback.png'
import form from './uiIcon/form.png'
import layout from './uiIcon/layout.png'
import navigation from './uiIcon/navigation.png'
import advanced from './uiIcon/advanced.png'

export default class UiPage extends Component {
  static itemInfo = [
    {
      type: 'Basic',
      title: '基础',
      content: '包含颜色、文本、图标等',
      icon: basic
    },
    {
      type: 'View',
      title: '视图',
      content: '包含通告栏、标签、徽标等',
      icon: view
    },
    {
      type: 'Feedback',
      title: '操作反馈',
      content: '包含对话框、进度条、动作面板等',
      icon: feedback
    },
    {
      type: 'Form',
      title: '表单',
      content: '包含输入框、单选框、复选框等',
      icon: form
    },
    {
      type: 'Layout',
      title: '布局',
      content: '包含列表、浮层、卡片等',
      icon: layout
    },
    {
      type: 'Navigation',
      title: '导航',
      content: '包含标签栏、导航栏、分段器等',
      icon: navigation
    }, {
      type: 'Advanced',
      title: '高阶组件',
      content: '包含日历等',
      icon: advanced
    }
  ]

  gotoModule = e => {
    const type = e.currentTarget.dataset.type
    console.log(e.currentTarget.dataset)
    Taro.navigateTo({
      url: `/pages/ui/module/index?type=${type}`
    })
  }

  render() {
    return (
      <View className='ui-page'>
        <View className='page-logo'>
          <Image src={logo} className='img' />
        </View>
        <View className='page-title'>Everyday UI</View>
        <View className='module-list'>
          {UiPage.itemInfo.map((item) => (
            <View
              className='module'
              key={item.icon}
              data-type={item.type}
              onClick={this.gotoModule}
            >
              <View className='module-img'>
                <Image src={item.icon} className='img' />
              </View>
              <View className='module-text'>
                <View className='module-title'>{item.title}</View>
                <View className='module-content'>{item.content}</View>
              </View>
              <View className='module-arrow'>&gt;</View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}