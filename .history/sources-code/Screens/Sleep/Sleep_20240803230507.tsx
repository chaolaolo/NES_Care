// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Sleep = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Sleep</Text>
//     </View>
//   )
// }

// export default Sleep

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:'white'
//     }
// })


import { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const countries = [
  { label: 'Vietnam', value: 'VN' },
  // ...
];

const Sleep = () => {
  const [country, setCountry] = useState('VN');

  return (
    <RNPickerSelect
      onValueChange={(value) => setCountry(value)}
      items={countries}
      value={country}
      placeholder={{
        label: 'Select a country...',
        value: null,
      }}
    />
  );
};
export default Sleep
