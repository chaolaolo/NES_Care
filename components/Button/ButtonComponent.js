import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity style={[st.button, props.style]} onPress={props.onPress} disabled={props.disabled}>
      <Text style={[st.btnTitle, props.btnTitleStyle]}>{props.title}</Text>
      {props.children}
    </TouchableOpacity>
  )
}

export default ButtonComponent

const st = StyleSheet.create({
  button: {
    backgroundColor: '#21CE9C',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btnTitle: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  }
})