import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { useNavigation } from '@react-navigation/native';

const EatAndDrink = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
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
        // backgroundColor: '#E4F9F3',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        paddingLeft:10
    },
})