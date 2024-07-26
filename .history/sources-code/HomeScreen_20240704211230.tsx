import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text>👋🏻Hi UserName</Text>
            <Image source={require('./image/ic_LeftinputUserName.png')}/>
        </View>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
header:{
    flexDirection:'row',
    
}
})