
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoveComponent from './MoveComponent'
import useMove from './useMemo'

const Move = () => {
  const { steps, distance, movingTime, isCounting, startCounting } = useMove()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MoveComponent
        steps={steps}
        distance={distance}
        movingTime={movingTime}
        isCounting={isCounting}
        startCounting={startCounting}
      />
    </SafeAreaView>
  )
}

export default Move

