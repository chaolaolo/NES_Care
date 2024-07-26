import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/Reducers/userReducer'

const SignInScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSignIn = () => {
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
        if (password.length === 0) {
            setErrPassword('Please enter your password!')
            err = true;
        } else if (password.length < 6) {
            setErrPassword('Please enter more than 6 character!')
            err = true;
        } else {
            setErrPassword('')
        }

        if (!err) {
            setIsLoading(true);
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    const { uid } = userCredential.user;
                    const userDoc = await firestore().collection('Users').doc(uid).get();
                    const userData = userDoc.exists ? userDoc.data() : { fullName: 'null', email: 'null', gender: 'null', height: 'null', weight: 'null', bmi: 'null', avatar: 'null', dateOfBirth: '', role: '' };
                    console.log('User Data:', userData);
                    console.log('User ID:', uid);
                    dispatch(setUser(userData));

                    setIsLoading(false);
                    // Alert.alert('Success', 'User signed in!');
                    navigation.navigate('HomeTab');
                })
                .catch(error => {
                    setIsLoading(false);
                    // if (error.code === 'auth/invalid-credential') {
                    //     Alert.alert('Error', 'The email address or password is invalid. Please check and try again.');
                    // }
                    if (error.code === 'auth/user-not-found') {
                        // Alert.alert('Error', 'No user found for that email.');
                        setErrEmail('Email is not registered on the application')
                    }
                    if (error.code === 'auth/invalid-email') {
                        setErrPassword('Wrong email format!');
                    } if (error.code === 'auth/wrong-password') {
                        setErrPassword('Incorrect password');
                    }
                    Alert.alert('Error', error.message);

                });
        }

    };

    return (
        // <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}  >
                <HeaderComponent title="Sign In" style={styles.headerContainer}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
                </HeaderComponent>
                <ScrollView style={{backgroundColor:'gray'}}>
                    <View style={{ marginBottom: errEmail ? 0 : 19 }}>
                        <TextInputComponent
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                        <Image source={require('../../image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
                    </View>
                    {errEmail ? <Text style={styles.txtError}>{errEmail}</Text> : null}
                    <View style={{ marginBottom: errPassword ? 0 : 19 }}>
                        <TextInputComponent
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isPasswordVisible} />
                        <Image source={require('../../image/ic_LeftinputPass.png')} style={styles.imgEmail} />
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: 30,
                                width: 30,
                                height: 30,
                                marginVertical: 24,
                            }}>
                            <Image source={isPasswordVisible ? require('../../image/ic_showPass.png') : require('../../image/ic_hidePass.png')} style={styles.imgVisiblePass} />
                        </TouchableOpacity>
                    </View>
                    {errPassword ? <Text style={styles.txtError}>{errPassword}</Text> : null}

                    <Text style={styles.txtForgotPass} onPress={() => navigation.navigate('ForgotPassScreen')}>Forgot password?</Text>
                    <ButtonComponent
                        title="Sign In"
                        onPress={handleSignIn}
                        style={{ paddingVertical: 18, marginTop: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
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
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                        <View style={{ borderWidth: 0.5, height: 1, width: '40%' }}></View>
                        <Text style={{ marginHorizontal: 4 }}>OR</Text>
                        <View style={{ borderWidth: 0.5, height: 1, width: '40%' }}></View>
                    </View>

                    <TouchableOpacity style={styles.boxOrtherSignIn}>
                        <Image source={require('../../image/iconGoogle.png')} />
                        <Text style={styles.txtOrtherSignIn}>Sign in with Google</Text>
                    </TouchableOpacity>

                  
                    {/* <View> */}
                    {/* {isLoading ?
                        <View
                            style={{
                                // width: '100%',
                                // height: '100%',
                                flex:1,
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                // backgroundColor: '#21CE9C',
                                position: 'absolute',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',

                            }} >
                            <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>Signing in..</Text>
                        </View>
                        : null} */}
                    {/* </View> */}
                </ScrollView>
                <View
                            style={{
                                // width: '100%',
                                // height: '100%',
                                flex:1,
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                // backgroundColor: '#21CE9C',
                                position: 'absolute',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',

                            }} >
                            <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>Signing in..</Text>
                        </View>

            </KeyboardAvoidingView>
        // </SafeAreaView>
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
        // position: 'absolute',
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
        borderColor: '#E5E7EB',
        borderWidth: 2,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginVertical: 4
    },
    txtOrtherSignIn: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#221F1F'
    },

    txtError: {
        color: 'red',
        marginHorizontal: 20
    }

})