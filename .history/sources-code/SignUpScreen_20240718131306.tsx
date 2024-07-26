import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent';
import TextInputComponent from '../components/TextInput/TextInputComponent';
import ButtonComponent from '../components/Button/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ModalComponent from '../components/Modal/ModalComponent';
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
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <SafeAreaView style={styles.container}>
                <HeaderComponent title="Sign Up" style={styles.headerContainer}>
                    <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10, }} />
                </HeaderComponent>
                <View style={{ marginBottom: errFullName ? 0 : 19 }}>
                    <TextInputComponent
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Full name" tipStyle={{ height: 70, paddingLeft: 60 }} />
                    <Image source={require('./image/ic_LeftinputUserName.png')} style={styles.imgEmail} />
                </View>
                {errFullName ? <Text style={styles.txtError}>{errFullName}</Text> : null}
                <View style={{ marginBottom: errEmail ? 0 : 19 }}>
                    <TextInputComponent
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
                    <Image source={require('./image/ic_LeftinputEmail.png')} style={styles.imgEmail} />
                </View>
                {errEmail ? <Text style={styles.txtError}>{errEmail}</Text> : null}
                <View style={{ marginBottom: errPassword ? 0 : 19 }}>
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
                {errPassword ? <Text style={styles.txtError}>{errPassword}</Text> : null}
                <View style={{ marginBottom: errRePassword ? 0 : 19 }}>
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
                    <Image source={require('./image/ic_role.png')} style={styles.imgEmail} />
                    <TouchableOpacity
                        onPress={() => setShowRoleModal(true)}
                        style={{
                            position: 'absolute',
                            right: 30,
                            width: 30,
                            height: 30,
                            marginVertical: 24,
                        }}>
                        <Image source={require('./image/ic_arrow_left.png')} style={[styles.imgVisiblePass, { transform: [{ rotate: '-90deg' }] }]} />
                    </TouchableOpacity>
                </Pressable>
                {errRole ? <Text style={styles.txtError}>{errRole}</Text> : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            disabled={false}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>I agree to the terms and conditions</Text>
                    </View>
                </View>
                <ButtonComponent text='Sign Up' onPress={handleSignUp} tipStyle={{ marginTop: 45 }} />
                <View style={styles.txtSignUpContainer}>
                    <Text style={styles.txtHaveAccount}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                        <Text style={styles.txtSignUp}> Sign In</Text>
                    </TouchableOpacity>
                </View>
                <ModalComponent isVisible={showRoleModal} onClose={() => setShowRoleModal(false)} styleContainer={{ justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: '700', color: 'black', fontSize: 18, textAlign: 'center' }}>Choose Your Role</Text>
                        <RadioButton.Group onValueChange={newValue => setRoleChecked(newValue)} value={roleChecked}>
                            <RadioButton.Item label="User" value="User" />
                            <RadioButton.Item label="Expert" value="Expert" />
                        </RadioButton.Group>
                        <ButtonComponent text='Save' onPress={handleSaveRole} tipStyle={{ marginTop: 10 }} />
                    </View>
                </ModalComponent>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        marginBottom: 50,
    },
    imgEmail: {
        position: 'absolute',
        width: 24,
        height: 24,
        left: 35,
        bottom: 25,
    },
    imgVisiblePass: {
        width: 24,
        height: 24,
        alignSelf: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    checkbox: {
        alignSelf: 'center',
        marginLeft: 14,
    },
    label: {
        margin: 8,
        color: 'black',
    },
    txtError: {
        color: 'red',
        marginLeft: 50,
    },
    txtSignUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    txtHaveAccount: {
        fontSize: 15,
        fontWeight: '500',
    },
    txtSignUp: {
        color: '#1D6DB0',
        fontSize: 15,
        fontWeight: '700',
    },
});
