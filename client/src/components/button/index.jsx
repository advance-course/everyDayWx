import React, { Component } from 'react'
import { Button, Icon } from '@tarojs/components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

class RButton extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }



  render() {
    const { type, size, disabled, children, ...other } = this.props;
    const btnClassName = classnames({
      'btn': true,
      [`btn-${type}`]: true,
      [`btn-${size}`]: true,
      'btn-disabled': disabled,
    },)
    return(
      <Button
        className={btnClassName}
        {...other}
      >
        {children}
      </Button>
    )
  }
}

RButton.defaultProps = {
	type: 'default',
  size: 'default',
  disabled: false,
}

RButton.propTypes = {
	type: PropTypes.oneOf(['default', 'primary', 'warning', 'ghost']),
  size: PropTypes.oneOf(['default', 'small', 'large', 'full']),
  disabled: PropTypes.bool,
}

export default RButton;
