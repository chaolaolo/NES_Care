// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import BlockComponent from '../../../components/Block/BlockComponent'
// import ButtonComponent from '../../../components/Button/ButtonComponent'


// const startStepCounting = (setSteps) => {
//   // This is a placeholder to simulate step counting
//   const stepInterval = setInterval(() => {
//     setSteps(prevSteps => prevSteps + 1);
//   }, 1000);

//   return stepInterval;
// };


// const Move = () => {
//   const [isCounting, setIsCounting] = useState(false);
//   const [steps, setSteps] = useState(0);

//   useEffect(() => {
//     let stepInterval;
//     if (isCounting) {
//       stepInterval = startStepCounting(setSteps);
//     } else if (!isCounting && steps !== 0) {
//       clearInterval(stepInterval);
//     }
//     return () => clearInterval(stepInterval);
//   }, [isCounting]);

//   const handleButtonPress = () => {
//     setIsCounting(!isCounting);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Steps</Text>
//         <Text style={styles.txtContent}>{steps}</Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Distance</Text>
//         <Text style={styles.txtContent}>
//           {(steps * 0.0008).toFixed(2)}/km
//         </Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Moving Time</Text>
//         <Text style={styles.txtContent}>
//           {`${Math.floor((steps / 120))}:${(steps % 120).toString().padStart(2, '0')}`}
//         </Text>
//       </BlockComponent>
//       <Text style={{
//         color: '#432C81',
//         fontSize: 18,
//         marginHorizontal: 10,
//         marginTop: 40,

//       }}>Now let's start your exercising,
//         Click “{isCounting ? 'Stop' : 'Start'}” to {isCounting ? 'stop' : 'start'} your journey with NES Care!</Text>
//       <ButtonComponent
//         onPress={handleButtonPress}
//         title={isCounting ? "You're moving, press to Stop" : "Start"}
//         style={{ backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18, marginTop: 60 }}
//       />

//     </SafeAreaView>
//   )
// }

// export default Move

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   txtTitle: {
//     color: '#432C81',
//     fontSize: 16
//   },
//   txtContent: {
//     color: '#7B6BA8',
//     fontSize: 16
//   }
// })




import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { accelerometer } from 'react-native-sensors'
import { map, filter } from 'rxjs/operators'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import MemoizedBlockComponent from '../../../components/MeMo/MemoizedBlockComponent'
import { updateSteps } from '../../redux/Actions/action'


const Move = () => {
  const dispatch = useDispatch();
  const steps = useSelector(state => state.steps);
  const [isCounting, setIsCounting] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    let stepCount = 0;
    if (isCounting) {
      const accelSubscription = accelerometer
        .pipe(
          map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
          filter(acceleration => acceleration > 9)
        )
        .subscribe(() => {
          stepCount++;
          requestAnimationFrame(() => dispatch(updateSteps(stepCount)));
        });
      setSubscription(accelSubscription);
    } else if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [isCounting, dispatch]);

  const handleButtonPress = () => {
    setIsCounting(!isCounting);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Steps</Text>
        <Text style={styles.txtContent}>{steps}</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Distance</Text>
        <Text style={styles.txtContent}>
          {(steps * 0.0008).toFixed(2)}/km
        </Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Moving Time</Text>
        <Text style={styles.txtContent}>
          {`${Math.floor((steps / 120))}:${(steps % 120).toString().padStart(2, '0')}`}
        </Text>
      </BlockComponent>
      <Text style={{
        color: '#432C81',
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 40,

      }}>Now let's start your exercising,
        Click “{isCounting ? 'Stop' : 'Start'}” to {isCounting ? 'stop' : 'start'} your journey with NES Care!</Text>
      <ButtonComponent
        onPress={handleButtonPress}
        title={isCounting ? "You're moving, press to Stop" : "Start"}
        style={{ backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18, marginTop: 60 }}
      /> */}
      <MemoizedBlockComponent title="Steps" content={steps} />
      <MemoizedBlockComponent title="Distance" content={`${(steps * 0.0008).toFixed(2)}/km`} />
      <MemoizedBlockComponent title="Moving Time" content={`${Math.floor((steps / 120))}:${(steps % 120).toString().padStart(2, '0')}`} />
      <Text style={styles.infoText}>
        Now let's start your exercising, Click “{isCounting ? 'Stop' : 'Start'}” to {isCounting ? 'stop' : 'start'} your journey with NES Care!
      </Text>
      <ButtonComponent
        onPress={handleButtonPress}
        title={isCounting ? "You're moving, press to Stop" : "Start"}
        style={{ backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18, marginTop: 60 }}
      />
    </SafeAreaView>
  )
}

