import React, { Component } from 'react'
import Taro, { render } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import logo from './uiPage/logo.png'
import basic from './uiPage/basic.png'
import view from './uiPage/view.png'
import feedback from './uiPage/feedback.png'
import form from './uiPage/form.png'
import layout from './uiPage/layout.png'
import navigation from './uiPage/navigation.png'
import advanced from './uiPage/advanced.png'

// export default class ButtonUi extends Component {
//   static itemInfo = [{
//     type: 'basic',
//     title: '基础',
//     content: '包含颜色、文本、图标等',
//     img: basic,
//     }, {
//     type: 'view',
//     title: '视图',
//     content: '包含通告栏、标签、徽标等',
//     img: view,
//     }, {
//     type: 'feedback',
//     title: '操作反馈',
//     content: '包括对话框、进度条、动作面板等',
//     }, {
//     type: 'form',
//     title: '表单',
//     content: '包含输入框、单选框、复选框等',
//     img: form,
//     }, {
//     type: 'layout',
//     title: '布局',
//     content: '包含列表、浮层、卡片等',
//     img: layout,
//     }, {
//     type: 'navigation',
//     title: '导航',
//     content: '包含标签栏、导航栏、分段器等',
//     img: navigation,
//     }, {
//     type: 'advanced',
//     title: '高阶组件',
//     content: '包含日历等',
//     img: advanced,
//     }
//   ]
//   gotoModule = (e) => {
//     const {type} = e.currentTarget.type
//     Taro.navigateTo({
//       url: `/pages/module/index?type=${type}`
//     })
//   }
//   render() {
//     return (
//       <View className='ui-page'>
//         <View className='page-logo'>
//           <Image src={logo}></Image>
//         </View>
//         <View className='page-title'>EveryDay UI</View>
//         <View className='module-list'>
//           {
//             ButtonUi.itemInfo.map((item) => (
//               <View
//                 className='module'
//                 data-type={item.type}
//                 key={item.img}
//                 onClick={() => {this.gotoModule}}
//               >
//                 <View className='module-img'>
//                   <Image className='img' src={item.img}></Image>
//                 </View>
//                 <View className='module-text'>
//                 <View className='module-title'>{item.title}</View>
//                 <View className='module-content'>{item.content}</View>
//                 </View>
//                 <View className='module-arrow'>&gt;</View>
//               </View>
//             ))
//           }
//         </View>
//       </View>
//     )
//   }

// }
export default class UiPage extends Component {
  config = {
    navigationBarTitleText: 'Taro UI'
  }
  
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
    Taro.navigateTo({
      url: `/pages/ui/module/index?type=${type}`
    })
  }

  render() {
    return (
      <View className='ui-page'>
        <View className='page-logo'>
          <Image src={logo} className='img' mode='wtypethFix' />
        </View>
        <View className='page-title'>Everyday UI</View>
        <View className='module-list'>
          {UiPage.itemInfo.map((item) => (
            <View
              className='module'
              key={item.icon}
              data-type={item.type}
              data-title={item.title}
              onClick={this.gotoModule}
            >
              <View className='module-img'>
                <Image src={item.icon} className='img' mode='wtypethFix' />
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