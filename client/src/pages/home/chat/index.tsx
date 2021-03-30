import React from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { sendTextApi } from 'api/chat'
import useWatchChatList from 'hooks/useWatchChatList'
import "./index.scss"

const app = Taro.getApp()

export default function ChatIndex() {

    const { chatList, userInfo, setChatList } = useWatchChatList(app.globalData.couple_id)

    let titleInput = ''

    const sendText = async function () {
        try {
            setChatList([...chatList, {
                openId: app.globalData.host_open_id,
                textContent: titleInput
            }])
            const res = await sendTextApi({
                text: titleInput,
                coupleId: app.globalData.couple_id
            })
            // setChatList([...chatList, res.data])
            titleInput = ''
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
                    chatList.map(item => (
                        item.openId === app.globalData.host_open_id ?
                            <View className='message-container host'>
                                <View className="message host-message">{item.textContent}</View>
                                <Image className="avatar" mode="widthFix" src={userInfo.hostInfo.avatarUrl}></Image>
                            </View>
                            : <View className="message-container">
                                <Image className="avatar" mode="widthFix" src={userInfo.loverInfo.avatarUrl}></Image>
                                <View className="message">{item.textContent}</View>
                            </View>
                    ))
                }
            </View>
            <View className="input">
                <Input className="input-area" type='text' placeholder='请输入聊天内容' focus value={titleInput} onInput={onInput}></Input>
                <View className="send-btn" onClick={() => sendText()}>发送</View>
            </View>
        </View>
    )
}