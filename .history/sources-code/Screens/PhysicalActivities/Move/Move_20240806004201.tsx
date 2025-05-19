
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoveComponent from './MoveComponent'
import useMove from './useMemo'

const Move = () => {
  const { steps, distance, movingTime, calories, isCounting, startCounting,stopCounting, resetCounting } = useMove()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MoveComponent
        steps={steps}
        distance={distance}
        movingTime={movingTime}
        calories={calories}
        isCounting={isCounting}
        startCounting={startCounting}
        stopCounting={stopCounting}
        resetCounting={resetCounting}
      />
    </SafeAreaView>
  )
}

export default Move

