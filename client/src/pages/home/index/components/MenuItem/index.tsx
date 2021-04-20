import React from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import arrowIcon from './arrow.png'
import './index.scss'

const app = Taro.getApp()

interface Props {
  text: string,
  checkType?: string
  handleClick: () => void
}

export default function MenuItem(props: Props) {
  const { text, checkType = '', handleClick } = props

  const checkItemType = function () {
    if (!checkType) {
      handleClick()
      return
    }
    if (checkType === 'single' && app.globalData.lover_user_id) {
      Taro.showToast({
        title: '您已绑定情侣关系',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (checkType === 'couple' && !app.globalData.lover_user_id) {
      Taro.showToast({
        title: '请先绑定情侣关系',
        icon: 'none',
        duration: 2000
      })
      return
    }
    handleClick()
  }

  return (
    <View className="item" onClick={checkItemType}>
      <Text>{text}</Text>
      <Image className="arrow-icon" mode="widthFix" src={arrowIcon}></Image>
    </View>
  )
}