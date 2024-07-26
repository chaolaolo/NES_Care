import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'

const EditProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Edit profile ìnormation" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>

            <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 20 }} />

            <ButtonComponent title="SEND" style={{ paddingVertical: 18, marginTop: 60 }} />
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
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

})