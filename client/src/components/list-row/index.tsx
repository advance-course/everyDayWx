import React, { useMemo } from 'react'
import { Image, Switch, Text, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent, CommonEventFunction } from '@tarojs/components/types/common'
import classNames from 'classnames'
import './index.scss'

interface ListRowProps {
  title?: string
  note?: string
  thumb?: string
  extraText?: string
  switchColor?: string
  disabled?: boolean
  isSwitch?: boolean
  bordered?: boolean
  checked?: boolean
  arrow?: 'up' | 'down' | 'right'
  className?: string
  onClick?: CommonEventFunction
  onSwitchChange?: CommonEventFunction
}

export default function ListRow ({
  title = '',
  note = '',
  thumb = '',
  extraText = '',
  arrow,
  disabled = false,
  isSwitch = false,
  checked = false,
  switchColor = '#6190E8',
  bordered = true,
  className,
  onClick,
  onSwitchChange
}: ListRowProps) {
  const rootClass = useMemo(() => classNames(
    'ui-list-row',
    {
      'ui-list-row--thumb': thumb,
      'ui-list-row--disabled': disabled,
      'ui-list-row--no-border': !bordered
    },
    className
  ), [bordered, className, disabled, thumb])

  const handleClick = (event: ITouchEvent): void => {
    if (typeof onClick === 'function' && !disabled) {
      onClick(event)
    }
  }

  const handleSwitchClick = (e: CommonEvent): void => {
    e.stopPropagation()
  }

  const handleSwitchChange = (event: CommonEvent): void => {
    if (typeof onSwitchChange === 'function' && !disabled) {
      onSwitchChange(event)
    }
  }

  return (
    <View className={rootClass} onClick={handleClick}>
      {thumb && (
        <View className='ui-list-row-thumb row-thumb'>
          <Image
            className='row-thumb__info'
            mode='scaleToFill'
            src={thumb}
          />
        </View>
      )}
      <View className='ui-list-row-content row-content'>
        <View className='row-content__info'>
          <View className='row-content__info-title'>{title}</View>
          {note && <View className='row-content__info-note'>{note}</View>}
        </View>
      </View>
      <View className='ui-list-row-extra row-extra'>
        {extraText && <View className='row-extra__info'>{extraText}</View>}
        {isSwitch && !extraText && (
          <View className='row-extra__switch' onClick={handleSwitchClick}>
            <Switch
              color={switchColor}
              disabled={disabled}
              checked={checked}
              onChange={handleSwitchChange}
            />
          </View>
        )}
        {arrow && (
          <View className='row-extra__icon'>
            <Text
              className={`at-icon row-extra__icon-arrow at-icon-chevron-${arrow}`}
            />
          </View>
        )}
      </View>
    </View>
  )
}
