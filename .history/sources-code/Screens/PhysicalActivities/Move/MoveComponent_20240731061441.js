import React, { memo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ButtonComponent from '../../../../components/Button/ButtonComponent'
import BlockComponent from '../../../../components/Block/BlockComponent'
import ModalComponent from '../../../../components/Modal/ModalComponent'

const MoveComponent = memo(({ steps, distance, movingTime, calories, isCounting, startCounting, resetCounting }) => {
  console.log('MoveComponent render')

  const [modalVisible, setModalVisible] = useState(false);

  const handleStartCounting = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <BlockComponent style={{ marginTop: 20, marginBottom: 4, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Số bước chân</Text>
        <Text style={styles.txtContent}>{steps}</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 10, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Quãng đường</Text>
        <Text style={styles.txtContent}>{distance} km</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Tổng thời gian</Text>
        <Text style={styles.txtContent}>{movingTime}</Text>
      </BlockComponent>
      <BlockComponent style={{ marginVertical: 5, paddingVertical: 20 }}>
        <Text style={styles.txtTitle}>Calories</Text>
        <Text style={styles.txtContent}>{calories} kcal</Text>
      </BlockComponent>
      <Text style={{
        color: '#432C81',
        fontSize: 18,
        marginHorizontal: 10,
        marginTop: 40,
      }}>Now let's start your exercising,
        Click “Start” to start your journey with NES Care!</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
        <ButtonComponent
          title={isCounting ? "Bấm để dừng" : "Bắt đầu"}
          onPress={handleStartCounting}
          style={{ flex: 1, backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18 }}
        />
        {/* <ButtonComponent
          title="Reset"
          onPress={resetCounting}
          style={{ backgroundColor: 'gray', paddingVertical: 18, marginTop: 20 }}
        /> */}
        <TouchableOpacity onPress={resetCounting} style={{ paddingVertical: 18, paddingHorizontal: 20 }}>
          <Image source={require('../../../image/ic_play_again.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>


      {/* ***** */}
      <ModalComponent
        modalTitle="Hãy đặt mục tiêu hôm nay của bạn"
        onClose={handleModalClose}
        btnSavePress={startCounting}
        visible={modalVisible}
      >

      </ModalComponent>
      {/* ***** */}
    </View>
  )
})

export default MoveComponent

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
