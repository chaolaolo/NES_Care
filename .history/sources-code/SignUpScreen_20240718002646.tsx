import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import ButtonComponent from '../components/Button/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleRePasswordVisibility = () => {
        setIsRePasswordVisible(!isRePasswordVisible);
    };


    const handleSignUp = () => {
        if (password !== rePassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                firestore()
                    .collection('Users')
                    .doc(user.uid)
                    .set({
                        fullName: fullName,
                        email: email,
                        uid: user.uid
                    })
                    .then(() => {
                        Alert.alert('Success', 'User account created & signed in!');
                        navigation.navigate('SignInScreen');
                    })
                    .catch(error => {
                        Alert.alert('Error', 'Failed to save user data to Firestore');
                    });

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'That email address is invalid!');
                }

                Alert.alert('Error', error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Sign Up" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View>
                <TextInputComponent
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Full name" tipStyle={{ height: 70, paddingLeft: 60 }} />
                <Image source={require('./image/ic_LeftinputUserName.png')} style={styles.imgEmail} />
            </View>
            <View>
                <TextInputComponent
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                <Image source={require('./image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
            </View>
            <View>
                <TextInputComponent
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isPasswordVisible} />
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
                <TextInputComponent
                    value={rePassword}
                    onChangeText={setRePassword}
                    placeholder="Re-Enter Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isRePasswordVisible} />
                <Image source={require('./image/ic_LeftinputPass.png')} style={styles.imgEmail} />
                <TouchableOpacity
                    onPress={toggleRePasswordVisibility}
                    style={{
                        position: 'absolute',
                        right: 30,
                        width: 30,
                        height: 30,
                        marginVertical: 24,
                    }}>
                    <Image source={isRePasswordVisible ? require('./image/ic_showPass.png') : require('./image/ic_hidePass.png')} style={styles.imgVisiblePass} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, }}>
                <CheckBox value={isChecked} onValueChange={setIsChecked} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 20, }} >
                        I agree to the healthcare
                    </Text>
                    <Text style={{ fontSize: 20, color: '#407CE2' }} > Terms of Service </Text>
                    <Text style={{ fontSize: 20, }} >and</Text>
                    <Text style={{ fontSize: 20, color: '#407CE2' }} > Privacy Policy</Text>
                </View>
            </View>
            <ButtonComponent
                title="Sign Up"
                onPress={handleSignUp}
                style={{ paddingVertical: 18, marginTop: 60 }} />
            <Pressable
                onPress={() => navigation.navigate('SignInScreen')}
                style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
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
            </Pressable>

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