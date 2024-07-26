import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'

const ChoiceSignScreen = () => {
    return (
        <SafeAreaView>
            <Text>Welcome to</Text>
            <Text>NES Care</Text>
            <Image source={require("./image/imgSplash2.png")} />
            <ButtonComponent title="Sign Up" />
            <ButtonComponent title="Sign In" />
        </SafeAreaView>
    )
}

export default ChoiceSignScreen

const styles = StyleSheet.create({})