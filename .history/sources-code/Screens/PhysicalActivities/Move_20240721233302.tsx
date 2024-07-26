import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BlockComponent from '../../../components/Block/BlockComponent'

const Move = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BlockComponent style={{marginVertical:10}}>
        <Text>Steps</Text>
        <Text>000</Text>
      </BlockComponent>
      <BlockComponent style={{marginVertical:10}}>
        <Text>Distance</Text>
        <Text>000/km</Text>
      </BlockComponent>
      <BlockComponent style={{marginVertical:10}}>
        <Text>Moving Time</Text>
        <Text>0:00</Text>
      </BlockComponent>
    </SafeAreaView>
  )
}

export default Move

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
})