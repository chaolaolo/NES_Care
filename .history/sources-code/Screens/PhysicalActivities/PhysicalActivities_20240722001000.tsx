import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Move from './Move';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Meditation_Yoga from './Meditation_Yoga';

const PhysicalActivities = () => {
    const navigation = useNavigation();
    const [selectedActivity, setSelectedActivity] = useState('');

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Physical Activities</Text>
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
                        borderBottomWidth: selectedActivity === 'Move' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: selectedActivity === 'Move' ? '#21CE9C' : '#432C81',
                        fontWeight: selectedActivity === 'Move' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Run-Move</Text>
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
                        borderBottomWidth: selectedActivity === 'Yoga' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: selectedActivity === 'Yoga' ? '#21CE9C' : '#432C81',
                        fontWeight: selectedActivity === 'Yoga' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Meditation-Yoga</Text>
                </Pressable>
            </View>

            {selectedActivity === 'Move' && <Move />}
            {selectedActivity === 'Yoga' && <Meditation_Yoga />}
        </SafeAreaView>
    )
}

export default PhysicalActivities

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


