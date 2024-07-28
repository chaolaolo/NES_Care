import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HeaderComponent from '../../../components/Header/HeaderComponent';
import { TextInput } from 'react-native-gesture-handler';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const { uid, fullName, avatar } = route.params;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
                </TouchableOpacity>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.headerTitle}>{fullName}</Text>
            </HeaderComponent>


            <View style={styles.boxInput}>
                <TextInput
                    placeholder='Type message here...'
                    style={styles.inputMessage}
                />
                <TouchableOpacity>
                    <Image source={require('../../image/ic_send.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>

            <Text>{fullName}</Text>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        // backgroundColor: '#E4F9F3',
        marginLeft: 10
    },
    avatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
        width: 50, height: 50
    },
    boxInput: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        // marginBottom:40
    },
    inputMessage: {
        backgroundColor: '#F3F6F6',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal:4
    }
})