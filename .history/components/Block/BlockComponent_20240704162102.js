import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BlockComponent = (props) => {
    return (
        <SafeAreaView style={[st.blockContainer, props.style]}>
            {/* <View style={st.innerContainer}> */}
                {/* <Text style={st.title}>{props.title}</Text> */}
                {props.title ? <Text style={st.title}>{props.title}</Text> : null}
                {props.children}
                {/* <Text style={st.content}>{props.content}</Text> */}
            {/* </View> */}
        </SafeAreaView>
    )
}
export default BlockComponent

const st = StyleSheet.create({
    blockContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding:10,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
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
        padding:10,
   
    }
    ,
    content: {
        color: 'black'
    },

})
