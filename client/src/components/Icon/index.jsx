import React, { Component } from "react";
import { Text } from "@tarojs/components";
import "../../downloadfonts/iconfont.css";
import classnames from "classnames";

class DIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconshow: true,
      iconload: false,
    };
    this.handleLoading = this.handleLoading.bind(this);
    this.handleSettimeout = this.handleSettimeout.bind(this);
    this.timeout = null;
  }
  handleLoading() {
    if (this.props.loading && this.timeout === null) {
      console.log("handleLoading new Date", new Date());
      this.setState({
        iconshow: false,
        iconload: true,
      });
      this.timeout = setTimeout(this.handleSettimeout, 4500);
    }
  }
  handleSettimeout() {
    console.log("handleSettimeout new Date", new Date());
    this.setState({
      iconshow: true,
      iconload: false,
    });
  }

  render() {
    clearTimeout(this.timeout);
    this.timeout = null;
    const { type, size, color, style } = this.props;
    const iconstyle = {
      fontSize: size,
      color: color,
      ...style,
    };

    let iconClass = classnames({
      iconfont: true,
      [`icon-${type}`]: this.state.iconshow,
      showload: this.state.iconload,
    });

    return (
      <Text
        class={iconClass}
        style={iconstyle}
        onClick={this.handleLoading}
      ></Text>
    );
  }
}

DIcon.defaultProps = {
  type: "add",
  size: "16px",
  loading: false,
  color: "black",
};

export default DIcon;
