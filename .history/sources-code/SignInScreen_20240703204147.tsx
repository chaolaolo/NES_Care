import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'

const SignInScreen = () => {
  return (
    <SafeAreaView>
        <HeaderComponent title="Sign In" style={styles.headerContainer}>
            <Image source={require('./image/iconBack.png')} style={{width:34,height:34}}/>
        </HeaderComponent>
      <Text>SignInScreen</Text>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    headerContainer:{
        alignItems:'center'
    }
})