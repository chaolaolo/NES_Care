import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SplashScreen from './Account/SplashScreen';
import HomeScreen from './Home/HomeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import ChoiceSignScreen from './Account/ChoiceSignScreen';
import SignInScreen from './Account/SignInScreen';
import SignUpScreen from './Account/SignUpScreen';
import ForgotPassScreen from './Account/ForgotPassScreen';
import WriteThanksScreen from './Home/WriteThanksScreen';
import EditProfileScreen from './Profile/EditProfileScreen';
import CalculateBMIScreen from './Profile/CalculateBMIScreen';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/auth';
import PhysicalActivities from './PhysicalActivities/PhysicalActivities';
import Music from './PhysicalActivities/Music';
import Video from './PhysicalActivities/Video';
import Meditation_Yoga from './PhysicalActivities/Meditation_Yoga';

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
    <Stack.Navigator initialRouteName='SignInScreen' screenOptions={{ headerShown: false }}>
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
      <Stack.Screen name='PhysicalActivities' component={PhysicalActivities} />
      <Stack.Screen name='Meditation_Yoga' component={Meditation_Yoga} />
      <Stack.Screen name='Music' component={Music} />
      <Stack.Screen name='Video' component={Video} />
    </Stack.Navigator>
  )
}


function CustomDrawerContent(props: any) {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation();

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await firebase.auth().signOut();
              navigation.navigate('SignInScreen');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }
        }
      ]
    );
  };


  return (
    <DrawerContentScrollView {...props}>
      <Pressable onPress={() => navigation.navigate('ProfileScreen')} style={styles.boxHeader}>
        <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../image/ic_LeftinputUserName.png')} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.txtName}>Welcome! </Text>
          <Text style={[styles.txtName, { fontWeight: 'bold', }]}>{user.fullName}</Text>
        </View>
        <Text style={[styles.txtName, { fontSize: 16 }]}>({user.role})</Text>
      </Pressable>
      <DrawerItemList {...props} />
      <TouchableOpacity
        onPress={handleSignOut}
        style={{ flexDirection: 'row', borderWidth: 2, borderColor: '#FD7278', borderRadius: 10, paddingVertical: 16, alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 40, marginVertical: 40 }}>
        <Text style={{ color: '#432C81', fontSize: 18, }}>Sign Out</Text>
        <Image style={{ width: 30, height: 30 }} source={require('../image/ic_sign_out.png')} />
      </TouchableOpacity>
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
        drawerActiveTintColor: '#21CE9C',
        drawerLabelStyle: {
          color: '#432C81',
          fontSize: 14,
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
          drawerIcon: (props) => (
            <Image source={require('../BottomTabIcon/ic_home.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          )
        }}
      />
      <Drawer.Screen
        name='EditProfileScreen'
        component={EditProfileScreen}
        options={{
          drawerLabel: 'Edit Profile Information',
          title: 'EditProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../ProfileScreenIcon/ic_Calculator.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          )
        }}
      />
      <Drawer.Screen
        name='CalculateBMIScreen'
        component={CalculateBMIScreen}
        options={{
          drawerLabel: 'Calculate your BMI',
          title: 'CalculateBMIScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../ProfileScreenIcon/ic_Doc.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          )
        }}
      />
      <Drawer.Screen
        name='Physical activities'
        component={PhysicalActivities}
        options={{
          drawerLabel: 'Physical activities',
          title: 'PhysicalActivities',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../HomeIcon/ic_Battery.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          ),
        }}
      />
      <Drawer.Screen
        name='Time sleep'
        component={SplashScreen}
        options={{
          drawerLabel: 'Time sleep',
          title: 'ProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../BottomTabIcon/ic_profile.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          ),
        }}
      />
      <Drawer.Screen
        name='Eats/Drinks'
        component={ForgotPassScreen}
        options={{
          drawerLabel: 'Eats/Drinks',
          title: 'ProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../BottomTabIcon/ic_profile.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          ),
        }}
      />
      <Drawer.Screen
        name='Friends'
        component={SignUpScreen}
        options={{
          drawerLabel: 'Friends',
          title: 'ProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../BottomTabIcon/ic_profile.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          ),
        }}
      />
      <Drawer.Screen
        name='Psychological counseling'
        component={SignInScreen}
        options={{
          drawerLabel: 'Psychological counseling',
          title: 'ProfileScreen',
          headerShadowVisible: false,
          drawerIcon: () => (
            <Image source={require('../BottomTabIcon/ic_profile.png')} style={{ width: 30, height: 30, marginRight: -10 }} />
          ),
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
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    marginHorizontal: 10
  },
  avatar: {
    backgroundColor: '#EDECF4',
    borderRadius: 100,
    width: 100, height: 100,
    marginBottom: 10
  },
  txtName: {
    color: '#432C81',
    fontSize: 18
  }
})