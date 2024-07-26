import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BlockComponent = (props) => {
    return (
        <View style={[st.blockContainer,props.style]}>
            <Text style={st.title}>{props.title}</Text>
            {props.children}
            {/* <Text style={st.content}>{props.content}</Text> */}
        </View>
    )
}

export default BlockComponent

const st = StyleSheet.create({
    blockContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        // padding: 20,
        margin: 10,
        borderRadius: 20,
        borderWidth:2,
        shadowColor: 'rgba(0,0,0,0.2)',
        elevation: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FD7278',
        marginVertical:10,
        textAlign:'center'
    },
    content: {
        color: 'black'
    },

})
 