// import { Button, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import Move from './Move';
// import Yoga from './Yoga';

// const PhysicalActivities = () => {
//     const [selectedActivity, setSelectedActivity] = useState('walking');

//     const handleActivityChange = (activity) => {
//         setSelectedActivity(activity);
//     };


//     return (
//         <View>
//             <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hoạt động thể chất</Text>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//                 <Button
//                     title="Đi bộ - Chạy bộ"
//                     onPress={() => handleActivityChange('walking')}
//                     color={selectedActivity === 'walking' ? '#007bff' : '#ccc'}
//                 />
//                 <Button
//                     title="Yoga - Thiền"
//                     onPress={() => handleActivityChange('yoga')}
//                     color={selectedActivity === 'yoga' ? '#007bff' : '#ccc'}
//                 />
//             </View>

//             {selectedActivity === 'walking' && <Move />}
//             {selectedActivity === 'yoga' && <Yoga />}
//         </View>
//     )
// }

// export default PhysicalActivities

// const styles = StyleSheet.create({})


import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// Định nghĩa các scenes cho từng tab
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text>First Screen</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text>Second Screen</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function PhysicalActivities() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
