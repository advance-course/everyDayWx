import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import Provider from 'components/Provider'
import Message from 'components/home/chat/Message'
import useWatchChatList from 'hooks/useWatchChatList'
import "./index.scss"

const app = Taro.getApp()

export default function ChatIndex() {

    const { chatList, coupleInfo, loading, errMsg, sendText } = useWatchChatList(app.globalData.couple_id)
    const [text, setText] = useState('')

    const onInput = function (e) {
        setText(e.detail.value)
    }
    const handleSendText = function () {
        sendText(text)
        setText('')
    }

    return (
        <Provider loading={loading} errMsg={errMsg}>
            <View className="container">
                <View className="chat-content">
                    {
                        chatList.map(item =>
                            <Message message={item} coupleInfo={coupleInfo} host={item.openId === app.globalData.host_open_id}></Message>
                        )
                    }
                </View>
                <View className="input">
                    <Input className="input-area" type='text' placeholder='请输入聊天内容' focus value={text} onInput={onInput}></Input>
                    <View className="send-btn" onClick={() => handleSendText()}>发送</View>
                </View>
            </View>
        </Provider>
    )
}