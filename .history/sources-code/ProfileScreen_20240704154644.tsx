import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaView>
            <View>
            <View>
                <Image source={require('./image/ic_LeftinputUserName.png')}/>
                <Image source={require('./image/ic_pen.png')}/>
            </View>
            <View>
                <Text>Chao Lao Lo</Text>
                <Text>chaolaolo@gmail.com</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})