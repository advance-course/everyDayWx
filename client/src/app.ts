import { Component } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

class App extends Component {
  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'develop-1gsdlqw8ff792ed2',
        traceUser: true
      })
    }
    const updateManager = Taro.getUpdateManager()
    updateManager.onUpdateReady(() => {
      updateManager.applyUpdate()
    })
  }

  componentDidShow () {}
  componentDidHide () {}
  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
