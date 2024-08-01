
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoveComponent from './MoveComponent'
import useMove from './useMemo'

const Move = () => {
  const { steps, distance, movingTime, calories, isCounting, startCounting, resetCounting } = useMove()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MoveComponent
        steps={steps}
        distance={distance}
        movingTime={movingTime}
        calories={calories}
        isCounting={isCounting}
        startCounting={startCounting}
        resetCounting={resetCounting}
      />
    </SafeAreaView>
  )
}

export default Move

