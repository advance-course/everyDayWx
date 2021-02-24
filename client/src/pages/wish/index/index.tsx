import React, { useState, useEffect } from 'react'
import Taro from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, WishInfo } from "api/wish";
import "./index.scss"
import createIcon from './create.png'

const openId = 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q'

export default function Index() {
    const [list, setList] = useState<WishInfo[]>([{ title: 'default' }])
    const [refresh, setRefresh] = useState(false)

    Taro.setNavigationBarTitle({
        title: '首页'
    })

    Taro.eventCenter.on('refreshWish', () => {
        setRefresh(true)
    })
    
    Taro.eventCenter.on('updateWish', (updateWish) => {
        let updateIndex
        const updateList = list.map((wish, index) => {
            if (wish._id === updateWish._id) {
                updateIndex = index
            }
            return wish
        })
        updateList.splice(updateIndex, 1)
        updateList.unshift(updateWish)
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
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/wish/edit/index` })} ></Image>
        </View>
    )
}