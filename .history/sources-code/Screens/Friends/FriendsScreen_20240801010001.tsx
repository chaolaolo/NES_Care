import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AllFriends from './AllFriends';
import FriendRequest from './FriendRequest';

const FriendsScreen = () => {
    const navigation = useNavigation();
    const [selectedActivity, setSelectedActivity] = useState('AllFriends');

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bạn Bè</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Pressable
                    onPress={() => handleActivityChange('Move')}
                    style={{
                        flex: 1,
                        // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
                        paddingVertical: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#21CE9C',
                        backgroundColor: selectedActivity === 'Move' ? 'rgba(0,0,0,0.05)' : 'white',
                        borderBottomWidth: selectedActivity === 'Move' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: selectedActivity === 'Move' ? '#21CE9C' : '#432C81',
                        fontWeight: selectedActivity === 'Move' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Đi bộ - Chạy bộ</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleActivityChange('Yoga')}
                    style={{
                        flex: 1,
                        // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
                        paddingVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#21CE9C',
                        backgroundColor: selectedActivity === 'Yoga' ? 'rgba(0,0,0,0.05)' : 'white',
                        borderBottomWidth: selectedActivity === 'Yoga' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: selectedActivity === 'Yoga' ? '#21CE9C' : '#432C81',
                        fontWeight: selectedActivity === 'Yoga' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Thiền - Yoga</Text>
                </Pressable>
            </View>

            {selectedActivity === 'Move' && <AllFriends />}
            {selectedActivity === 'Yoga' && <FriendRequest />}
        </SafeAreaView>
    )
}

export default FriendsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -20
    },
})


