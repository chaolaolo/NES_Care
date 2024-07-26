import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlockComponent from '../../../components/Block/BlockComponent'
import { useNavigation } from '@react-navigation/native'

const Meditation_Yoga = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Video</Text>
        {/* <Text style={styles.txtContent}>000</Text> */}
      </BlockComponent>
      <BlockComponent
        onPress={() => navigation.navigate('Music')}
        style={{ marginVertical: 10, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Music</Text>
        {/* <Text style={styles.txtContent}>000/km</Text> */}
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Timer</Text>
        {/* <Text style={styles.txtContent}>0:00</Text> */}
      </BlockComponent>
    </SafeAreaView>
  )
}

export default Meditation_Yoga

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  txtTitle: {
    color: '#432C81',
    fontSize: 16
  },
  txtContent: {
    color: '#7B6BA8',
    fontSize: 16
  }
})