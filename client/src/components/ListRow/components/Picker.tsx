import React from "react";
import { View, Image, Picker as TaroPicker } from "@tarojs/components";
import editIcon from '../img/edit.png'


interface props {
    image: string,
    text: string,
    admin: boolean,
    changeFn: any,
    range: object[]
}

export default function Picker(props: props) {
    const { image, text, admin, changeFn, range } = props
    return (
        < View >
            <Image src={image} /> 
            {text}
            {
                admin &&
                <TaroPicker className="edit" mode='selector' rangeKey='label' value={0} range={range} onChange={changeFn}>
                    <Image src={editIcon} />
                </TaroPicker>
            }
        </ View>
    )
}