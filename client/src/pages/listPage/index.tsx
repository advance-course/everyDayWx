import React from 'react'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import ListRow from '../../components/list-row'
import './index.scss'

export default function ListPage () {
  const handleSwitchChange = (e: CommonEvent): void => {
    console.log('onSwitchChange', e)
  }

  const handleClick = (e: CommonEvent): void => {
    console.log('onClick', e)
  }

  return (
    <View className='page'>
      <View className='doc-header'>ListRow</View>
      <View className='doc-body'>
        <View className='panel'>
          <View className='panel__title'>基本用法</View>
          <View className='panel__content'>
            <View className='example-item'>
              <ListRow title='标题文字' onClick={handleClick} />
              <ListRow title='标题文字' arrow='right' />
              <ListRow title='标题文字' extraText='查看详情' arrow='right' />
              <ListRow title='禁用状态' disabled extraText='查看详情' />
            </View>
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>带描述信息</View>
          <View className='panel__content'>
            <View className='example-item'>
              <ListRow title='标题文字' note='描述信息' onClick={handleClick} />
              <ListRow title='标题文字' note='描述信息' arrow='right' />
              <ListRow
                arrow='right'
                note='描述信息'
                title='我是一个很长很长很长的标题文字'
                extraText='查看详情查看详情查看详情查看详情'
              />
              <ListRow
                disabled
                arrow='right'
                title='我是一个很长很长很长的标题文字'
                note='禁用状态'
                extraText='查看详情查看详情查看详情查看详情'
              />
            </View>
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>带图片</View>
          <View className='panel__content'>
            <View className='example-item'>
              <ListRow
                title='标题文字'
                arrow='right'
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                onClick={handleClick}
              />
              <ListRow
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              />
              <ListRow
                title='标题文字'
                note='描述信息'
                extraText='查看详情'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
              <ListRow
                disabled
                title='标题文字'
                note='禁用状态'
                extraText='查看详情'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            </View>
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>带 Switch 按钮</View>
          <View className='panel__content'>
            <View className='example-item'>
              <ListRow
                isSwitch
                title='标题文字'
                onClick={handleClick}
                onSwitchChange={handleSwitchChange}
              />
              <ListRow
                isSwitch
                checked
                title='标题文字'
                onSwitchChange={handleSwitchChange}
              />
              <ListRow
                isSwitch
                disabled
                checked
                title='禁用状态'
                onSwitchChange={handleSwitchChange}
              />
            </View>
          </View>
        </View>

        <View className='panel'>
          <View className='panel__title'>无边框</View>
          <View className='panel__content'>
            <View className='example-item'>
              <ListRow
                isSwitch
                checked
                title='标题文字'
                bordered={false}
                onClick={handleClick}
                onSwitchChange={handleSwitchChange}
              />
              <ListRow
                title='标题文字'
                note='描述信息'
                extraText='查看详情'
                arrow='right'
                bordered={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
