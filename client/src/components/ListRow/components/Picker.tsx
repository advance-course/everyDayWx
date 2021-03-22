import React from "react";
import { View, Image, Picker as TaroPicker } from "@tarojs/components";
import editIcon from '../img/edit.png'


interface props {
    image: string,
    text: string,
    admin: boolean,
    onChange: any,
    range: object[]
}

export default function Picker(props: props) {
    const { image, text, admin, onChange, range } = props
    return (
        < View >
            <Image src={image} /> 
            {text}
            {
                admin &&
                <TaroPicker className="edit" mode='selector' rangeKey='label' value={0} range={range} onChange={onChange}>
                    <Image src={editIcon} />
                </TaroPicker>
            }
        </ View>
    )
}