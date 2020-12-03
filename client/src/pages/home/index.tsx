import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ListPage from '../listPage'
import './index.scss'

import Login from 'components/login'

export default class Index extends Component {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      // <View className='index'>
      //   <Login />
      //   <Text>home page.</Text>
      // </View>
      <ListPage />
    )
  }
}
