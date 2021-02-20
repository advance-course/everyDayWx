import React from "react";
import { View, Image, Picker as TaroPicker } from "@tarojs/components";
import editIcon from '../img/edit.png'


interface props {
    image: string,
    text: string,
    admin: boolean,
    changeFn: any
}

export default function CityPicker(props: props) {
    const { image, text, admin, changeFn } = props
    return (
        < View >
            <Image src={image} />
            {text}
            {
                admin &&
                <TaroPicker className="edit" mode='region' value={[]} onChange={changeFn}>
                    <Image src={editIcon} />
                </TaroPicker>
            }
        </ View>
    )
}