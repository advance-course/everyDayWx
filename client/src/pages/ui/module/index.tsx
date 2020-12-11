import React, { Component } from 'react'
import Taro, { Config, Current, getCurrentInstance  } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import '../pages.scss'
import basic from '../uiIcon/basic.png'
import view from '../uiIcon/view.png'
import feedback from '../uiIcon/feedback.png'
import form from '../uiIcon/form.png'
import layout from '../uiIcon/layout.png'
import navigation from '../uiIcon/navigation.png'
import advanced from '../uiIcon/advanced.png'

export default class ModulePage extends Component {
  static itemInfo = {
    Basic: {
      title: '基础',
      icon: basic,
      list: [{
        type: 'Color',
        title: 'Color 颜色'
      }, {
        type: 'Icon',
        title: 'Icon 图标'
      }, {
        type: 'Typo',
        title: 'Typo 字体'
      }, {
        type: 'Button',
        title: 'Button 按钮'
      }]
    },
    View: {
      title: '视图',
      icon: view,
      list: [{
        type: 'Avatar',
        title: 'Avatar 头像'
      }, {
        type: 'Article',
        title: 'Article 文章'
      }, {
        type: 'Badge',
        title: 'Badge 徽标'
      }, {
        type: 'Countdown',
        title: 'Countdown 倒计时'
      }, {
        type: 'Curtain',
        title: 'Curtain 幕帘'
      }, {
        type: 'Divider',
        title: 'Divider 分割线'
      }, {
        type: 'NoticeBar',
        title: 'NoticeBar 通告栏'
      }, {
        type: 'Tag',
        title: 'Tag 标签'
      }, {
        type: 'Timeline 时间轴',
        title: 'NoticeBar 通告栏'
      }, {
        type: 'Swiper',
        title: 'Swiper 滑块视图容器'
      }, {
        type: 'Load-More',
        title: 'Load-More 页面提示'
      }, {
        type: 'Steps',
        title: 'Steps 步骤条'
      }]
    },
    Feedback: {
      title: '操作反馈',
      icon: feedback,
      list: [{
        type: 'Action-Sheet',
        title: 'Action-Sheet 动作面板'
      }, {
        type: 'Activity-Indicator',
        title: 'Activity-Indicator 活动指示器'
      }, {
        type: 'Modal',
        title: 'Modal 模态框'
      }, {
        type: 'Progress',
        title: 'Progress 进度条'
      }, {
        type: 'Toast',
        title: 'Toast 轻提示'
      }, {
        type: 'Swipe-Action',
        title: 'Swipe-Action 滑动操作'
      }, {
        type: 'Message',
        title: 'Message 消息通知'
      }]
    },
    Form: {
      title: '表单',
      icon: form,
      list: [{
        type: 'Input',
        title: 'Input 输入框'
      }, {
        type: 'Radio',
        title: 'Radio 单选框'
      }, {
        type: 'Checkbox',
        title: 'Checkbox 复选框'
      }, {
        type: 'Switch',
        title: 'Switch 开关'
      }, {
        type: 'Rate',
        title: 'Rate 评分'
      }, {
        type: 'Picker',
        title: 'Picker 选择器'
      }, {
        type: 'Picker-View',
        title: 'Picker-View 滚动选择器'
      }, {
        type: 'Slider',
        title: 'Slider 滑动条'
      }, {
        type: 'Search-Bar',
        title: 'Search-Bar 搜索栏'
      }, {
        type: 'Image-Picker',
        title: 'Image-Picker 图片选择器'
      }, {
        type: 'Range',
        title: 'Range 范围选择器'
      }]
    },
    Layout: {
      title: '布局',
      icon: layout,
      list: [{
        type: 'Flex',
        title: 'Flex 弹性布局'
      }, {
        type: 'Grid',
        title: 'Grid 栅格'
      }, {
        type: 'List',
        title: 'List 列表'
      }, {
        type: 'Card',
        title: 'Card 卡片'
      }, {
        type: 'Float-Layout',
        title: 'Float-Layout 浮动弹层'
      }, {
        type: 'Accordion',
        title: 'Accordion 手风琴'
      }]
    },
    Navigation: {
      title: '导航',
      icon: navigation,
      list: [{
        type: 'NavBar',
        title: 'NavBar 导航栏'
      }, {
        type: 'TabBar',
        title: 'TabBar 标签栏'
      }, {
        type: 'Tabs',
        title: 'Tabs 标签页'
      }, {
        type: 'Segmented-Control',
        title: 'Segmented-Control 分段器'
      }, {
        type: 'Pagination',
        title: 'Pagination 分页器'
      }, {
        type: 'Drawer',
        title: 'Drawer 抽屉'
      }, {
        type: 'Indexes',
        title: 'Indexes 索引选择器'
      }]
    },
    Advanced: {
      title: '高阶组件',
      icon: advanced,
      list: [{
        type: 'Calendar',
        title: 'Calendar 日历'
      }]
    }
  }

  gotoComponent = e => {
    const type = getCurrentInstance().router!.params.type || ''
    const componentType = e.currentTarget.dataset.type
    Taro.navigateTo({
      url: `/pages/ui/${type.toLowerCase()}/${componentType.toLowerCase()}/index`
    })
  }

  render () {
    const type = getCurrentInstance().router!.params.type || ''
    // const title = ModulePage.itemInfo[type].title
    // const icon = ModulePage.itemInfo[type].icon
    // const list = ModulePage.itemInfo[type].list
    const {title, icon, list} = ModulePage.itemInfo[type]

    return (
      <View className='component-page'>
          {
            <View className='page-header'>
                <View className='header-icon'>
                  <Image className='img' src={icon}></Image>
                </View>
                <View className='page-title'>{title}</View>
            </View>
          }
        <View className='page-body'>
          <View className='component-list'>
            {
              list.map((item) => (
                <View 
                  className='list-item'
                  key={item.title}
                  data-type={item.type}
                  onClick={this.gotoComponent}
                >
                  <View className='item-title'>{item.title}</View>
                  <View className='item-arrow'>&gt;</View>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
