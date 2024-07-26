import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalComponent from '../../../components/Modal/ModalComponent';
import { RadioButton } from 'react-native-paper';

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [fullName, setFullName] = useState('');
    const [errFullName, setErrFullName] = useState('');
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState('');
    const [role, setRole] = useState('');
    const [errRole, setErrRole] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [roleChecked, setRoleChecked] = React.useState('User');
    const handleSaveRole = () => {
        setRole(roleChecked);
        setShowRoleModal(false);
    }
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleRePasswordVisibility = () => {
        setIsRePasswordVisible(!isRePasswordVisible);
    };


    const handleSignUp = () => {
        let err = false;
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (fullName.length === 0) {
            setErrFullName('Please enter full name!')
            err = true;
        } else {
            setErrFullName('')
        }
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

        if (rePassword.length === 0) {
            setErrRePassword('Please confirm password!')
            err = true;
        } else if (password !== rePassword) {
            setErrRePassword('Passwords do not match')
            err = true;
        } else {
            setErrRePassword('')
        }
        if (role !== 'User' && role !== 'Expert') {
            setErrRole('Please choose your Role in app!')
            err = true;
        } else {
            setErrRole('')
        }


        if (!err) {
            setIsLoading(true);
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
                            uid: user.uid,
                            role: role
                        })
                        .then(() => {
                            // setIsLoading(false);
                            setIsLoading(true);
                            // Alert.alert('Success', 'User account created & signed in!');
                            // navigation.navigate('SignInScreen');
                        })
                        .catch(error => {
                            setIsLoading(false);
                            Alert.alert('Error', 'Failed to save user data to Firestore');
                        });

                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Error', 'That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Error', 'That email address is invalid!');
                    }

                    Alert.alert('Error', error.message);
                });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderComponent title="Sign Up" style={styles.headerContainer}>
                <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10, }} />
            </HeaderComponent>
            <ScrollView style={styles.container}>
                {/* <SafeAreaView style={styles.container}> */}

                <View style={{ marginBottom: errFullName ? 0 : 19 }}>
                    <TextInputComponent
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Full name" tipStyle={{ height: 70, paddingLeft: 60 }} />
                    <Image source={require('../../image/ic_LeftinputUserName.png')} style={styles.imgEmail} />
                </View>
                {errFullName ? <Text style={styles.txtError}>{errFullName}</Text> : null}
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
                <View style={{ marginBottom: errRePassword ? 0 : 19 }}>
                    <TextInputComponent
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder="Re-Enter Password" tipStyle={{ height: 70, paddingLeft: 60 }} secureTextEntry={!isRePasswordVisible} />
                    <Image source={require('../../image/ic_LeftinputPass.png')} style={styles.imgEmail} />
                    <TouchableOpacity
                        onPress={toggleRePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: 30,
                            width: 30,
                            height: 30,
                            marginVertical: 24,
                        }}>
                        <Image source={isRePasswordVisible ? require('../../image/ic_showPass.png') : require('../../image/ic_hidePass.png')} style={styles.imgVisiblePass} />
                    </TouchableOpacity>
                </View>
                {errRePassword ? <Text style={styles.txtError}>{errRePassword}</Text> : null}
                <Pressable
                    onPress={() => setShowRoleModal(true)}
                    style={{ marginBottom: errRole ? 0 : 19 }}>
                    <Text style={{
                        height: 70,
                        paddingLeft: 60, padding: 10,
                        borderWidth: 1,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        backgroundColor: '#F9FAFB',
                        borderRadius: 6,
                        borderColor: 'rgba(34, 31, 31, 0.1)',
                        fontSize: 14,
                        textAlignVertical: 'center',
                        color: 'black'
                    }} >{role ? role : "Choose your role"}</Text>
                    <Image source={require('../../image/ic_role.png')} style={styles.imgEmail} />
                    <TouchableOpacity
                        onPress={() => setShowRoleModal(true)}
                        style={{
                            position: 'absolute',
                            right: 30,
                            width: 30,
                            height: 30,
                            marginVertical: 24,
                        }}>
                        <Image source={require('../../image/ic_arrow_left.png')} style={[styles.imgVisiblePass, { transform: [{ rotate: '-90deg' }] }]} />
                    </TouchableOpacity>
                </Pressable>
                {errRole ? <Text style={styles.txtError}>{errRole}</Text> : null}
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

                {/* *** */}
                <View>
                    {isLoading ? (
                        <View style={{ flex: 1, backgroundColor: 'red', position: 'absolute' }} >
                            <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, backgroundColor: 'red', position: 'absolute' }} />
                        </View>
                    ) : null}
                </View>
                {/* *** */}
                {/* *** */}
                <ModalComponent
                    visible={showRoleModal}
                    transparent={true}
                    animationType='fade'
                    onRequestClose={() => setShowRoleModal(false)}
                    modalTitle="Choose Role"
                    onClose={() => setShowRoleModal(false)}
                    btnSavePress={handleSaveRole}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="User"
                                status={roleChecked === 'User' ? 'checked' : 'unchecked'}
                                onPress={() => setRoleChecked('User')}
                            />
                            <Text>User</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Expert"
                                status={roleChecked === 'Expert' ? 'checked' : 'unchecked'}
                                onPress={() => setRoleChecked('Expert')}
                            />
                            <Text>Expert</Text>
                        </View>
                    </View>
                </ModalComponent>
                {/* *** */}
                {/* </SafeAreaView> */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignContent: 'center',
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
        height: 30,
    },
    imgVisiblePass: {
        width: 30,
        height: 30,
    },
    txtError: {
        color: 'red',
        marginHorizontal: 20
    }

})