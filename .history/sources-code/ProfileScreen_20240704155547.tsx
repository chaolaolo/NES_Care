import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Image style={styles.imgAvatar} source={require('./image/ic_LeftinputUserName.png')} />
                    <Image style={styles.icPen} source={require('./image/ic_pen.png')} />
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chao Lao Lo</Text>
                    <Text style={{ color:'#7B6BA8',fontSize: 16 }}>chaolaolo@gmail.com</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgAvatar: {
        width: 80,
        height: 80,
        backgroundColor: '#EDECF4',
        borderRadius:100,
    },
    icPen: {
        width:30,height:30,
        position: 'absolute',

    }

})