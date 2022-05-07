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
    currentStepID: 0,
    currentStepKey: '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLine() {
    return (
      <Text style={styles.dashItemHorizontal}></Text>
    )
  }

  render() {
    const { style, steps, currentStepID, circleStyle } = this.props;
    console.log(steps, 'steps=====');
    return (
      <View style={[styles.contaniner, style]}>
        {steps.map((v, index) => {
          return (
            <>
              <View style={{ alignItems: 'center' }} key={index}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.circle, circleStyle, index <= currentStepID ? styles.solid : styles.noSolid]}></View>
                </View>
                <Text >{v?.name}</Text>
              </View>
              {index !== steps.length - 1 ? this.renderLine() : null}
            </>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaniner: {
    width: 330,
    height: 30,
    flexDirection: 'row',
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  solid: {
    backgroundColor: 'orange',
    borderWidth: 1,
    borderColor: '#fff',
  },
  noSolid: {
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#999',
  },
  dashItemHorizontal: {
    width: 18,
    height: 1,
    marginTop: 12,
    backgroundColor: '#ccc',
  }
})
