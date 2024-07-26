import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import BlockComponent from '../../../components/Block/BlockComponent';

const HomeScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{width:34,height:34}} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 60 }}>
                <View
                    style={styles.boxItem}>
                   <BlockComponent  />
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