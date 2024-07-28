import { useState, useEffect, useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { accelerometer } from 'react-native-sensors'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

const useMove = () => {
  const [steps, setSteps] = useState(0)
  const [movingTime, setMovingTime] = useState('0:00')
  const [isCounting, setIsCounting] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [isInitializing, setIsInitializing] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestPermission()
    }
  }, [])

  const requestPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
    if (result === RESULTS.GRANTED) {
      console.log('Permission granted')
    } else {
      console.log('Permission denied')
    }
  }

  useEffect(() => {
    let stepCount = 0
    let intervalId = null
    let subscription = null

    if (isCounting) {
      setIsInitializing(true)
      subscription = accelerometer.subscribe(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z)
        if (acceleration > 9) {
          stepCount += 1
          setSteps(prevSteps => {
            if (prevSteps !== stepCount) {
              return stepCount
            }
            return prevSteps
          })
        }
      })
      intervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
        const minutes = Math.floor(elapsedSeconds / 60)
        const seconds = elapsedSeconds % 60
        setMovingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
      }, 1000)
    } else {
      setIsInitializing(false)
    }

    return () => {
      if (subscription) subscription.unsubscribe()
      if (intervalId) clearInterval(intervalId)
    }
  }, [isCounting, startTime])

  const startCounting = useCallback(() => {
    setIsCounting(prevIsCounting => {
      if (prevIsCounting) {
        return false
      } else {
        setStartTime(Date.now())
        return true
      }
    })
  }, [])

  const distance = useMemo(() => {
    return (steps * 0.78 / 1000).toFixed(2)
  }, [steps])

  return { steps, distance, movingTime, isCounting, isInitializing, startCounting }
}

export default useMove
