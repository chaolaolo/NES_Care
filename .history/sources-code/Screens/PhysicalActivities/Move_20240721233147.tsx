import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BlockComponent from '../../../components/Block/BlockComponent'

const Move = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BlockComponent>
        <Text>Steps</Text>
        <Text>000</Text>
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