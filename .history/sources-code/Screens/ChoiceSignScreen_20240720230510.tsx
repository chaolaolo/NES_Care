import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '.../components/Button/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import SignInScreen from './SignInScreen'

const ChoiceSignScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                width: '100%',
                textAlign: 'center',
                color: 'black',
                fontFamily: 'fantasy',
                fontSize: 20,
            }}>Welcome to</Text>
            <Text style={{
                width: '100%',
                textAlign: 'center',
                color: 'black',
                fontFamily: 'serif',
                fontWeight: 'bold',
                fontSize: 40
            }}>NES Care</Text>
            <Image style={styles.imgSplash} source={require("../image/imgSplash2.png")} />
            <ButtonComponent
             title="Sign In" 
             onPress={()=>navigation.navigate('SignInScreen')}
             style={{width:'80%',paddingVertical:16}}/>
            <ButtonComponent 
            title="Sign Up"
             onPress={()=>navigation.navigate('SignUpScreen')}
             style={{width:'80%',paddingVertical:16, borderWidth: 2, borderColor: '#21CE9C', backgroundColor: 'white', }} btnTitleStyle={{ color: '#21CE9C' }} />
        </SafeAreaView>
    )
}

export default ChoiceSignScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        paddingVertical: 100,
        alignItems:'center',
        backgroundColor:'white'

    },
    imgSplash: {
        width: '60%',
        height: 450,
        marginVertical: 20,
    }
})