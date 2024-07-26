import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


const WalkingScreen = () => {
    return (
        <View>
            <Text style={{ fontSize: 20 }}>Màn hình Đi bộ - Chạy bộ</Text>
        </View>
    );
};

const YogaScreen = () => {
    return (
        <View>
            <Text style={{ fontSize: 20 }}>Màn hình Yoga - Thiền</Text>
        </View>
    );
};

const PhysicalActivities = () => {

    const [selectedActivity, setSelectedActivity] = useState('walking');

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
    };


    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hoạt động thể chất</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button
                    title="Đi bộ - Chạy bộ"
                    onPress={() => handleActivityChange('walking')}
                    color={selectedActivity === 'walking' ? '#007bff' : '#ccc'}
                />
                <Button
                    title="Yoga - Thiền"
                    onPress={() => handleActivityChange('yoga')}
                    color={selectedActivity === 'yoga' ? '#007bff' : '#ccc'}
                />
            </View>

            {selectedActivity === 'walking' && <WalkingScreen />}
            {selectedActivity === 'yoga' && <YogaScreen />}
        </View>
    )
}

export default PhysicalActivities

const styles = StyleSheet.create({})


