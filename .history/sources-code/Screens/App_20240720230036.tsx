import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './Account/ProfileScreen';
import HomeScreen from './HomeScreen';
import SplashScreen from './Account/SplashScreen';
import SignInScreen from './Account/SignInScreen';
import ChoiceSignScreen from './ChoiceSignScreen';
import SignUpScreen from './Account/SignUpScreen';
import ForgotPassScreen from './Account/ForgotPassScreen';
import WriteThanksScreen from './WriteThanksScreen';
import EditProfileScreen from './Account/EditProfileScreen';
import CalculateBMIScreen from './Account/CalculateBMIScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#21CE9C',
          position: 'absolute',
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0
        },
        tabBarItemStyle: {
          padding: '1%',
          margin: '2%',
          borderRadius: 10,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#EDECF4',
      }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../BottomTabIcon/ic_home.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='Thanks Docs'
        component={WriteThanksScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../BottomTabIcon/ic_docs.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../BottomTabIcon/ic_notification.png')} style={styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require('../BottomTabIcon/ic_profile.png')} style={styles.icon} />
          )
        }}
      />
    </Tab.Navigator>
  )
}


function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.boxHeader}>
        {/* <Image source={require('./image/avatar.jpg')} style={styles.imgHeader} /> */}
        <Text style={styles.txtName}>Welcome! Chao Lao Lo</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='ProfileScreen' drawerContent={CustomDrawerContent}>
      <Drawer.Screen name='HomeTab' component={BottomTabs} />
      <Drawer.Screen name='ProfileScreen' component={ProfileScreen} />
      <Drawer.Screen name='CalculateBMIScreen' component={CalculateBMIScreen} />
    </Drawer.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='HomeTab' component={BottomTabs} />
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Notifications' component={HomeScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='ChoiceSignScreen' component={ChoiceSignScreen} />
        <Stack.Screen name='SignInScreen' component={SignInScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name='ForgotPassScreen' component={ForgotPassScreen} />
        <Stack.Screen name='WriteThanksScreen' component={WriteThanksScreen} />
        <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
        <Stack.Screen name='CalculateBMIScreen' component={CalculateBMIScreen} />
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