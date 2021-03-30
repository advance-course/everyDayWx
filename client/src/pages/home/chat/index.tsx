import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import Provider from 'components/Provider'
import useWatchChatList from 'hooks/useWatchChatList'
import "./index.scss"

const app = Taro.getApp()

export default function ChatIndex() {

    const { chatList, userInfo, loading, errMsg, sendText } = useWatchChatList(app.globalData.couple_id)

    let titleInput = ''

    const onInput = function (e) {
        titleInput = e.detail.value
    }

    return (
        <Provider loading={loading} errMsg={errMsg}>
            <View className="container">
                <View className="chat-content">
                    {
                        chatList.map(item => (
                            item.openId === app.globalData.host_open_id ?
                                <View className='message-container host'>
                                    <View className="host-message">{item.textContent}</View>
                                    <Image className="avatar" mode="widthFix" src={userInfo.hostInfo.avatarUrl}></Image>
                                </View>
                                : <View className="message-container">
                                    <Image className="avatar" mode="widthFix" src={userInfo.loverInfo.avatarUrl}></Image>
                                    <View className="lover-message">{item.textContent}</View>
                                </View>
                        ))
                    }
                </View>
                <View className="input">
                    <Input className="input-area" type='text' placeholder='请输入聊天内容' focus value={titleInput} onInput={onInput}></Input>
                    <View className="send-btn" onClick={() => sendText(titleInput)}>发送</View>
                </View>
            </View>
        </Provider>
    )
}