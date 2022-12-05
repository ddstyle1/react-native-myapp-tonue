import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import System from '../utils/System';

const px2dp = (val) => System.px2dp(val)

export default class ProgressStep extends Component {

  static propTypes = {
    style: PropTypes.object,
    circleStyle: PropTypes.object,
    steps: PropTypes.array,
    currentStepID: PropTypes.string,
    currentStepKey: PropTypes.string,
    
  }

  static defaultProps = {
    style: {},
    circleStyle: {},
    steps: [],
    currentStepID: '0',
    currentStepKey: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      itemHeight:0,
      itemWidth:0,
    };
  }

  getContainerSize = (e)=>{
    console.log(e.nativeEvent.layout.height,e.nativeEvent.layout.width);
    this.setState({
      itemHeight: e.nativeEvent.layout.height,
      itemWidth: e.nativeEvent.layout.width,
    });
  }
  renderLine() {
    return (
      <Text style={styles.dashItemHorizontal}></Text>
    )
  }

  render() {
    const { style, steps, currentStepID, circleStyle } = this.props;
    const { itemWidth } = this.state;
    // 配置进度数目
    const progress = steps.length;
    let circleHeight = 24;
    // 检测外部是否传了circleStyle
    if( Object.getOwnPropertyNames(circleStyle).length!==0 ){
      circleHeight = circleStyle.height;
    }
    return (
      <View style={[styles.contaniner, style]}>
        {steps.map((v, index) => {
          return (
            <>
              <View 
                style={{ justifyContent:'center', alignItems: 'center',flex:1 }} 
                key={index}
                onLayout={(event) => this.getContainerSize(event)}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.dashItemHorizontal,{width:(itemWidth-circleHeight)/2,marginTop:circleHeight/2},index===0?{backgroundColor:'transparent'}:{backgroundColor:'#DEE2ED'}]}/> 
                  <View style={[styles.circle, circleStyle, index <= currentStepID ? styles.solid : styles.noSolid]}>
                    <Text 
                      style={
                        index <= currentStepID?
                        {...styles.orangenumtxt,lineHeight:circleHeight-6}:{...styles.graynumtxt,lineHeight:circleHeight-5}
                      }
                    >
                      {index+1>9?index+1:'0'+String(index+1)}
                    </Text>
                  </View>
                  <Text style={[styles.dashItemHorizontal,{width:(itemWidth-circleHeight)/2,marginTop:circleHeight/2},index===progress-1?{backgroundColor:'transparent'}:{backgroundColor:'#DEE2ED'}]}/>                         
                </View>
                <Text style={index <= currentStepID?styles.orangeTxt:styles.grayTxt}>{v?.name}</Text>
              </View>
            </>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaniner: {
    height: 30,
    flexDirection: 'row',
    display:'flex',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  solid: {
    backgroundColor: '#FF8E4A',
    borderWidth: 3,
    borderColor: 'rgba(255, 142, 74, 0.2)',
  },
  noSolid: {
    borderWidth: 3,
    borderColor:'transparent',
    backgroundColor: 'rgba(222, 226, 237, 1)',
  },
  dashItemHorizontal: {
    height: 2,
    // backgroundColor: '#ccc',
  },
  orangenumtxt:{
    fontSize:11.25,
    textAlign:'center',
    color:'#FFFFFF'
  },
  graynumtxt:{
    fontSize:11,
    textAlign:'center',
    color:'#888888'
  },
  orangeTxt:{
    color:'#FF8E4A'
  },
  grayTxt:{
    color:'#BBBBBB',
  }
})
