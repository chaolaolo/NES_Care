import React, { memo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ButtonComponent from '../../../../components/Button/ButtonComponent'
import BlockComponent from '../../../../components/Block/BlockComponent'
import ModalComponent from '../../../../components/Modal/ModalComponent'
import TextInputComponent from '../../../../components/TextInput/TextInputComponent'

const MoveComponent = memo(({ steps, distance, movingTime, calories, isCounting, startCounting, resetCounting }) => {
  console.log('MoveComponent render')

  const [modalVisible, setModalVisible] = useState(false);
  const [stepsTarget, setStepsTarget] = useState(0);
  const [distanceTarget, setDistanceTarget] = useState(0);
  const [moveTarget, setMoveTarget] = useState();

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

        <TouchableOpacity onPress={resetCounting} style={{ paddingVertical: 18, paddingHorizontal: 20 }}>
          <Image source={require('../../../image/ic_play_again.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <ButtonComponent
        title={isCounting ? "Bấm để dừng" : "Bắt đầu"}
        onPress={handleStartCounting}
        style={{ flex: 1, backgroundColor: isCounting ? 'red' : '#21CE9C', paddingVertical: 18 }}
      />

      {/* ***** */}
      <ModalComponent
        modalTitle="Hãy đặt mục tiêu hôm nay của bạn"
        onClose={handleModalClose}
        btnSavePress={() => {
          setModalVisible(false);
          startCounting();
        }}
        visible={modalVisible}
      >
        <TextInputComponent
          value={stepsTarget}
          onChangeText={setStepsTarget}
          placeholder={'Mục tiêu về số bước chân...'} />
        <TextInputComponent
          value={distanceTarget}
          onChangeText={setDistanceTarget}
          placeholder={'Mục tiêu về số quãng đường...'} />
        <TextInputComponent
          value={moveTarget}
          onChangeText={setMoveTarget}
          placeholder={'Mục tiêu về Thời gian...'} />
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
