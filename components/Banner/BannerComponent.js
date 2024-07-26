import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BannerComponent = (props) => {
  return (
    <View style={styles.bannerContainer} >
      <Image source={{ uri: props.imgBanner }} style={styles.imgBanner} />
    </View>
  )
}

export default BannerComponent

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    padding: 10,
    backgroundColor:'rgba(0,0,0,0)'
  },
  imgBanner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius:10
  }
})