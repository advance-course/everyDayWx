import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import RButton from 'components/button/index'
import './index.scss'

export default class ButtonUi extends Component {
  render() {
    return (
      <View>
        <text>button-types:</text>
        <Text>default</Text>
        <RButton>default</RButton>
        <RButton disabled>disabled</RButton>
        <Text>primary</Text>
        <RButton type='primary'>primary</RButton>
        <RButton type='primary' disabled>disabled</RButton>
        <Text>warning</Text>
        <RButton type='warning'>warning</RButton>
        <RButton type='warning' disabled>warning</RButton>
        <Text>ghost</Text>
        <RButton type='ghost'>ghost</RButton>
        <RButton type='ghost' disabled>ghost</RButton>
        <Text>button-size:</Text>
        <Text>大按钮</Text>
        <RButton size='large'>large</RButton>
        <RButton type='primary' size='large'>large</RButton>
        <RButton type='warning' size='large'>large</RButton>
        <RButton type='ghost' size='large'>large</RButton>
        <RButton type='primary' size='large' disabled>large</RButton>
        <RButton type='warning' size='large' disabled>large</RButton>
        <RButton type='ghost' size='large' disabled>large</RButton>
        <Text>小按钮</Text>
        <RButton size='small'>large</RButton>
        <RButton type='primary' size='small'>small</RButton>
        <RButton type='warning' size='small'>small</RButton>
        <RButton type='ghost' size='small'>small</RButton>
        <RButton type='primary' size='small' disabled>small</RButton>
        <RButton type='warning' size='small' disabled>small</RButton>
        <RButton type='ghost' size='small' disabled>small</RButton>
        <Text>通栏按钮</Text>
        <RButton size='full'>full</RButton>
        <RButton type='primary' size='full'>full</RButton>
        <RButton type='warning' size='full'>full</RButton>
        <RButton type='ghost' size='full'>full</RButton>
        <RButton size='full' disabled>full</RButton>
        <RButton type='primary' size='full' disabled>full</RButton>
        <RButton type='warning' size='full' disabled>full</RButton>
        <RButton type='ghost' size='full' disabled>full</RButton>
      </View>
    )
  }

}
