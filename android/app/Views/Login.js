import React,{ Component } from 'react';
import { View, TouchableHighlight, StyleSheet, Text,TextInput } from 'react-native';
import LocalStorage from "../utils/LocalStorage";
import { DeviceEventEmitter } from 'react-native';

const LoginForm = [
  {
    text:'手机号',
    type:'numeric',
    placeholder:'请输入11位手机号',
    secureTextEntry:false,
    key:'phone',
  },
  {
    text:'密码',
    type:'default',
    placeholder:'请输入密码',
    secureTextEntry:true,
    key:'pwd',
  }
]
export class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      logined:false,
      phone:'',
      code:'',
      secondsElapsed:0,
    }
  }

  componentDidMount(){}

  login = ()=>{
    const phone = this.state.phone;
    const code = this.state.code;
    // 检测手机号格式

    // 模拟true
    try {
      LocalStorage.setItem('cookie','ssghashjgag');
    } catch (error) {
      alert('此平台不支持localstorage')
    }
    LocalStorage.getItem('cookie').then((ret)=>{
      console.log(ret,'ret');
      DeviceEventEmitter.emit('dd',ret)
    });
  }

  onChangeText=(key,txt)=>{
    console.log(key,txt);
    switch (key){
      case 'phone':
        this.setState({phone:txt});
        break;
    }
  }

  logout=()=>{
    this.setState({
      logined:false,
    })
  }

  renderLogin = ()=>{
    return(
      <View style={styles.loginform}>
        <Text style={[styles.title,{marginTop:100}]}>轴魔用户登录</Text>
        {LoginForm.map((item,index)=>{
          return (
            <View key={index} style={[styles.inputRow,{marginTop:50}]}>
              <Text style={styles.label}>{item.text}</Text>
              <TextInput 
                keyboardType ={item.type}
                clearButtonMode='while-editing'
                style={styles.input}
                placeholder={item.placeholder}
                secureTextEntry={item.secureTextEntry}
                onChangeText={(text)=>{this.onChangeText(item.key,text)}}
              />
            </View>
          )
        })}
        <TouchableHighlight style={[styles.btn,{width:200},{marginTop:200}]} underlayColor='#0057a84a' onPress={()=>{this.login()}}>
          <Text style={{color:'#fff'}}>登录</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderLogined = ()=>{
    return(
      <View style={[styles.container]}>
        <Text style={{alignItems:'center',justifyContent:'center'}}>欢迎你:user_id:{user_id} access_token:{access_token}</Text>
        <TouchableHighlight style={[styles.btn,styles.marginTop30]} onPress={this.logout}>
          <Text style={{color:'#fff'}}>退出</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render(){
    return (
      <>
        {this.state.logined?this.renderLogined():this.renderLogin()}
      </>
    )
  }
}

const styles = StyleSheet.create({
  loginform:{
    alignItems:'center',
  },
  title:{
    textAlign:'center',
    fontSize:16,
    fontWeight:'bold',
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  label:{
    width:60,
  },
  input:{
    backgroundColor: '#F5F6FA',
    color: '#999999',
    height: 33,
    width:200,
    borderRadius: 16.5,
    fontSize: 14,
    paddingHorizontal:20,
    paddingTop: 7.5,
    paddingBottom: 7.5,
  },
  container:{
    flex:1,
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
  marginTop30:{
    marginTop:30,
  }
})
export default Login;