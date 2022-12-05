import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BaseView from '../BaseView';
import System from '../../utils/System';
import TouneItems from './ItemContants';
import LocalStorage from '../../utils/LocalStorage'
const px2dp = (val) => System.px2dp(val)
import { DeviceEventEmitter } from 'react-native';



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
    const { navigate } = this.props.navigation;
    navigate(`${page}`, params);
  }

  loginout=()=>{
    console.log('退出');
    LocalStorage.removeItem('cookie')
    LocalStorage.getItem('cookie').then((ret)=>{
      DeviceEventEmitter.emit('dd',ret)
    });
    
  }

  renderContent() {
    return (
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {TouneItems.map((item, index) =>
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => { this.jumpToPage(item.nextPage, item.params) }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.btn,{width:200},{marginTop:200}]} onPress={()=>{this.loginout()}}>
            <Text style={{color:'#fff'}}>退出</Text>
          </TouchableOpacity>
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
  },
  btn:{
    height:35,
    backgroundColor:'#4d796e',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#ffffff',
  },
})
