import React, { memo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ButtonComponent from '../../../../components/Button/ButtonComponent'
import BlockComponent from '../../../../components/Block/BlockComponent'
import ModalComponent from '../../../../components/Modal/ModalComponent'
import TextInputComponent from '../../../../components/TextInput/TextInputComponent'

const MoveComponent = memo(({ steps, distance, movingTime, calories, isCounting, startCounting, resetCounting }) => {
  console.log('MoveComponent render')

  const [stepsTarget, setStepsTarget] = useState('');
  const [errStepsTarget, setErrStepsTarget] = useState('');
  const [distanceTarget, setDistanceTarget] = useState('');
  const [errDistanceTarget, setErrDistanceTarget] = useState('');
  const [moveTimeTarget, setMoveTimeTarget] = useState('');
  const [errMoveTimeTarget, setErrMoveTimeTarget] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);

  const handleShowSetTarget = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleStopMove = () => {

  }

  const handleStartMove = () => {
    let err = false;
    const isValidNumber = (input) => /^-?\d*\.?\d+$/.test(input);
    if (stepsTarget.length === 0) {
      setErrStepsTarget('Vui lòng đặt mục tiêu số bước chân');
      err = true
    } else if (!isValidNumber(stepsTarget)) {
      setErrStepsTarget('Hãy nhập số');
      err = true
    } else {
      setErrStepsTarget('');
    }
    if (distanceTarget.length === 0) {
      setErrDistanceTarget('Vui lòng đặt mục tiêu quãng đường');
      err = true
    } else if (!isValidNumber(distanceTarget)) {
      setErrDistanceTarget('Hãy nhập số');
      err = true
    } else {
      setErrDistanceTarget('');
    }
    if (moveTimeTarget.length === 0) {
      setErrMoveTimeTarget('Vui lòng đặt mục tiêu số bước chân');
      err = true
    } else if (!isValidNumber(moveTimeTarget)) {
      setErrMoveTimeTarget('Hãy nhập số');
      err = true
    } else {
      setErrMoveTimeTarget('');
    }

    if (!err) {
      startCounting();
      // setModalVisible(false);
    }
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
          title={"Bắt đầu"}
          onPress={handleShowSetTarget}
          style={{ flex: 1, backgroundColor: '#21CE9C', paddingVertical: 18 }}
        />

        <TouchableOpacity onPress={resetCounting} style={{ paddingVertical: 18, paddingHorizontal: 20 }}>
          <Image source={require('../../../image/ic_play_again.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      {
        isCounting && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 70 }}>
            <ButtonComponent
              title={"Bấm để dừng"}
              onPress={() => setShowStopModal(true)}
              style={{ flex: 1, backgroundColor: 'red', paddingVertical: 18 }}
            />
          </View>
        )
      }


      {/* *****show set target***** */}
      <ModalComponent
        modalTitle="Hãy đặt mục tiêu hôm nay của bạn"
        onClose={handleModalClose}
        btnSavePress={() => {
          handleStartMove();
        }}
        visible={modalVisible}
      >
        <TextInputComponent
          value={stepsTarget}
          onChangeText={setStepsTarget}
          placeholder={'Mục tiêu về số bước chân...'} />
        {errStepsTarget && (
          <>
            <Text style={{ color: 'red', marginHorizontal: 16 }}>{errStepsTarget}</Text>
          </>
        )}
        <TextInputComponent
          value={distanceTarget}
          onChangeText={setDistanceTarget}
          placeholder={'Mục tiêu về số quãng đường (meter)...'} />
        {errDistanceTarget && (
          <>
            <Text style={{ color: 'red', marginHorizontal: 16 }}>{errDistanceTarget}</Text>
          </>
        )}
        <TextInputComponent
          value={moveTimeTarget}
          onChangeText={setMoveTimeTarget}
          placeholder={'Mục tiêu về Thời gian (phút)...'} />
        {errMoveTimeTarget && (
          <>
            <Text style={{ color: 'red', marginHorizontal: 16 }}>{errMoveTimeTarget}</Text>
          </>
        )}
      </ModalComponent>
      {/* ***** */}
      {/* *****show confirm stop***** */}
      <ModalComponent
        modalTitle="Dừng hành trình của bạn?"
        onClose={()=>setShowStopModal(false)}
        btnSavePress={() => {
          handleStopMove();
        }}
        visible={showStopModal}
      >
        <Text style={{ color: 'black', marginHorizontal: 20, marginBottom: 20, fontSize: 18, textAlign: 'justify' }}>
          Bạn đang di chuyển được {steps} bước trong {movingTime} phút với quãng đường {distance} mét! Bạn có muốn kết thúc hành trình không?
        </Text>
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
