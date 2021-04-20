import React, { useState, useEffect } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, WishInfo } from "api/wish";
import usePagination from 'hooks/usePagination/index'
import PaginationProvider from 'components/PaginationProvider'
import WishItem from 'components/home/wish/WishCard'
import "./index.scss"
import createIcon from './create.png'

const app = Taro.getApp()

export default function Index() {

  const { list, loading, increasing, deleteItem, updateList, setIncreasing, setLoading } = usePagination<WishInfo>(getAllWishApi, {
    couple_id: app.globalData.couple_id,
    current: 1,
    pageSize: 5,
  }, false)
  const [apiLoading, setApiLoading] = useState(false)

  useEffect(() => {
    Taro.eventCenter.on('refreshWish', setLoading)
    Taro.eventCenter.on('updateWish', updateList)
    return () => {
      Taro.eventCenter.off('refreshWish')
      Taro.eventCenter.off('updateWish')
    }
  }, [])

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
          <WishItem item={item} index={index} setApiLoading={setApiLoading} deleteItem={deleteItem}></WishItem>
        }
      />
      <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index` })} ></Image>
    </View>
  )
}