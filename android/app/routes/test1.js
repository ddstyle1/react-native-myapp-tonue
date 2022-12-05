import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Toune from '../Views/Tonue/index';
import ProgressDemo from '../Views/Tonue/progressDemo';
import DatePickerDemo from '../Views/Tonue/DatePickerDemo';
import SemiComponentsDemo from '../Views/Tonue/SemiComponentsDemo';

// 定义路由
const TouneStack = createStackNavigator();
const TouneStackScreen = () => {
  return (
    <TouneStack.Navigator
      screenOptions={{
        headerShown: false // 不展示标题栏
      }}>
      <TouneStack.Screen name='TouneScreen' component={Toune} />
      <TouneStack.Screen name='ProgressDemo' component={ProgressDemo} />
      <TouneStack.Screen name='DatePickerDemo' component={DatePickerDemo} />
      <TouneStack.Screen name = 'SemiComponentsDemo' component={SemiComponentsDemo}/>
    </TouneStack.Navigator>
  )
}


export default TouneStackScreen;
