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
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 60 }}>
                <View
                    style={styles.boxItem}>
                    <BlockComponent
                        onPress={() => navigation.navigate('PhysicalActivities')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Move</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Steps: 3000</Text>
                        <Text style={styles.contentItem}>Distances: 2000 m</Text>
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('WriteThanksScreen')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Gratefuls</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Count: 3</Text>
                        <Text style={styles.contentItem}>Target: 5/day</Text>
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('PhysicalActivities')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Targets</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Sleep Target: complete</Text>
                        <Text style={styles.contentItem}>Move steps target: incomplete</Text>
                        <Text style={styles.contentItem}>Gratefuls target: incomplete</Text>
                        <Text style={styles.contentItem}>Target 4: complete</Text>
                        <Text style={styles.contentItem}>Target 5: complete</Text>
                    </BlockComponent>
                </View>
                <BlockComponent style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Your current health status</Text>
                        <Text style={[styles.dateItem, { color: '#5198FF', fontWeight: '400' }]}>Details</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.contentItem}>Weight: {user.weight}</Text>
                        <Text style={styles.contentItem}>Weight: {user.weight}</Text>
                    </View>
                </BlockComponent>
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
        marginTop: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        color: '#432C81',
        fontWeight: 'bold'
    },
    dateItem: {
        fontSize: 18,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    contentItem: {
        fontSize: 18,
        color: '#432C81',
        textAlign: 'justify'
    }
})