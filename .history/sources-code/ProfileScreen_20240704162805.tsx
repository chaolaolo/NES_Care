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
                    <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 24 }}>Chao Lao Lo</Text>
                    <Text style={{ color: '#7B6BA8', fontSize: 16 }}>chaolaolo@gmail.com</Text>
                </View>
            </View>

            <BlockComponent>
             <View style={{marginLeft:10,marginVertical:2}}>
                <Text>Full name</Text>
                <Text style={styles.mainText}>Chao Lao Lo</Text>
             </View>
             <View style={{marginLeft:10,marginVertical:2}}>
                <Text>Gender</Text>
                <Text style={styles.mainText}>Male</Text>
             </View>
             <View style={{marginLeft:10,marginVertical:2}}>
                <Text>Height</Text>
                <Text style={styles.mainText}>165 cm</Text>
             </View>
             <View style={{marginLeft:10,marginVertical:2}}>
                <Text>Weight</Text>
                <Text style={styles.mainText}>50 kg</Text>
             </View>
             <View style={{marginLeft:10,marginVertical:2}}>
                <Text>BMI</Text>
                <Text style={styles.mainText}>19.10</Text>
             </View>
             <View style={{width:'960%',height:1,borderWidth:0.5,borderColor:'gray',alignSelf:'center'}}></View>
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
    },
    mainText:{color:'black',fontSize:20},
})