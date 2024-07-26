import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'

const SignInScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Sign In" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 100 }} />
            {/* <Image source={require('./image/iconBack.png')} style={styles.imgEmail} /> */}
            <TextInputComponent placeholder="Password" tipStyle={{ height: 70, paddingLeft: 100 }} />
            {/* <Image source={require('./image/iconBack.png')} style={styles.imgEmail} /> */}
            <Text style={styles.txtForgotPass}>Forgot password?</Text>
            <ButtonComponent title="Sign In" style={{ paddingVertical: 18, marginTop: 60 }} />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{
                    color: '#221F1F',
                    fontSize: 18,
                    fontWeight: '500',
                }}>Don't have an account? </Text>
                <Text style={{
                    color: '#407CE2',
                    fontSize: 18,
                    fontWeight: '500',
                }}>Sign Up</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                <View style={{ borderWidth: 0.5, height: 1, width: '40%' }}></View>
                <Text style={{ marginHorizontal: 4 }}>OR</Text>
                <View style={{ borderWidth: 0.5, height: 1, width: '40%' }}></View>
            </View>

            <TouchableOpacity style={styles.boxOrtherSignIn}>
                <Image source={require('./image/iconGoogle.png')} />
                <Text style={styles.txtOrtherSignIn}>Sign in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxOrtherSignIn}>
                <Image source={require('./image/iconGoogle.png')} />
                <Text style={styles.txtOrtherSignIn}>Sign in with Google</Text>
            </TouchableOpacity>

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
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0
    },
    imgEmail: {
        // position: 'absolute',

    },
    txtForgotPass: {
        color: '#407CE2',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'right',
        paddingHorizontal: 20,
    },
    boxOrtherSignIn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor:'#E5E7EB',
        borderWidth: 2,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginVertical:4
    },
    txtOrtherSignIn: {
        flex: 1,
        textAlign: 'center',
        fontWeight:'bold',
        color:'#221F1F'
    }
})