export default Move

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white'
  // },
  // txtTitle: {
  //   color: '#432C81',
  //   fontSize: 16
  // },
  // txtContent: {
  //   color: '#7B6BA8',
  //   fontSize: 16
  // }

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoText: {
    color: '#432C81',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 40,
  },
})

// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================

// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, Platform } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import BlockComponent from '../../../components/Block/BlockComponent'
// import ButtonComponent from '../../../components/Button/ButtonComponent'
// import { accelerometer } from 'react-native-sensors'
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

// const Move = () => {
//   const [steps, setSteps] = useState(0)
//   const [distance, setDistance] = useState(0)
//   const [movingTime, setMovingTime] = useState('0:00')
//   const [isCounting, setIsCounting] = useState(false)
//   const [startTime, setStartTime] = useState(null)
//   const [isInitializing, setIsInitializing] = useState(false);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       requestPermission()
//     }
//   }, [])

//   const requestPermission = async () => {
//     const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
//     if (result === RESULTS.GRANTED) {
//       console.log('Permission granted')
//     } else {
//       console.log('Permission denied')
//     }
//   }

//   useEffect(() => {
//     let stepCount = 0
//     let intervalId

//     if (isCounting) {
//       setIsInitializing(true);
//       const subscription = accelerometer.subscribe(({ x, y, z }) => {
//         // console.log(`x: ${x}, y: ${y}, z: ${z}`)
//         const acceleration = Math.sqrt(x * x + y * y + z * z)
//         if (acceleration > 9) {
//           stepCount += 1
//           setSteps(stepCount)
//           setDistance((stepCount * 0.78 / 1000).toFixed(2))
//         }
//       })
//       intervalId = setInterval(() => {
//         const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
//         const minutes = Math.floor(elapsedSeconds / 60)
//         const seconds = elapsedSeconds % 60
//         setMovingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
//         console.log(movingTime);

//       }, 1000)


//       return () => {
//         subscription.unsubscribe()
//         clearInterval(intervalId)
//       }
//     } else {
//       setIsInitializing(false);
//       return () => clearInterval(intervalId)
//     }

//   }, [isCounting, startTime])

//   const startCounting = () => {
//     // setIsCounting(true)
//     // setStartTime(Date.now())
//     if (isCounting) {
//       setIsCounting(false)
//     } else {
//       setIsCounting(true)
//       setStartTime(Date.now())
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Steps</Text>
//         <Text style={styles.txtContent}>{steps}</Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Distance</Text>
//         <Text style={styles.txtContent}>{distance} km</Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Moving Time</Text>
//         <Text style={styles.txtContent}>{movingTime}</Text>
//       </BlockComponent>
//       <Text style={{
//         color: '#432C81',
//         fontSize: 18,
//         marginHorizontal: 10,
//         marginTop: 40,
//       }}>Now let's start your exercising,
//         Click “Start” to start your journey with NES Care!</Text>
//       <ButtonComponent
//         title={isCounting ? "You're moving, press to Stop" : "Start"}
//         onPress={startCounting}
//         disabled={isInitializing}
//         style={{ backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18, marginTop: 60 }}
//       />
//     </View>
//   )
// }

// export default Move

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   txtTitle: {
//     color: '#432C81',
//     fontSize: 16
//   },
//   txtContent: {
//     color: '#7B6BA8',
//     fontSize: 16
//   }
// })
