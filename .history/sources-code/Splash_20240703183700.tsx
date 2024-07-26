import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("./image/imgSplash.png")} style={styles.imgSplash} />
            <Text>Splash</Text>
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
    }
    ,
    imgSplash: {
        // resizeMode: 'center',
        width:'80%',
        height:400,
        backgroundColor: 'red'
    }
})