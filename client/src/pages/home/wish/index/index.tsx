import React, { useState } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, WishInfo } from "api/wish";
import "./index.scss"
import createIcon from './create.png'
import usePagination from 'hooks/usePagination/index'
import PaginationProvider from 'components/PaginationProvider'
import WishItem from 'components/home/wish/WishCard'

const app = Taro.getApp()

export default function Index() {

    const { list, loading, increasing, updateList, setIncreasing, setLoading } = usePagination<WishInfo>(getAllWishApi, {
        couple_id: app.globalData.couple_id,
        // couple_id: '79550af260532c9f0ab87e60347730fb',
        current: 1,
        pageSize: 5,
    }, false)
    const [apiLoading, setApiLoading] = useState(false)

    Taro.eventCenter.on('refreshWish', setLoading)

    Taro.eventCenter.on('updateWish', updateList)

    useReachBottom(() => {
        if (!list.pagination.lastPage) {
            setIncreasing(true)
        }
    })

    usePullDownRefresh(() => setLoading(true))

    if (!app.globalData.couple_id) {
        return (
            <View className="container">
                <View className="slogan">我们的心愿</View>
                <View className="content">
                    <View className="remark">心愿清单功能需先绑定情侣关系</View>
                    <View className="lover-btn" onClick={() => Taro.navigateTo({ url: `/pages/home/lover/index/index` })}>绑定情侣</View>
                </View>
            </View>
        )
    }

    return (
        <View className="container">
            <View className="slogan">我们的心愿</View>
            <PaginationProvider
                loading={loading || apiLoading}
                increasing={increasing}
                list={list.list}
                lastPage={list.pagination.lastPage || true}
                renderItem={(item, index) =>
                    <WishItem item={item} index={index} setApiLoading={setApiLoading}></WishItem>
                }
            />
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index` })} ></Image>
        </View>
    )
}