import React from 'react'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Input, Image } from '@tarojs/components'
import { createWishApi, getWishDetailApi, editWishApi, WishInfo } from "api/wish";
import useInitData from 'hooks/useInitData'
import Provider from "components/Provider/index";
import "./index.scss"
import loveHeart from './love-heart.png'

export default function Edit() {
    const { _id = '', index = -1 } = getCurrentInstance().router?.params || {}
    const { loading, data, errMsg, updateData } = useInitData<WishInfo>({
        initApi: getWishDetailApi,
        updateApi: editWishApi,
        id: _id,
        params: { title: '' }
    })
    
    let titleInput = data.title

    Taro.setNavigationBarTitle({ title: _id ? '编辑心愿' : '创建心愿' })

    const createWish = async function () {
        if (!checkInput()) return
        try {
            await createWishApi({
                couple_id: Taro.getApp().globalData.couple_id,
                title: titleInput
            })
            Taro.eventCenter.trigger('refreshWish', true)
            Taro.navigateBack()
            Taro.showToast({ title: '创建愿望成功' })
        } catch (error) {
            console.error(error)
        }
    }

    const editWish = async function () {
        if (!checkInput()) return
        try {
            await updateData({ title: titleInput })
            Taro.eventCenter.trigger('updateWish', {
                value: { ...data, title: titleInput },
                index
            })
            Taro.navigateBack()
            Taro.showToast({ title: '编辑愿望成功' })
        } catch (error) {
            console.error(error)
        }
    }

    const checkInput = function () {
        if (!titleInput) {
            Taro.showToast({ title: '愿望不允许为空' })
            return false
        }
        if (_id && titleInput === data.title) {
            Taro.showToast({ title: '愿望内容未修改' })
            return false
        }
        return true
    }

    const inputText = function (e) {
        titleInput = e.detail.value
    }

    return (
        <Provider errMsg={errMsg} loading={loading}>
            <View className="container">
                <View className="title">心愿清单</View>
                <View className="input-label">我们的心愿</View>
                <Input className="input" type='text' placeholder='请输入心愿（30字符内）' maxlength={30} value={data.title} onInput={inputText} />
                <View className="tips">tips: 心愿需要双方共同实现才算完成</View>
                <Image className="love-heart" mode="widthFix" src={loveHeart} onClick={_id ? editWish : createWish}></Image>
            </View>
        </Provider>
    )
}