import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BlockComponent = (props) => {
    return (
        <Pressable style={[st.blockContainer, props.style]} onPress={props.onPress}>
            {props.title ? <Text style={st.title}>{props.title}</Text> : null}
            {props.children}
        </Pressable>
    )
}
export default BlockComponent

const st = StyleSheet.create({
    blockContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FD7278',
        marginVertical: 10,
        textAlign: 'center'
    },
    innerContainer: {
        backgroundColor: 'lightpink',
        borderRadius: 10,
        padding: 10,

    }
    ,
    content: {
        color: 'black'
    },

})
