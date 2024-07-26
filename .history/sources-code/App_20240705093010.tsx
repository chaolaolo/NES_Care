import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs =()=>{
  return(
    <Tab.Navigator>
      <Tab.Screen 
      name='Home'
      component={HomeScreen}
      options={{
        tabBarIcon:()=>(
          <Image source={require('./BottomTabIcon/ic_home')}/>
        )
      }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Text>App</Text>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})