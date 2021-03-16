import React from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, WishInfo } from "api/wish";
import "./index.scss"
import createIcon from './create.png'
import usePagination from '../../../hooks/usePagination/index'
import PaginationProvider from '../../../components/PaginationProvider'

const openId = 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q'

export default function Index() {
    const { list, loading, increasing, updateList, setIncreasing, setLoading } = usePagination<WishInfo>(getAllWishApi, {
        openid: openId,
        current: 1,
        pageSize: 15,
    }, false)

    Taro.eventCenter.on('refreshWish', () => setLoading(true))

    Taro.eventCenter.on('updateWish', updateWish => {
        const updateIndex = list.list.findIndex(wish => wish._id === updateWish._id)
        updateList(updateWish, updateIndex)
    })

    useReachBottom(() => !list.pagination.lastPage && setIncreasing(true))

    usePullDownRefresh(() => setLoading(true))

    return (
        <View className="container">
            <View className="title">心愿清单</View>
            <View className="input-label">我们的心愿</View>
            <PaginationProvider
                loading={loading}
                increasing={increasing}
                list={list.list}
                isBottom={list.pagination.lastPage || true}
                renderItem={(item => {
                    return (
                        <View className="wish-card">
                            <View>{item.title}</View>
                            <View onClick={() => Taro.navigateTo({ url: `/pages/wish/edit/index?_id=${item._id}` })}>编辑</View>
                        </View>
                    )
                })}
            />
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/wish/edit/index` })} ></Image>
        </View>
    )
}