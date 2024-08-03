import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Sleep = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
         {/* <View style={{ backgroundColor: '#21CE9C', width: '100%', height: 500 }}> */}
                    <HeaderComponent style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_arrow_left.png')} />
                        </TouchableOpacity>
                        <Text style={styles.txtHeaderTitle}>Trang cá nhân</Text>
                    </HeaderComponent>
                {/* </View> */}
      <Text>Sleep</Text>
    </SafeAreaView>
  )
}

export default Sleep

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    headerContainer: {
      alignItems: 'center',
      // backgroundColor: '#E4F9F3',
      // backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      zIndex: 3,
      justifyContent: 'space-between',
      // flexDirection: 'row',
  },
  txtHeaderTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#432C81',
      textAlign: 'left',
      flex: 1,
      paddingRight: 30
  },
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
