import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { FlatList } from 'react-native'

const Sleep = () => {
  const navigation = useNavigation();
  const [listHistory, setListHistory] = useState('');


  const renderItem = () => {
    return (
      <View>
        <Text>Item</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_arrow_left.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeaderTitle}>Thời gian ngủ nghỉ</Text>
      </HeaderComponent>
      <ScrollView>
        <BlockComponent style={{}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#432C81' }}>Thiết lập</Text>
          <Text style={{ fontSize: 16, textAlign: 'justify', color: '#432C81' }}>Hãy thiết lập giờ ngủ của bạn để bạn có giâc giấc ngủ tốt hơn và để chúng tôi hiểu thói quen ngủ của bạn.</Text>
          <ButtonComponent
            title="THIẾT LẬP"
          >
          </ButtonComponent>
        </BlockComponent>

        <FlatList
          data={listHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 20,color: '#432C81',marginHorizontal:20 }}>Lịch sử thiết lập</Text>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Sleep

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    alignItems: 'center',
    // backgroundColor: '#E4F9F3',
    backgroundColor: 'white',
    // position: 'absolute',
    top: 0,
    zIndex: 3,
    paddingVertical: 20
  },
  txtHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#432C81',
    textAlign: 'center',
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
