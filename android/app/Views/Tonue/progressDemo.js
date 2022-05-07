import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseView from '../BaseView';
import ProgressStep from '../../components/ProgressStep';
import System from '../../utils/System';

const px2dp = (val) => System.px2dp(val)



export default class ProgressDemo extends BaseView {

  constructor(props) {
    super(props);
    this.navBarTitle = '组件详情';
    this.navBarStyle = {
      height: px2dp(56),
      backgroundColor: '#F5F6FA'
    }
  }

  jumpToPage = (page, params) => {
    // const { navigate } = this.props.navigation
    // navigate(`${page}`, params);
  }

  renderContent() {
    const steps = [
      {
        name: '选择商品',
        key: 'chooseItem',
      }, {
        name: '商品信息',
        key: 'itemInfo',
      }, {
        name: '顾客信息',
        key: 'userInfo',
      },
      {
        name: '提交成功',
        key: 'submit',
      },
    ];
    return (
      <View style={{ marginLeft: 50 }}>
        <ProgressStep steps={steps} currentStepID={'1'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    height: px2dp(700),
  },
  box: {
    width: 330,
    height: 50,
    backgroundColor: '#F5F6FA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    marginTop: 10,
  }
})
