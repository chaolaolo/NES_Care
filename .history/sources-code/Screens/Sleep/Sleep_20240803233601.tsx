import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Sleep = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sleep</Text>
    </SafeAreaView>
  )
}

export default Sleep

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})


 


// import { useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';

// function Sleep() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'Apple', value: 'apple'},
//     {label: 'Banana', value: 'banana'}
//   ]);

//   return (
//     <DropDownPicker
//       open={open}
//       value={value}
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//       style={{backgroundColor:'red',width:20}}
//     />
//   );
// }

// export default Sleep
