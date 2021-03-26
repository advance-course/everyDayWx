import React, { useState } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { Result } from 'utils/http'
import { getAllWishApi, WishInfo } from "api/wish";
import { Page, PageData } from "hooks/usePagination/entity";
import usePagination from 'hooks/usePagination/index'
import PaginationProvider from 'components/PaginationProvider'
import WishItem from 'components/home/wish/WishCard'
import "./index.scss"
import createIcon from './create.png'

const app = Taro.getApp()

export default function Index() {

    const { list, loading, increasing, updateList, updateAllList, setIncreasing, setLoading, splice } = usePagination<WishInfo>(getAllWishApi, {
        couple_id: app.globalData.couple_id,
        // couple_id: '79550af260532c9f0ab87e60347730fb',
        current: 1,
        pageSize: 5,
    }, false)
    const [apiLoading, setApiLoading] = useState(false)

    Taro.eventCenter.off('refreshWish')
    Taro.eventCenter.on('refreshWish', setLoading)

    Taro.eventCenter.off('updateWish')
    Taro.eventCenter.on('updateWish', updateList)

    Taro.eventCenter.off('deleteWish')
    Taro.eventCenter.on('deleteWish', async index => {
        const deletePageNumber = Math.ceil((index + 1) / (list.pagination.pageSize || 10))
        if (list.pagination.current === 1) {
            setLoading(true)
        } else {
            let i = deletePageNumber
            let updateList: PageData<WishInfo> = { pagination: { current: 1 }, list: [] }
            const apiResultList: Promise<Result<Page<WishInfo>>>[] = []
            while (i <= list.pagination.current) {
                apiResultList.push(getAllWishApi({
                    couple_id: app.globalData.couple_id,
                    current: i,
                    pageSize: list.pagination.pageSize,
                }))
                i++
            }
            try {
                const res = await Promise.all(apiResultList)
                const { current = 1, pageSize, lastPage, total } = res[res.length - 1].data
                let tmpList: WishInfo[] = []
                res.forEach(item => {
                    tmpList = tmpList.concat(item.data.list)
                })
                updateList.list = JSON.parse(JSON.stringify(list.list))
                const deleteIndex = (deletePageNumber - 1) * (list.pagination.pageSize || 10)
                const deleteCount = (list.pagination.current - deletePageNumber + 1) * (list.pagination.pageSize || 10)
                updateList.list.splice(deleteIndex, deleteCount, ...tmpList)
                updateList.pagination = {
                    current,
                    pageSize,
                    lastPage,
                    total
                }
                updateAllList(updateList)
            } catch (error) {
                console.error(error)
            }
        }
    })

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
                lastPage={list.pagination.lastPage || false}
                renderItem={(item, index) =>
                    <WishItem item={item} index={index} setApiLoading={setApiLoading}></WishItem>
                }
            />
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index` })} ></Image>
        </View>
    )
}