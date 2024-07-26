import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👋🏻Hi UserName!</Text>
                <Image style={styles.avatar} source={require('./image/ic_LeftinputUserName.png')} />
            </View>
            <ScrollView>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_AddDocs.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_Battery.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_Sleep.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_AddDocs.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_AddDocs.png')} />
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold'
    },
    boxItem: {
        backgroundColor: '#EDECF4',
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        borderRadius: 10,
        alignItems:'center',
        justifyContent: 'space-between'
    },
    titleItem: {
        fontSize: 22,
        color:'#432C81',
        fontWeight:'bold'
    },
    imgItem:{

    }
})