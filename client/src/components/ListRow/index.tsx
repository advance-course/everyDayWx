import React, { Component } from 'react'
import Picker from './components/Picker'
import CityPicker from './components/CityPicker'
import UserPicker from './components/UserPicker'

export default class ListRow extends Component {
    static Picker = Picker
    static CityPicker = CityPicker
    static UserPicker = UserPicker
}