// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import BlockComponent from '../../../components/Block/BlockComponent'
// import ButtonComponent from '../../../components/Button/ButtonComponent'


// const Move = () => {


//   return (
//     <SafeAreaView style={styles.container}>
//       <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Steps</Text>
//         <Text style={styles.txtContent}>1000</Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Distance</Text>
//         <Text style={styles.txtContent}>
//           30/km
//         </Text>
//       </BlockComponent>
//       <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
//         <Text style={styles.txtTitle}>Moving Time</Text>
//         <Text style={styles.txtContent}>
//           0:00
//         </Text>
//       </BlockComponent>
//       <Text style={{
//         color: '#432C81',
//         fontSize: 18,
//         marginHorizontal: 10,
//         marginTop: 40,

//       }}>Now let's start your exercising,
//         Click “Start” to start' your journey with NES Care!</Text>
//       <ButtonComponent
//         // onPress={handleButtonPress}
//         title={"Start"}
//         style={{ backgroundColor: '#21CE9C', paddingVertical: 18, marginTop: 60 }}
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
import BlockComponent from '../../../../components/Block/BlockComponent';
import ButtonComponent from '../../../../components/Button/ButtonComponent';
// import BlockComponent from '../../components/Block/BlockComponent'
// import ButtonComponent from '../../components/Button/ButtonComponent'


const startStepCounting = (setSteps) => {
  // This is a placeholder to simulate step counting
  const stepInterval = setInterval(() => {
    setSteps(prevSteps => prevSteps + 1);
  }, 1000);

  return stepInterval;
};


const Move = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    let stepInterval;
    if (isCounting) {
      stepInterval = startStepCounting(setSteps);
    } else if (!isCounting && steps !== 0) {
      clearInterval(stepInterval);
    }
    return () => clearInterval(stepInterval);
  }, [isCounting]);

  const handleButtonPress = () => {
    setIsCounting(!isCounting);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
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
      />

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


 
// // ================================================================
// // ================================================================
// // ================================================================
// // ================================================================
// // ================================================================
// // ================================================================
 

// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import MoveComponent from './MoveComponent'
// import useMove from './useMemo'

// const Move = () => {
//   const { steps, distance, movingTime, isCounting, isInitializing, startCounting } = useMove()

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <MoveComponent
//         steps={steps}
//         distance={distance}
//         movingTime={movingTime}
//         isCounting={isCounting}
//         isInitializing={isInitializing}
//         startCounting={startCounting}
//       />
//     </SafeAreaView>
//   )
// }

// export default Move
