import React, { useState, useEffect } from 'react'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Input, Image } from '@tarojs/components'
import "./index.scss"
import loveHeart from './love-heart.png'
import { createWishApi, getWishDetailApi, editWishApi } from "api/wish";

const openId = 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q'

export default function Edit() {
    const _id = getCurrentInstance().router?.params._id || ''
    const [title, setTitle] = useState('')
    useEffect(() => {
        if (_id) {
            getWishDetailApi(_id)
                .then(res => res.data.title && setTitle(res.data.title))
                .catch(err => console.error(err))
        }
    }, [])
    const createWish = async function () {
        try {
            await createWishApi({
                openid: openId,
                title
            })
            Taro.eventCenter.trigger('refreshWish')
            Taro.navigateBack()
        } catch (error) {
            console.error(error)
        }
    }
    const editWish = async function () {
        try {
            const res = await editWishApi({
                _id,
                title
            })
            console.log(res)
            Taro.eventCenter.trigger('updateWish', {
                _id,
                title
            })
            Taro.navigateBack()
        } catch (error) {
            console.error(error)
        }
    }
    const inputText = function (e) {
        setTitle(e.detail.value)
    }
    Taro.setNavigationBarTitle({
        title: _id ? '编辑心愿' : '创建心愿'
    })
    return (
        <View className="container">
            <View className="title">心愿清单</View>
            <View className="input-label">我们的心愿</View>
            <Input className="input" type='text' placeholder='请输入心愿（30字符内）' maxlength={30} value={title} onInput={inputText} />
            <View className="tips">tips: 心愿需要双方共同实现才算完成</View>
            <Image className="love-heart" mode="widthFix" src={loveHeart} onClick={_id ? editWish : createWish}></Image>
        </View>
    )
}