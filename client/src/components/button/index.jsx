import React, { Component } from 'react'
import { Button, Icon } from '@tarojs/components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

class RButton extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler(event) {
    if(!this.props.disabled) {
      this.props.onClick && this.props.onClick(event)
    }
  }

  render() {
    const { type, size, disabled, loading, children, ...other } = this.props;
    const btnClassName = classnames({
      'btn': true,
      [`btn-${type}`]: true,
      [`btn-${size}`]: true,
      'btn-disabled': disabled,
      'btn-loading': loading
    },)
    
    const iconNode = icon ? <DIcon /> : null;
    
    if(loading) {
      iconNode = <DIcon loading />
    }

    return(
      <Button
        className={btnClassName}
        onClick={this.clickHandler()}
        {...other}
      >
        {iconNode}
        <View className='RButton_text'>{children}</View>
      </Button>
    )
  }
}

RButton.defaultProps = {
	type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  onClick: () => {}
}

RButton.propTypes = {
	type: PropTypes.oneOf(['default', 'primary', 'warning', 'ghost', 'noBorder']),
  size: PropTypes.oneOf(['default', 'small', 'large', 'full']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func
}

export default RButton;
