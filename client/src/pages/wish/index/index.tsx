import React, { useState, useEffect } from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components'
import "./index.scss"
import { getAllWishApi, WishInfo } from "api/wish";

const openId = 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q'


export default function Index() {
    const [list, setList] = useState<WishInfo[]>([{ title: 'default', _id: '0' }])
    const [refresh, setRefresh] = useState(false)
    Taro.eventCenter.on('refreshWish', () => {
        setRefresh(true)
    })
    Taro.eventCenter.on('updateWish', ({ _id, title }) => {
        const updateList = list.map(wish => {
            if (wish._id === _id) {
                wish.title = title
            }
            return wish
        })
        setList(updateList)
    })
    useEffect(() => {
        getAllWishApi({
            openid: openId,
            pageSize: 50
        })
            .then(res => {
                setList(res.data.list)
                refresh && setRefresh(false)
            })
            .catch(err => console.error(err))
    }, [refresh])
    Taro.setNavigationBarTitle({
        title: '首页'
    })
    return (
        <View className="container">
            <View className="title">心愿清单</View>
            <View className="input-label">我们的心愿</View>
            {
                list.map(item => {
                    return (
                        <View className="wish-card">
                            <View>{item.title}</View>
                            <View onClick={() => Taro.navigateTo({ url: `/pages/wish/edit/index?_id=${item._id}` })}>编辑</View>
                        </View>
                    )
                })
            }
        </View>
    )
}