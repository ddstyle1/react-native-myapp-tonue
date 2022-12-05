import React, { Component } from 'react';
import { TextInput } from 'react-native';
import BaseView from '../BaseView';

/**
 * 半受控组件 
 * getDerivedStateFromProps()
 */
class SemiComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: props?.value || '', //  
    }
  }

  onChange = e =>{
    const { onChange } = this.props;
    if (onChange) {
     onChange(e.target.value);
    } else {
     this.setState({
      value: e.target.value,
     });
    }
  }

  static getDerivedStateFromProps(nextProps,{prevProps}){
    if(typeof nextProps?.value==='string'){
      return {
        value:nextProps?.value,
      }
    }
    return null;
  }

  render(){
    const { value } = this.state;
    return (
      <TextInput value={value} onChangeText={this.onChange} style={{width:100,height:50}}/>
    )
  }
}

/**
 * componentWillReceiveProps 上层组件更新时会触发
 * 上层组件更新和组件本身 setState都会触发 getDerivedStateFromProps
 */

class SpecialInput extends Component {
  state = {
   prevProps: this.props,
   value: this.props.value,
  };
 
  onChange = e => {
   this.setState({
    value: e.target.value,
   });
  };
 
  onBlur = e => {
   this.props.onChange(e.target.value);
  };
 
  // 比较props是不是同一个对象
  static getDerivedStateFromProps(nextProps, { prevProps }) {
   if (nextProps !== prevProps) {
    return {
     prevProps: nextProps,
     value: nextProps.value,
    };
   }
   return null;
  }
 
  render() {
   const { value } = this.state;
   return (
      <TextInput value={value} onChange={this.onChange} onBlur={this.onBlur} />
   );
  }
}
 
export default class SemiComponentsDemo extends BaseView {
  constructor(props){
    super(props);
  }
  renderContent(){
    const { value } = this.state;
    return (
      <SemiComponent value={'父组件的props'}/>
    )
  }
}