import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { FlatList } from 'react-native'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'

const Sleep = () => {
  const navigation = useNavigation();
  const [listHistory, setListHistory] = useState('');
  const [showTimeSleep, setShowTimeSleep] = useState(false);
  const [timeSleeptarget, setTimeSleeptarget] = useState(0);


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
      <BlockComponent style={{}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#432C81' }}>Thiết lập</Text>
        <Text style={{ fontSize: 16, textAlign: 'justify', color: '#432C81' }}>Hãy thiết lập giờ ngủ của bạn để bạn có giâc giấc ngủ tốt hơn và để chúng tôi hiểu thói quen ngủ của bạn.</Text>
        <ButtonComponent
          onPress={() => setShowTimeSleep(true)}
          title="THIẾT LẬP"
        >
        </ButtonComponent>
      </BlockComponent>

      <View>
        <FlatList
          data={listHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 20, color: '#432C81', marginHorizontal: 20, marginTop: 20 }}>Lịch sử thiết lập</Text>
          )}
        />
      </View>






      {/* ***Set time sleep Modal*** */}
      <Modal
        visible={showTimeSleep}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowTimeSleep(false)}
      >
        <Pressable onPress={() => setShowTimeSleep(false)} style={styles.modalOverlay} >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text onPress={() => setShowTimeSleep(false)} style={styles.modalCancel}>Hủy</Text>
              <Text style={styles.modalTitle}>Thiết lập giờ ngủ</Text>
              <Text
                // onPress={handleupdateTarget}
                style={[styles.modalSave, { backgroundColor: '#21CE9C' }]}>Lưu</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <View >
                <TextInputComponent
                  value={timeSleeptarget}
                  onChangeText={setTimeSleeptarget}
                  placeholder={"Mục tiêu giờ ngủ"} />
                <Text style={{ color: '#5198FF', fontSize: 18,position:'absolute',right:20,marginTop:20 }}>time sleep target</Text>
              </View>
              <View style={{
                padding: 10,
                borderWidth: 1,
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 6,
                borderColor: 'rgba(34, 31, 31, 0.1)',
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 30, height: 30 }} />
                  <View style={{ flex: 1 }}>
                    <Text>Giờ đi ngủ</Text>
                    <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>22:30</Text>
                  </View>
                  <Text style={{ color: '#5198FF', fontSize: 20 }}>edit</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>

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

  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginHorizontal: 20,
    // borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 5,
    elevation: 5,
    shadowColor: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center'
  },
  modalCancel: {
    color: '#432C81',
    fontSize: 16,
  },
  modalTitle: {
    color: '#432C81',
    fontWeight: 'bold',
    fontSize: 19
  },
  modalSave: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,

  },
})



