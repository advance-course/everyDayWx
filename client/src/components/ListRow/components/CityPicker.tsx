import React from "react";
import Taro from "@tarojs/taro";
import { View, Image, Picker as TaroPicker } from "@tarojs/components";
import editIcon from '../img/edit.png'


interface props {
    image: string,
    text: string,
    admin: boolean,
    country: string,
    changeFn: any
}

export default function CityPicker(props: props) {
    const { image, text, admin, country, changeFn } = props
    const changeRegion = function (e) {
        if (country !== 'China') {
            Taro.showToast({
                title: '仅支持修改中国地区',
                icon: 'none',
                duration: 1500
            })
            return
        }
        const region = {
            province: e.detail.value[0],
            city: e.detail.value[1],
            district: e.detail.value[2]
        }
        changeFn(region)
    }
    return (
        < View >
            <Image src={image} />
            {text}
            {
                admin &&
                <TaroPicker className="edit" mode='region' value={[]} onChange={changeRegion}>
                    <Image src={editIcon} />
                </TaroPicker>
            }
        </ View>
    )
}