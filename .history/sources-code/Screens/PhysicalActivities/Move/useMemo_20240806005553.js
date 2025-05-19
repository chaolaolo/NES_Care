import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Platform } from 'react-native'
import { accelerometer } from 'react-native-sensors'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const useMove = () => {
    const [steps, setSteps] = useState(0)
    const [isCounting, setIsCounting] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [displaySteps, setDisplaySteps] = useState(0)
    const [displayMovingTime, setDisplayMovingTime] = useState('0:00')
    const [displayDistance, setDisplayDistance] = useState('0.00')
    const [displayCalories, setDisplayCalories] = useState('0.0')

    const stepsRef = useRef(0)
    const startTimeRef = useRef(null)
    const lastStepTimeRef = useRef(Date.now())

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
        let intervalId = null
        let subscription = null

        if (isCounting) {
            subscription = accelerometer.subscribe(({ x, y, z }) => {
                const acceleration = Math.sqrt(x * x + y * y + z * z)
                const now = Date.now()
                if (acceleration > 9 && (now - lastStepTimeRef.current) > 400) {
                    stepsRef.current += 1
                    lastStepTimeRef.current = now
                }
            })

            intervalId = setInterval(() => {
                const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000)
                const minutes = Math.floor(elapsedSeconds / 60)
                const seconds = elapsedSeconds % 60
                const calories = (stepsRef.current * 0.04).toFixed(1)

                setDisplayMovingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
                setDisplaySteps(stepsRef.current)
                setDisplayDistance((stepsRef.current * 0.78).toFixed(2))
                setDisplayCalories(calories)
            }, 1000)
        }

        return () => {
            if (subscription) subscription.unsubscribe()
            if (intervalId) clearInterval(intervalId)
        }
    }, [isCounting])

    const saveMoveData = async (steps, distance, movingTime, calories) => {
        const user = auth().currentUser
        console.log(user);
        if (!user) {
            console.log('User not logged in')
            return
        }

        const moveData = {
            uid: user.uid,
            steps,
            distance,
            movingTime,
            calories,
            createdAt: firestore.FieldValue.serverTimestamp()
        }

        try {
            await firestore().collection('Moves').add(moveData)
            console.log('Move data saved successfully')
        } catch (error) {
            console.log('Error saving move data:', error)
        }
    }

    const startCounting = useCallback(() => {
        setIsCounting(true);
        startTimeRef.current = Date.now();
        stepsRef.current = 0;
    }, [displayMovingTime])

    const stopCounting = useCallback(() => {
        setIsCounting(false);
        saveMoveData(stepsRef.current, (stepsRef.current * 0.78 / 1000).toFixed(2), displayMovingTime, displayCalories);
    }, [displayMovingTime, displayCalories]);

    const resetCounting = useCallback(() => {
        setIsCounting(false)
        setSteps(0)
        setDisplaySteps(0)
        setDisplayMovingTime('0:00')
        setDisplayDistance('0.00')
        setDisplayCalories('0.0')
        stepsRef.current = 0
        startTimeRef.current = null
        lastStepTimeRef.current = Date.now()
    }, [])

    return {
        steps: displaySteps,
        distance: displayDistance,
        movingTime: displayMovingTime,
        calories: displayCalories,
        isCounting,
        startCounting,
        stopCounting ,
        resetCounting
    }
}

export default useMove
