import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import Provider from 'components/Provider'
import Message from 'pages/home/chat/components/Message'
import useWatchChatList from 'hooks/useWatchChatList'
import "./index.scss"

export default function ChatIndex() {
  const { list, storageList, increasing, coupleInfo, loading, errMsg, sendText } = useWatchChatList()
  const showList = list.length ? list : storageList
  const [text, setText] = useState('')

  const onInput = function (e) {
    setText(e.detail.value)
  }
  const handleSendText = function () {
    sendText(text)
    setText('')
  }

  return (
    <Provider loading={loading} errMsg={errMsg} increasing={increasing}>
      <View className="container">
        <View className="chat-content">
          {
            showList.map(item =>
              <Message message={item} coupleInfo={coupleInfo} host={item.userId === coupleInfo.hostInfo._id}></Message>
            )
          }
        </View>
        <View className="input">
          <Input className="input-area" type='text' placeholder='请输入聊天内容' value={text} onInput={onInput}></Input>
          <View className="send-btn" onClick={() => handleSendText()}>发送</View>
        </View>
      </View>
    </Provider>
  )
}
