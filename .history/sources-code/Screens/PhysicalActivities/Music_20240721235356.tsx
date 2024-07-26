import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Music = () => {
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');

    const handleActivityChange = (activity) => {
        setSelectedMusicSection(activity);
    };
    return (
        <View>
            <Text>Music</Text>
        </View>
    )
}

export default Music

const styles = StyleSheet.create({})