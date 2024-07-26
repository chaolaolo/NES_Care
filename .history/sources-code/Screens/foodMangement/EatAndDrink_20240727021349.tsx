import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'

const EatAndDrink = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
                    <Text></Text>
                </TouchableOpacity>
            </HeaderComponent>
        </SafeAreaView>
    )
}

export default EatAndDrink

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2
    },
})