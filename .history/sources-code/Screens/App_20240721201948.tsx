import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SplashScreen from './Profile/SplashScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import ChoiceSignScreen from './Profile/ChoiceSignScreen';
import SignInScreen from './Profile/SignInScreen';
import SignUpScreen from './Profile/SignUpScreen';
import ForgotPassScreen from './Profile/ForgotPassScreen';
import WriteThanksScreen from './WriteThanksScreen';
import EditProfileScreen from './Profile/EditProfileScreen';
import CalculateBMIScreen from './Profile/CalculateBMIScreen';
import { useSelector } from 'react-redux';

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


const MainStack = () => {
  return (
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
  )
}


function CustomDrawerContent(props: any) {
  const user = useSelector(state => state.user.user);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.boxHeader}>
        <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../image/ic_LeftinputUserName.png')} />
        <Text style={styles.txtName}>Welcome! {user.fullName}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      // initialRouteName='ProfileScreen'
      drawerContent={CustomDrawerContent}
      screenOptions={{ 
        headerStyle: {
          backgroundColor: 'gray'
        },
        headerShown: false,
        headerTintColor: 'lightblue',
        drawerLabelStyle: {
          color: '#432C81',
          fontSize: 14,
          // marginLeft: -10
        }
      }}
    >
      <Drawer.Screen
        name='HomeStack'
        component={MainStack}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          headerShadowVisible: false,
          drawerIcon: () => {
            <Image source={require('../BottomTabIcon/ic_home.png')} style={styles.icon} />
          }
        }}
      />
      <Drawer.Screen
        name='WriteThanksScreen'
        component={WriteThanksScreen}
        options={{
          drawerLabel: 'WriteThanksScreen',
          title: 'WriteThanksScreen',
          headerShadowVisible: false,
          drawerIcon: () => {
            <Image source={require('../BottomTabIcon/ic_home.png')} style={styles.icon} />
          }
        }}
      />
      <Drawer.Screen
        name='Notifications'
        component={WriteThanksScreen}
        options={{
          drawerLabel: 'Notifications',
          title: 'Notifications',
          headerShadowVisible: false,
          drawerIcon: () => {
            <Image source={require('../BottomTabIcon/ic_home.png')} style={styles.icon} />
          }
        }}
      />
      <Drawer.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          drawerLabel: 'ProfileScreen',
          title: 'ProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => {
            <Image source={require('../BottomTabIcon/ic_home.png')} style={styles.icon} />
          }
        }}
      />
      {/* <Drawer.Screen name='ProfileScreen' component={ProfileScreen} />
      <Drawer.Screen name='CalculateBMIScreen' component={CalculateBMIScreen} /> */}
    </Drawer.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  boxHeader: {
    height: '20%'
  },
  avatar: {
    backgroundColor: '#EDECF4',
    borderRadius: 100,
    width: 50, height: 50
  },
  txtName: {

  }
})