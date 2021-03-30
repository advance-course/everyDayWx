import React from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { Message as IMessage } from "api/chat";
import { Userinfo } from "api/user";
import errorIcon from './error.png'
import './index.scss'

interface props {
    message: IMessage,
    coupleInfo: {
        loverInfo: Userinfo;
        hostInfo: Userinfo;
    }
    host: boolean,
}

export default function Message(props: props) {
    const { message, host, coupleInfo } = props

    let content = <Text></Text>

    switch (message.msgType) {
        case 'text':
            content = <Text>{message.textContent}</Text>
            break;

        default:
            break;
    }

    return (
        host ?
            <View className='message-container host'>
                {message.fail && <Image className="error-icon" mode="widthFix" src={errorIcon}></Image>}
                <View className="host-message">{content}</View>
                <Image className="avatar" mode="widthFix" src={coupleInfo.hostInfo.avatarUrl}></Image>
            </View>
            :
            <View className="message-container">
                <Image className="avatar" mode="widthFix" src={coupleInfo.loverInfo.avatarUrl}></Image>
                <View className="lover-message">{content}</View>
            </View>
    )
}