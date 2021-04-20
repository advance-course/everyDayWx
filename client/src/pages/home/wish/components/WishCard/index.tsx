import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { finishWishApi, deleteWishApi, WishInfo } from "pages/home/wish/api/wish";
import "./index.scss"
import editIcon from './edit.png'
import deleteIcon from './delete.png'

const app = Taro.getApp()

interface SetApiLoading {
  (loading: boolean): void;
}

interface DeleteItem {
  (index: number): Promise<void>
}

interface props {
  item: WishInfo
  index: number
  setApiLoading: SetApiLoading
  deleteItem: DeleteItem
}

export default function WishItem(props: props) {
  const { item, index, setApiLoading, deleteItem } = props

  const finishWish = async function (_id, index) {
    try {
      setApiLoading(true)
      await finishWishApi(_id, app.globalData.host_open_id)
      const updateWish = {
        item: {
          ...item,
          host_finish: true,
          progress: item.progress || 0 + 50
        },
        index
      }
      Taro.eventCenter.trigger('updateWish', updateWish)
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

  const deleteWish = function (_id) {
    Taro.showModal({
      title: '提示',
      content: '确定删除该心愿吗？',
      async success(res) {
        if (res.confirm) {
          console.log('trigger')
          try {
            setApiLoading(true)
            await deleteWishApi(_id)
            deleteItem(index)
            setApiLoading(false)
          } catch (error) {
            console.error(error)
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  return (
    <View className="wish-item">
      <View className="header">
        <View className="wish-info">
          <View className="title">{item.title}</View>
          <View className="create-time">{new Date(item.createTime || 0).toLocaleDateString()}</View>
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
        <Image className="delete-icon" mode="widthFix" src={deleteIcon} onClick={() => deleteWish(item._id)} ></Image>
        <Image className="edit-icon" mode="widthFix" src={editIcon} onClick={() => editWish(item, index)} ></Image>
      </View>
    </View>
  )
}