/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, FlatList } from "react-native";
import Tountues from './demos/Pages'
// import Login from './android/app/Views/Login'

let tonetues = Reflect.ownKeys(Tountues).map((k) => {
  const name = (k as String).replace('Screen', '');
  const Comp = tonetues[k];
  return {
    name,
    title: name,
    component: (props: any) => <Comp {...props} />
  }
})

tonetues.unshift({
  name: 'Home',
  title: 'Home',
  component: (props: any) => <HomeScreen {...props} />
})

const listData = tonetues.map((item, index) => {
  const key = index + 1;
  return {
    id: key,
    title: item?.title,
    page: item?.name,
  }
})
const HomeScreen = ({ navigation }: any) => {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={listData}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.btnContainer} onPress={() => { navigation.navigate(item?.page) }}>
            <Text style={{ fontSize: 12, color: '#fff' }}>{item?.title}</Text>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const Stack = createStackNavigator();
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false // 不展示标题栏
          })}>
          {tonetues.map(({ name, title, component }) => {
            return (
              <Stack.Screen key={name} name={name} options={{ title }}>
                {(props) => component(props)}
              </Stack.Screen>
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 53,
    width: 360
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    display: 'flex',
    marginTop: 50,
    alignItems: 'center',
  },
  btnContainer: {
    width: 100,
    paddingVertical: 5,
    backgroundColor: '#FF8E4A',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
})
export default App;