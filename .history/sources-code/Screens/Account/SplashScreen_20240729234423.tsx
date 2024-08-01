import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import SignInScreen from '../Account/SignInScreen'
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
    // const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('ChoiceSignScreen');
        }, 5000);
        return () => {
            clearTimeout(timer);
        }
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image source={require("../../image/imgSplash.png")} style={styles.imgSplash} />
            <Text style={styles.txtSplash}>Welcome to NES Care Let's get start with us to take care yourself and energy to balence
            </Text>
            <ButtonComponent
                title="START NOW"
                onPress={() => navigation.navigate('ChoiceSignScreen')}
                style={{ width: '80%', paddingVertical: 20 }} /> */}

            <LottieView source={require('../../LottieAnimation/Splash1.json')}
                autoPlay
                loop />

        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white'
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