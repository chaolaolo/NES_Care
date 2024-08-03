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


// import { useState } from 'react';
// import { View } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

// const countries = [
//   { label: 'Vietnam', value: 'VN' },
//   // ...
// ];

// const Sleep = () => {
//   const [country, setCountry] = useState('VN');

//   return (
//  <View>
//      <RNPickerSelect
//       onValueChange={(value) => setCountry(value)}
//       items={countries}
//       value={country}
//       placeholder={{
//         label: 'Select a country...',
//         value: null,
//       }}
//     />
//  </View>
//   );
// };
// export default Sleep


import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

function Sleep() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{backgroundColor:'red',width:20}}
    />
  );
}

export default Sleep
