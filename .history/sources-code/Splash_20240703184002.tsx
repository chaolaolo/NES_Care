import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("./image/imgSplash.png")} style={styles.imgSplash} />
            <Text style={styles.txtSplash}>Welcome to NES Care Let's get start with us to take care yourself and energy to balence
            </Text>
            <ButtonComponent title="START NOW" />
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    txtSplash: {
        width: '74%',
        fontSize: 24,
        textAlign: 'center',
        color: 'black'
    },
    imgSplash: {
        width: '80%',
        height: 350,
    }
})