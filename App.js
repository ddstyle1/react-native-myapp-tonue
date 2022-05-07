/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Screen from './android/app/routes/test1';
// import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import ProgressDemo from './android/app/Views/Tonue/progressDemo';

// 解构
// 渲染自定义底部栏
const TabBar = ({ navigation, descriptors, state }) => {
  const { routes, index: activeRouteIndex } = state;

  return (
    <View style={Styles.container}>
      {routes.map((route, routeIndex) => {
        const { options: { tabBarActiveTintColor, tabBarInactiveTintColor } } = descriptors[route.key];
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? tabBarActiveTintColor : tabBarInactiveTintColor;
        // console.log(options);
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isRouteActive && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        }
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableNativeFeedback
            key={routeIndex}
            style={Styles.tabButton}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={Styles.tabButton}>
              <Text style={{ color: tintColor }}>{route.name}</Text>
            </View>
          </TouchableNativeFeedback>
        )
      })}
    </View>
  )
}

// 创建底部tab
// 后续根据需求新增tab
const BottomTab = createBottomTabNavigator();
const App = () => {
  const { TouneStackScreen } = Screen;
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: '#FF8E4A',
          tabBarInactiveTintColor: '#666666',
          headerShown: false // 不展示标题栏
        })}
        tabBar={(props) => <TabBar {...props} />}
      >
        <BottomTab.Screen name='Toune' component={TouneStackScreen} />
        <BottomTab.Screen name='Views' component={TouneStackScreen} />
      </BottomTab.Navigator>
    </NavigationContainer >
  )
}

// 
const Stack = createStackNavigator();
const Appv2 = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='mainRoute' component={App} />
        <Stack.Screen name='ProgressDemo' component={ProgressDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 53,
    width: 360
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default App;