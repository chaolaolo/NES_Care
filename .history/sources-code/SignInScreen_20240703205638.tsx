import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'

const SignInScreen = () => {
  return (
    <SafeAreaView>
        <HeaderComponent title="Sign In" style={styles.headerContainer}>
            <Image source={require('./image/iconBack.png')} style={{width:34,height:34}}/>
        </HeaderComponent>
        <TextInputComponent placeholder="Email" tipStyle={{height:20,paddingHorizontal:20}}/>
      <Text>SignInScreen</Text>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    headerContainer:{
        alignItems:'center',
        backgroundColor:'#E4F9F3'
    }
})