import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const { fullName } = route.params;
    return (
        <View>
            <Text>{fullName}</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})