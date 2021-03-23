import React, { useState } from 'react'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import { getAllWishApi, finishWishApi, WishInfo } from "api/wish";
import "./index.scss"
import createIcon from './create.png'
import editIcon from './edit.png'
import deleteIcon from './delete.png'
import usePagination from 'hooks/usePagination/index'
import PaginationProvider from 'components/PaginationProvider'

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

    const finishWish = async function (_id, index) {
        try {
            setApiLoading(true)
            await finishWishApi(_id, app.globalData.host_open_id)
            // await finishWishApi(_id, 'o-Owu5KuzM2IK_lsfEVcNiu4lY1Q')
            const updateWish = {
                item: {
                    ...list.list[index],
                    host_finish: true,
                    progress: list.list[index].progress || 0 + 50
                },
                index
            }
            updateList(updateWish)
            setApiLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const editWish = function (item, index) {
        if (item.host_finish || item.lover_finish) {
            Taro.showToast({
                title: '心愿已开始，无法修改',
                icon: 'none',
                duration: 2000
            })
            return
        }
        Taro.navigateTo({ url: `/pages/home/wish/edit/index?_id=${item._id}&index=${index}` })
    }

    const deleteWish = function () {
        Taro.showToast({
            title: '未开发功能',
            icon: 'none',
            duration: 2000
        })
    }

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
                renderItem={((item, index) => {
                    return (
                        <View className="wish-card">
                            <View className="header">
                                <View className="wish-info">
                                    <View className="title">{item.title}</View>
                                    <View className="create-time">{new Date(item.createTime).toLocaleDateString()}</View>
                                </View>
                                {
                                    item.host_finish ?
                                        <View className="done-btn">DONE</View>
                                        : <View className="doing-btn" onClick={() => finishWish(item._id, index)}>DONE</View>
                                }
                            </View>
                            <View className="progress">
                                <View className="progress-label">进度</View>
                                <View className="progress-bar">
                                    <View className="progress-bg" style={`width: ${item.progress}%;`}></View>
                                    <View className="progress-text">{item.progress}%</View>
                                </View>
                            </View>
                            <View className="footer">
                                <Image className="delete-icon" mode="widthFix" src={deleteIcon} onClick={() => deleteWish()} ></Image>
                                <Image className="edit-icon" mode="widthFix" src={editIcon} onClick={() => editWish(item, index)} ></Image>
                            </View>
                        </View>
                    )
                })}
            />
            <Image className="create-icon" mode="widthFix" src={createIcon} onClick={() => Taro.navigateTo({ url: `/pages/home/wish/edit/index` })} ></Image>
        </View>
    )
}