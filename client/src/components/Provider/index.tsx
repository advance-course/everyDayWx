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
        return (
            <View className="loadingio-spinner-spinner-ph286q2307f">
                <View className="ldio-avcon1hx5rb">
                    <View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View><View></View>
                </View>
            </View>
        )
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