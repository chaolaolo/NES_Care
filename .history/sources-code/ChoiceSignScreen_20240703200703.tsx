import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const ChoiceSignScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                width:'100%',
                textAlign:'center',
                color:'black',
                fontFamily:'san-serif',
                fontSize:40
                }}>Welcome to</Text>
            <Text style={{
                width:'100%',
                textAlign:'center',
                color:'black',
                fontVariant:'small-caps',
                fontFamily:'serif',
                fontSize:40
                }}>NES Care</Text>
            <Image style={styles.imgSplash} source={require("./image/imgSplash2.png")} />
            <ButtonComponent title="Sign Up" />
            <ButtonComponent title="Sign In" />
        </SafeAreaView>
    )
}

export default ChoiceSignScreen

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-evenly',
        paddingVertical:100
    },
    imgSplash:{
        width:'60%',
        height:450,
        alignSelf:'center',
    }
})