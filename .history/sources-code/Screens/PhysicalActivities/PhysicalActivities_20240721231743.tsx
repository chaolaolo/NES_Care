import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Move from './Move';
import Yoga from './Yoga';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const PhysicalActivities = () => {
    const navigation = useNavigation();
    const [selectedActivity, setSelectedActivity] = useState('Move');

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
                        backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
                        paddingVertical: 10,
                        alignItems: 'center'
                    }}>
                    <Text>Đi bộ - Chạy bộ</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleActivityChange('Yoga')}
                    style={{
                        flex: 1,
                        backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',

                    }}>
                    <Text>Yoga - Thiền</Text>
                </Pressable>
                {/* <Button
                    title="Đi bộ - Chạy bộ"
                    onPress={() => handleActivityChange('Move')}
                    color={selectedActivity === 'Move' ? '#007bff' : '#ccc'}
                /> */}
                {/* <Button
                    title="Yoga - Thiền"
                    onPress={() => handleActivityChange('Yoga')}
                    color={selectedActivity === 'Yoga' ? '#007bff' : '#ccc'}
                /> */}
            </View>

            {selectedActivity === 'Move' && <Move />}
            {selectedActivity === 'Yoga' && <Yoga />}
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
        backgroundColor: 'red'
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


