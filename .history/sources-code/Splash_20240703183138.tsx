import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <SafeAreaView>
        <Image source={require("./image/imgSplash.png")}/>
      <Text>Splash</Text>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({})