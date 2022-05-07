import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Dimensions } from 'react-native';

export default class RNnavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
  }

  renderLeftButton() {
    const { renderNavLeft, navBarTitle } = this.props;
    if (!renderNavLeft()) {
      console.log('ssasggah=====');
      return (
        <View>
          {/* 返回icon自行添加 */}
          <Text>{navBarTitle}</Text>
        </View>
      )
    } else {
      console.log('ssasggah');
      return (
        <>{renderNavLeft()}</>
      )
    }
  }

  renderRightButton() {
    const { renderNavRight } = this.props;
    if (renderNavRight()) {
      return (
        <>{renderNavRight()}</>
      )
    } else {
      return (<></>)
    }
  }

  // 
  renderNavBar = () => {
    const { navBarStyle } = this.props;
    console.log(navBarStyle, 'navBarStyle=====');
    return (
      <View style={[styles.navContainer, navBarStyle]}>
        {this.renderLeftButton()}
        {this.renderRightButton()}
      </View >
    )
  }

  render() {
    // 类型校验
    const { style } = this.props;
    return (
      <View style={[styles.contaniner, style]}>
        {this.renderNavBar()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaniner: {
    width: Dimensions.get('window').width,
  },
  navContainer: {
    paddingHorizontal: 0,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})