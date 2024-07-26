import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👋🏻Hi UserName!</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
                    <Image style={styles.avatar} source={require('./image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{flex:1}}>
                <TouchableOpacity
                onPress={()=>navigation.navigate('WriteThanksScreen')}
                style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_AddDocs.png')} />
                </TouchableOpacity>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Physical activities</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_Battery.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Time Sleep</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_Sleep.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Eats/Drinks</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_Eat.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Add Friends</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_AddFriend.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>psychological counseling</Text>
                    <Image style={styles.imgItem} source={require('./HomeIcon/ic_ear.png')} />
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleItem: {
        fontSize: 22,
        color: '#432C81',
        fontWeight: 'bold'
    },
    imgItem: {

    }
})