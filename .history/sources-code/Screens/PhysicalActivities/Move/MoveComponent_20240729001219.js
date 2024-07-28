// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import ButtonComponent from '../../../../components/Button/ButtonComponent'
// import BlockComponent from '../../../../components/Block/BlockComponent'

// const MoveComponent = ({ steps, distance, movingTime, isCounting, isInitializing, startCounting }) => {
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

// export default MoveComponent

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


import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MoveComponent from './MoveComponent'
import useMove from './useMemo'

const Move = () => {
  const { steps, distance, movingTime, isCounting, isInitializing, startCounting } = useMove()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MoveComponent
        steps={steps}
        distance={distance}
        movingTime={movingTime}
        isCounting={isCounting}
        isInitializing={isInitializing}
        startCounting={startCounting}
      />
    </SafeAreaView>
  )
}

export default Move
