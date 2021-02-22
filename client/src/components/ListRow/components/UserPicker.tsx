import React from "react";
import { View, Image, Picker as TaroPicker } from "@tarojs/components";
import editIcon from '../img/edit.png'


interface props {
    image: string,
    text: string,
    changeFn: any,
    userType: number,
}

const superUserTypeList = [
    { label: "超级管理员", value: 1 },
    { label: "管理员", value: 2 },
    { label: "普通用户", value: 3 },
    { label: "尊贵VIP", value: 4 }
];

const userTypeList = [
    { label: "管理员", value: 2 },
    { label: "普通用户", value: 3 },
    { label: "尊贵VIP", value: 4 }
];


export default function UserPicker(props: props) {
    const { image, text, changeFn, userType } = props
    let range, admin
    if (userType === 2) {
        admin = true
        range = userTypeList
    }
    if (userType === 1) {
        admin = true
        range = superUserTypeList
    }
    const changeUserType = function (e) {
        changeFn({
            type: range[e.detail.value].value
        })
    }
    return (
        < View >
            <Image src={image} />
            {text}
            {
                admin &&
                <TaroPicker className="edit" mode='selector' rangeKey='label' value={0} range={range} onChange={changeUserType}>
                    <Image src={editIcon} />
                </TaroPicker>
            }
        </ View>
    )
}