import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👋🏻Hi UserName</Text>
                <Image style={styles.avatar} source={require('./image/ic_LeftinputUserName.png')} />
            </View>
            <Text>HomeScreen</Text>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding:20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar:{
        backgroundColor:'#EDECF4',
        borderRadius:100,
    },
    headerTitle:{
        fontSize:20
    }
})