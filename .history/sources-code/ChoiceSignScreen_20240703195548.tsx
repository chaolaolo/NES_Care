import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const ChoiceSignScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{width:'100%',textAlign:'center',color:'black'}}>Welcome to</Text>
            <Text >NES Care</Text>
            <Image style={styles.imgSplash} source={require("./image/imgSplash2.png")} />
            <ButtonComponent title="Sign Up" />
            <ButtonComponent title="Sign In" />
        </SafeAreaView>
    )
}

export default ChoiceSignScreen

const styles = StyleSheet.create({
    container:{
        // alignItems:'center',
        justifyContent:'space-evenly',
        paddingVertical:100
    },
    imgSplash:{
        width:'80%',
        height:600,
        alignSelf:'center',
        backgroundColor:'red'
    }
})