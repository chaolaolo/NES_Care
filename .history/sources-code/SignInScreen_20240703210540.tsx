import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'

const SignInScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Sign In" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34,marginTop:16,marginLeft:10 }} />
            </HeaderComponent>
            <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingHorizontal: 20 }} />
            <Image source={require('./image/iconBack.png')} style={styles.imgEmail} />
            <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingHorizontal: 20 }} />
            <Image source={require('./image/iconBack.png')} style={styles.imgEmail} />
            <Text>SignInScreen</Text>
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#E4F9F3',
        position:'absolute',
        top:0
    },
    imgEmail: {
        // position: 'absolute',

    }
})