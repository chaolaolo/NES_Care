import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { Accelerometer } from 'react-native-sensors'

const Move = () => {
  const [steps, setSteps] = useState(0)
  const [distance, setDistance] = useState(0)
  const [movingTime, setMovingTime] = useState('0:00')
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    let stepCount = 0
    const subscription = Accelerometer.subscribe(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z)
      if (acceleration > 1.2) {
        stepCount += 1
        setSteps(stepCount)
        // Assuming an average step length of 0.78 meters
        setDistance((stepCount * 0.78 / 1000).toFixed(2))
      }
    })

    if (!isCounting) {
      subscription.unsubscribe()
    }

    return () => subscription.unsubscribe()
  }, [isCounting])

  const startCounting = () => {
    setIsCounting(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Steps</Text>
        <Text style={styles.txtContent}>000</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Distance</Text>
        <Text style={styles.txtContent}>000/km</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Moving Time</Text>
        <Text style={styles.txtContent}>0:00</Text>
      </BlockComponent>
      <Text style={{
        color: '#432C81',
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 40,

      }}>Now let's start your exercising,
        Click “Start” to start your journey with NES Care!</Text>
      <ButtonComponent
        onPress={startCounting}
        title="Start" style={{ paddingVertical: 18, marginTop: 60 }} />

    </SafeAreaView>
  )
}

export default Move

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