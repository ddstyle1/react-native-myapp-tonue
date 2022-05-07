import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BaseView from '../BaseView';
import System from '../../utils/System';
import TouneItems from './ItemContants';

const px2dp = (val) => System.px2dp(val)



export default class Toune extends BaseView {

  constructor(props) {
    super(props);
    this.navBarTitle = '组件列表';
    this.navBarStyle = {
      height: px2dp(56),
      backgroundColor: '#F5F6FA'
    }
  }

  jumpToPage = (page, params) => {
    console.log(page);
    const { navigate } = this.props.navigation;
    navigate(`${page}`, params);
  }

  // renderNavLeft() {
  //   const steps = [
  //     {
  //       name: '选择商品',
  //       key: 'chooseItem',
  //     }, {
  //       name: '商品信息',
  //       key: 'itemInfo',
  //     }, {
  //       name: '顾客信息',
  //       key: 'userInfo',
  //     },
  //     {
  //       name: '提交成功',
  //       key: 'submit',
  //     },
  //   ];
  //   return (
  //     <View style={{ marginLeft: 50 }}>
  //       <ProgressStep steps={steps} currentStepID={2} />
  //     </View>
  //   )
  // }

  renderContent() {
    return (
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {TouneItems.map((item, index) =>
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => { this.jumpToPage(item.detail, item.params) }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView >
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
