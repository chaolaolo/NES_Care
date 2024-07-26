import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import ButtonComponent from '../components/Button/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';

const SignUpScreen = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Sign Up" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View>
                <TextInputComponent placeholder="Username" tipStyle={{ height: 70, paddingLeft: 60 }} />
                <Image source={require('./image/ic_LeftinputUserName.png')} style={styles.imgEmail} />
            </View>
            <View>
                <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                <Image source={require('./image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
            </View>
            <View>
                <TextInputComponent placeholder="Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isPasswordVisible} />
                <Image source={require('./image/ic_LeftinputPass.png')} style={styles.imgEmail} />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={{
                        position: 'absolute',
                        right: 30,
                        width: 30,
                        height: 30,
                        marginVertical: 24,
                    }}>
                    <Image source={isPasswordVisible ? require('./image/ic_showPass.png') : require('./image/ic_hidePass.png')} style={styles.imgVisiblePass} />
                </TouchableOpacity>
            </View>
            <View>
                <TextInputComponent placeholder="Re-Enter Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isPasswordVisible} />
                <Image source={require('./image/ic_LeftinputPass.png')} style={styles.imgEmail} />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={{
                        position: 'absolute',
                        right: 30,
                        width: 30,
                        height: 30,
                        marginVertical: 24,
                    }}>
                    <Image source={isPasswordVisible ? require('./image/ic_showPass.png') : require('./image/ic_hidePass.png')} style={styles.imgVisiblePass} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <CheckBox />
                <Text>
                    I agree to the healthcare Terms of Service and Privacy Policy
                </Text>
            </View>
            <ButtonComponent title="Sign Up" style={{ paddingVertical: 18, marginTop: 60 }} />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{
                    color: '#221F1F',
                    fontSize: 18,
                    fontWeight: '500',
                }}>If you have an account? </Text>
                <Text style={{
                    color: '#407CE2',
                    fontSize: 18,
                    fontWeight: '500',
                }}>Sign In</Text>
            </View>

        </SafeAreaView>
    )
}

export default SignUpScreen

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
        position: 'absolute',
        marginVertical: 24,
        marginLeft: 20,
        width: 30,
        height: 30

    },
    imgVisiblePass: {
        width: 30,
        height: 30,
    },


})