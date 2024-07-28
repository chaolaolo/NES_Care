import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Counselor = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Counselor</Text>
        </SafeAreaView>
    )
}

export default Counselor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})