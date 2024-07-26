import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <View style={{backgroundColor:'gray'}}>
                    <Image style={styles.imgAvatar} source={require('./image/ic_LeftinputUserName.png')} />
                    <Image style={styles.icPen}source={require('./image/ic_pen.png')} />
                </View>
                <View style={{marginHorizontal:10}}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>Chao Lao Lo</Text>
                    <Text style={{fontSize:16}}>chaolaolo@gmail.com</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

    header:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgAvatar:{
        width:100,
        height:100,
        backgroundColor:'red',
    },
    icPen:{
        position:'absolute'
    }

})