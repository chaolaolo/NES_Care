import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity style={[st.button, props.style]} onPress={props.onPress}>
      <Text style={[st.btnTitle, props.btnTitleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const st = StyleSheet.create({
  button: {
    backgroundColor: '#FD7278',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btnTitle: {
    color: 'black',
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  }
})