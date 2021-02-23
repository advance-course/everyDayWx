import React from 'react'
import Taro from "@tarojs/taro";
import { View, Text, Input, Image } from '@tarojs/components'
import "./index.scss"
import loveHeart from './love-heart.png'
import { createWishApi } from "api/wish";


export default function Edit() {
    const openId = 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q'
    let title = ''
    const createWish = async function () {
        try {
            console.log(title)
            const res = await createWishApi({
                openid: openId,
                title
            })
            console.log(res)
        } catch (error) {
            console.error(error)
        }

    }
    const inputText = function (e) {
        title = e.detail.value
    }
    Taro.setNavigationBarTitle({
        title: '创建心愿'
    })
    return (
        <View className="container">
            <View className="title">心愿清单</View>
            <View className="input-label">你们的心愿</View>
            <Input className="input" type='text' placeholder='请输入心愿（30字符内）' maxlength={30} onInput={inputText} />
            <View className="tips">tips: 心愿需要双方共同实现才算完成</View>
            <Image className="love-heart" mode="widthFix" src={loveHeart} onClick={createWish}></Image>
        </View>
    )
}