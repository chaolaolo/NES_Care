import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const Splash = () => {
  return (
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'space-evenly'}}>
        <Image source={require("./image/imgSplash.png")}/>
      <Text>Splash</Text>
      <ButtonComponent title="START NOW"/>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({})