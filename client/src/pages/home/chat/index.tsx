import React, { useState } from 'react'
import Taro, { useShareAppMessage, getCurrentInstance } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { sendTextApi, getChatListApi, ChatItem } from 'api/chat'
import useWatchChatList from 'hooks/useWatchChatList'
import "./index.scss"

const app = Taro.getApp()

export default function ChatIndex() {

    const { chatList, setChatList } = useWatchChatList(app.globalData.couple_id)

    let titleInput = ''

    const sendText = async function () {
        try {
            const res = await sendTextApi({
                text: titleInput,
                coupleId: app.globalData.couple_id
            })
            console.log(res)
            setChatList([...chatList, res.data])
        } catch (error) {
            console.log(error)
            console.error(error.message)
        }
    }

    const onInput = function (e) {
        titleInput = e.detail.value
    }

    return (
        <View className="container">
            <View className="chat-content">
                {
                    chatList.map(item => <View>{item.textContent}</View>)
                }
            </View>
            <View className="input">
                <Input className="input-area" type='text' placeholder='请输入聊天内容' focus onInput={onInput}></Input>
                <View className="send-btn" onClick={() => sendText()}>发送</View>
            </View>
        </View>
    )
}