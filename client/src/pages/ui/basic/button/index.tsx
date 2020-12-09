import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import RButton from 'components/button/index'
import './index.scss'

export default class ButtonUi extends Component {
  
  render() {
    return (
      <View className='basic-page'>
        <View className='page-header'>
          <View className='page-title'>Button 按钮</View>
        </View>
        <View className='page-body'>
          <View className='body-module'>
            <text className='module-title'>类型</text>
            <View>
              <Text>default</Text>
              <RButton>default</RButton>
              <RButton disabled>disabled</RButton>
            </View>
            <View>
              <Text>primary</Text>
              <RButton type='primary'>primary</RButton>
              <RButton type='primary' disabled>disabled</RButton>
            </View>
            <View>
              <Text>warning</Text>
              <RButton type='warning'>warning</RButton>
              <RButton type='warning' disabled>warning</RButton>
            </View>
            <View>
              <Text>ghost</Text>
              <RButton type='ghost'>ghost</RButton>
              <RButton type='ghost' disabled>ghost</RButton>
            </View>
            <View>
              <Text>noBorder</Text>
              <RButton type='noBorder'>noBorder</RButton>
              <RButton type='noBorder' disabled>disabled</RButton>
            </View>
          </View>
          <View className='body-module'>
            <Text className='module-title'>尺寸</Text>
            <View>
              <Text>大按钮</Text>
              <RButton size='large'>large</RButton>
              <RButton type='primary' size='large'>large</RButton>
              <RButton type='warning' size='large'>large</RButton>
              <RButton type='ghost' size='large'>large</RButton>
              <RButton type='noBorder' size='large'>large</RButton>
              <RButton type='primary' size='large' disabled>large</RButton>
              <RButton type='warning' size='large' disabled>large</RButton>
              <RButton type='ghost' size='large' disabled>large</RButton>
            </View>
            <View>
              <Text>小按钮</Text>
              <RButton size='small'>small</RButton>
              <RButton type='primary' size='small'>small</RButton>
              <RButton type='warning' size='small'>small</RButton>
              <RButton type='ghost' size='small'>small</RButton>
              <RButton type='noBorder' size='small'>small</RButton>
              <RButton type='primary' size='small' disabled>small</RButton>
              <RButton type='warning' size='small' disabled>small</RButton>
              <RButton type='ghost' size='small' disabled>small</RButton>
            </View>
            <View>
              <Text>通栏按钮</Text>
              <RButton size='full'>full</RButton>
              <RButton type='primary' size='full'>full</RButton>
              <RButton type='warning' size='full'>full</RButton>
              <RButton type='ghost' size='full'>full</RButton>
              <RButton type='noBorder' size='full'>full</RButton>
              <RButton size='full' disabled>full</RButton>
              <RButton type='primary' size='full' disabled>full</RButton>
              <RButton type='warning' size='full' disabled>full</RButton>
              <RButton type='ghost' size='full' disabled>full</RButton>
            </View>
          </View>
        </View>
    </View>
    )
  }

}