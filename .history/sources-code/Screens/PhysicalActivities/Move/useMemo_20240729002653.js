import { useState, useEffect, useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { accelerometer } from 'react-native-sensors'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

const useMove = () => {
  const [steps, setSteps] = useState(0)
  const [isCounting, setIsCounting] = useState(false)
  const [startTime, setStartTime] = useState(null)

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
      subscription = accelerometer.subscribe(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z)
        if (acceleration > 9) {
          stepCount += 1
          setSteps(prevSteps => prevSteps !== stepCount ? stepCount : prevSteps)
        }
      })
      intervalId = setInterval(() => {
        setStartTime(Date.now())
      }, 1000)
    }

    return () => {
      if (subscription) subscription.unsubscribe()
      if (intervalId) clearInterval(intervalId)
    }
  }, [isCounting])

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

  const distance = useMemo(() => (steps * 0.78 / 1000).toFixed(2), [steps])

  const movingTime = useMemo(() => {
    if (!startTime) return '0:00'
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    const minutes = Math.floor(elapsedSeconds / 60)
    const seconds = elapsedSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }, [startTime])

  const isInitializing = useMemo(() => isCounting && !startTime, [isCounting, startTime])

  return { steps, distance, movingTime, isCounting, isInitializing, startCounting }
}

export default useMove
