import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import SignInScreen from '../Account/SignInScreen'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                navigation.navigate('HomeTab');
            } else {
                navigation.navigate('SignInScreen');
            }
        };

        checkLogin();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../../image/imgSplash.png")} style={styles.imgSplash} />
            <Text style={styles.txtSplash}>Welcome to NES Care Let's get start with us to take care yourself and energy to balence
            </Text>
            <ButtonComponent
                title="START NOW"
                onPress={() => navigation.navigate('ChoiceSignScreen')}
                style={{ width: '80%', paddingVertical: 20 }} />
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