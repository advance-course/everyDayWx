import React from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, WishInfo } from "api/wish";
import "./index.scss"
import createIcon from './create.png'
import usePagination from 'hooks/usePagination/index'
import PaginationProvider from 'components/PaginationProvider'

export default function Index() {
    const { list, loading, increasing, updateList, setIncreasing, setLoading } = usePagination<WishInfo>(getAllWishApi, {
        couple_id: Taro.getApp().globalData.couple_id,
        current: 1,
        pageSize: 15,
    }, false)

    Taro.eventCenter.on('refreshWish', setLoading)

    Taro.eventCenter.on('updateWish', updateList)

    useReachBottom(() => {
        if(!list.pagination.lastPage) {
            setIncreasing(true)
        }
    })

    usePullDownRefresh(() => setLoading(true))

    return (
        <View className="container">
            <View className="title">心愿清单</View>
            <View className="input-label">我们的心愿</View>
            <PaginationProvider
                loading={loading}
                increasing={increasing}
                list={list.list}
                lastPage={list.pagination.lastPage || true}
                renderItem={((item, index) => {
                    return (
                        <View className="wish-card">
                            <View>{item.title}</View>
                            <View onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index?_id=${item._id}&index=${index}` })}>编辑</View>
                        </View>
                    )
                })}
            />
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index` })} ></Image>
        </View>
    )
}