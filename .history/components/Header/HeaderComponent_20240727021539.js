import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HeaderComponent = (props) => {
  return (
    <View style={[styles.headerContainer,props.style]}>
      {/* <TouchableOpacity onPress={props.onPress} style={props.style}> */}
        {/* <Image source={{ uri: props.imgBack }} style={styles.imgBack} /> */}
        {props.children}
      {/* </TouchableOpacity> */}
      {/* <Text style={styles.txtTitle}>{props.title}</Text> */}
        {/* {props.children} */}
        </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21CE9C',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  imgBack: {
    width: 30,
    height: 30
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign:'center',
    flex:1,
    paddingRight:30
  }
})