import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import ChoiceSignScreen from './ChoiceSignScreen';
import SignUpScreen from './SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('./BottomTabIcon/ic_home.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='Statistics'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('./BottomTabIcon/ic_statistics.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('./BottomTabIcon/ic_notification.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='Settings'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('./BottomTabIcon/ic_setting.png')} style={styles.icon} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Statistics' component={HomeScreen}/>
        <Stack.Screen name='Notifications' component={HomeScreen}/>
        <Stack.Screen name='Settings' component={ProfileScreen}/>
        <Stack.Screen name='ChoiceSignScreen' component={ChoiceSignScreen}/>
        <Stack.Screen name='SignInScreen' component={SignInScreen}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})