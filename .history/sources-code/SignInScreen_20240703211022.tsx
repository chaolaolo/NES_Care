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
            <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 100 }} />
            {/* <Image source={require('./image/iconBack.png')} style={styles.imgEmail} /> */}
            <TextInputComponent placeholder="Password" tipStyle={{ height: 70, paddingLeft: 100 }} />
            {/* <Image source={require('./image/iconBack.png')} style={styles.imgEmail} /> */}
            <Text style={styles.txtForgotPass}>Forgot password?</Text>
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

    },
    txtForgotPass:{
        color:'#407CE2',
        textAlign:'right',
        paddingHorizontal:20,
        fontSize:18
    }
})