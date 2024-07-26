import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer}>
                    <Text>open drawer</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>👋🏻Hi {user.fullName}!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 60 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('WriteThanksScreen')}
                    style={styles.boxItem}>
                    <Text style={styles.titleItem}>Write thanks</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_AddDocs.png')} />
                </TouchableOpacity>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Physical activities</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_Battery.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Time Sleep</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_Sleep.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Eats/Drinks</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_Eat.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>Add Friends</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_AddFriend.png')} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.titleItem}>psychological counseling</Text>
                    <Image style={styles.imgItem} source={require('../HomeIcon/ic_ear.png')} />
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
        width: 50, height: 50
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