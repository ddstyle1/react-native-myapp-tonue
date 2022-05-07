import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Toune from '../Views/Tonue/index';
import ProgressDemo from '../Views/Tonue/progressDemo';

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
    </TouneStack.Navigator>
  )
}

const TouneDetailScreen = () => {
  <TouneStack.Navigator
    screenOptions={{
      headerShown: false // 不展示标题栏
    }}>
    {/* <TouneStack.Screen name='TouneScreen' component={Toune} /> */}
    <TouneStack.Screen name='ProgressDemo' component={ProgressDemo} />
  </TouneStack.Navigator>
}

export default { TouneStackScreen, TouneDetailScreen };
