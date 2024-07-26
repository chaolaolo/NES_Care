import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BlockComponent from '../components/Block/BlockComponent'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image style={styles.imgAvatar} source={require('./image/ic_LeftinputUserName.png')} />
                    <TouchableOpacity style={styles.boxicPen}>
                        <Image style={styles.icPen} source={require('./image/ic_pen.png')} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 20 }}>Chao Lao Lo</Text>
                    <Text style={{ color: '#7B6BA8', fontSize: 16 }}>chaolaolo@gmail.com</Text>
                </View>
            </View>

            <BlockComponent>
             <View>
                <Text>Alal</Text>
             </View>
            </BlockComponent>

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
        padding: 4,
        borderWidth: 0.2
    },
    icPen: {
        width: 25, height: 25,
    }

})