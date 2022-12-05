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

  renderContent() {
    const steps = [
      {
        name: 'progress1',
        key: 'progress1',
      }, {
        name: 'progress2',
        key: 'progress2',
      }, {
        name: 'progress3',
        key: 'progress3',
      },
      {
        name: 'progress4',
        key: 'progress4',
      },
    ];
    
    return (
      <View style={{marginTop:20}}>
        <ProgressStep 
          steps={steps} 
          currentStepID={'2'} 
          circleStyle = {{height:28,width:28,borderRadius:14}}
        />
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
