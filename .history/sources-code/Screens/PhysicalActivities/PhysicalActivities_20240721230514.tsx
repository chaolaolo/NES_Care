import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Move from './Move';
import Yoga from './Yoga';

const PhysicalActivities = () => {
    const [selectedActivity, setSelectedActivity] = useState('Move');

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
    };


    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hoạt động thể chất</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Pressable
                    onPress={() => handleActivityChange('Move')}>
                    <Text>Đi bộ - Chạy bộ</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleActivityChange('Yoga')}>
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
        </View>
    )
}

export default PhysicalActivities

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})


