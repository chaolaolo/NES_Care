import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'

const SignInScreen = () => {
  return (
    <SafeAreaView>
        <HeaderComponent title="Sign In" imgBack='./image/imgSplash.png'/>
      <Text>SignInScreen</Text>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})