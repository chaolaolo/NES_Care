import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Image style={styles.imgAvatar} source={require('./image/ic_LeftinputUserName.png')} />
                    <TouchableOpacity style={styles.boxicPen}>
                        <Image style={styles.icPen} source={require('./image/ic_pen.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chao Lao Lo</Text>
                    <Text style={{ color: '#7B6BA8', fontSize: 16 }}>chaolaolo@gmail.com</Text>
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
        borderRadius: 100,
    },
    boxicPen: {
        // width: 30, height: 30,
        position: 'absolute',
        backgroundColor: 'white',
        right: 0,
        bottom: 0,
        borderRadius: 100,
        padding:4
    },
    icPen: {
        width: 30, height: 30,
        // position: 'absolute',
        // backgroundColor: 'white',
        // right: 0,
        // bottom: 0,
        // borderRadius: 100,

    }

})