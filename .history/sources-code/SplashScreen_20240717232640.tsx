import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import SignInScreen from './SignInScreen'
import auth from '@react-native-firebase/auth';

const SplashScreen = () => {
const navigation = useNavigation();

auth()
.createUserWithEmailAndPassword('doe@example.com', 'Password123!')
.then(() => {
  console.log('User account created & signed in!');
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    console.log('That email address is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    console.log('That email address is invalid!');
  }

  console.error(error);
});
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("./image/imgSplash.png")} style={styles.imgSplash} />
            <Text style={styles.txtSplash}>Welcome to NES Care Let's get start with us to take care yourself and energy to balence
            </Text>
            <ButtonComponent 
            title="START NOW"
            onPress={()=>navigation.navigate('ChoiceSignScreen')}
            style={{width:'80%',paddingVertical:20}}/>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor:'white'
    },
    txtSplash: {
        width: '74%',
        fontSize: 24,
        textAlign: 'center',
        color: 'black'
    },
    imgSplash: {
        width: '80%',
        height: 350,
    }
})