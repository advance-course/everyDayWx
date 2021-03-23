import React, { useState } from 'react'
import Taro, { useShareAppMessage, getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { coupleBindApi } from 'api/user'
import useLoginEffect from 'hooks/useLoginEffect'
import Provider from 'components/Provider'
import "./index.scss"

const app = Taro.getApp()

export default function Index() {
    const params = getCurrentInstance().router?.params || {}
    const lover_open_id = params.lover_open_id || ''
    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState('')

    useLoginEffect(() => {
        setLoading(false)
    })

    useShareAppMessage(() => {
        return {
            title: '绑定情侣',
            path: `/pages/home/lover/index/index?lover_open_id=${app.globalData.host_open_id}`
        }
    })

    if (lover_open_id && !loading && lover_open_id!== app.globalData.host_open_id) {
        Taro.showModal({
            title: '提示',
            content: '是否同意绑定情侣',
            async success(res) {
                if (res.confirm) {
                    try {
                        setLoading(true)
                        await coupleBindApi({
                            open_id: app.globalData.host_open_id,
                            lover_open_id,
                        })
                        Taro.switchTab({
                            url: '/pages/home/index/index'
                        })
                        Taro.showToast({
                            title: '绑定成功',
                            icon: 'success',
                            duration: 2000
                        })
                    } catch (error) {
                        console.error(error)
                        setErrMsg(error.message)
                    }
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

    return (
        <Provider loading={loading} errMsg={errMsg}>
            <View className='container'>
                <View className="content">
                    <View className='title'>THIS IS LOVER PAGE</View>
                    <View className='title'>快邀请TA与你绑定情侣关系吧</View>
                    <Button className="invite-btn" plain openType='share'>邀请绑定</Button>
                </View>
            </View>
        </Provider>
    )
}