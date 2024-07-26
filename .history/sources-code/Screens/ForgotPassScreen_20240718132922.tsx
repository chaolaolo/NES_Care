import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import auth from '@react-native-firebase/auth';

const ForgotPassScreen = () => {
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');

    const handlePasswordReset = () => {
        let err = false;
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email.length === 0) {
            setErrEmail('Please enter your email!')
            err = true;
        } else if (!emailReg.test(email)) {
            setErrEmail('Wrong email format, try again!')
            err = true;
        } else {
            setErrEmail('')
        }

        if (!err) {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    Alert.alert('Success', 'Password reset email sent!')
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        // Alert.alert('Error', 'No user found for that email.');
                        setErrEmail('Email is not registered on the application')
                    }
                    else {
                        Alert.alert('Error', error.message)
                    }
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Forgot Pasword" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View>
                <Text style={{ marginHorizontal: 20, marginVertical: 10, fontSize: 20, color: 'black' }}>
                    Enter your email which was register in app to set new password
                </Text>
                <View style={{ marginBottom: errEmail ? 0 : 19 }}>
                    <TextInputComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                    <Image source={require('./image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
                </View>
                {errEmail ? <Text style={{ color: 'red', marginHorizontal: 20 }}>{errEmail}</Text> : null}
            </View>

            <ButtonComponent
                title="SEND"
                onPress={handlePasswordReset}
                style={{ paddingVertical: 18, marginTop: 60 }} />
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