import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HeaderComponent from '../../../components/Header/HeaderComponent';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const { uid, fullName, avatar } = route.params;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={{ uri: avatar }} style={{ width: 34, height: 34, marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{fullName}</Text>
            </HeaderComponent>
            <Text>{fullName}</Text>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }, headerContainer: {
        // backgroundColor: '#E4F9F3',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginLeft: -20
    },
})