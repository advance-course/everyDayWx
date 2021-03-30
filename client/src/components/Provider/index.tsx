import React from 'react'
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

interface props {
    errMsg: string,
    loading: boolean,
    children: JSX.Element
}

export default function Provider(props: props) {
    const { errMsg, loading } = props
    if (loading) {
        Taro.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 2000
        })
    } else {
        Taro.hideToast()
    }

    if (errMsg && !loading) {
        return (
            <View className="error-msg">
                错误信息:{errMsg}
            </View>
        )
    }
    
    return (
        <View className="provider">
            { props.children}
        </View>
    )

}