import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const Splash = () => {
  return (
    <SafeAreaView>
        <Image source={require("./image/imgSplash.png")}/>
      <Text>Splash</Text>
      <ButtonComponent title="START NOW"/>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({})