import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'

const ForgotPassScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Forgot Pasword" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View>
                <Text>Enter your email which was register in app to set new password</Text>
                <View>
                    <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                    <Image source={require('./image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
                </View>
            </View>

            <ButtonComponent title="SEND" style={{ paddingVertical: 18, marginTop: 60 }} />
        </SafeAreaView>
    )
}

export default ForgotPassScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0
    },
    imgEmail: {
        position: 'absolute',
        marginVertical: 24,
        marginLeft: 20,
        width: 30,
        height: 30

    },
})