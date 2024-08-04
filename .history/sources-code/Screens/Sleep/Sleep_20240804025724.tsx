import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { FlatList } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import AlarmManager from 'react-native-alarm-manager'; // Import AlarmManager

const Sleep = () => {
  const navigation = useNavigation();
  const [listHistory, setListHistory] = useState('');
  const [showTimeSleep, setShowTimeSleep] = useState(false);
  const [timeSleeptarget, setTimeSleeptarget] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const [timeStop, setTimeStop] = useState(0);
  const [alarmEnabled, setAlarmEnabled] = useState(false);

  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeStopPicker, setShowTimeStopPicker] = useState(false);

  // ****Time start 
  const handleShowTimeStartPicker = () => {
    setShowTimeStartPicker(true);
  };

  const handleHideTimeStartPicker = () => {
    setShowTimeStartPicker(false);
  };

  const handleConfirmTimeStart = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTimeStart(formattedTime);
    handleHideTimeStartPicker();
  };

  // ****Time stop 
  const handleShowTimeStopPicker = () => {
    setShowTimeStopPicker(true);
  };

  const handleHideTimeStopPicker = () => {
    setShowTimeStopPicker(false);
  };

  const handleConfirmTimeStop = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setTimeStop(formattedTime);
    handleHideTimeStopPicker();
  };

  // alarm
  const handleAlarmSwitch = (value) => {
    setAlarmEnabled(value);
    if (value) {
      const [hour, minute] = timeStop.split(':').map(Number);
      const alarmTime = new Date();
      alarmTime.setHours(hour, minute, 0, 0);

      if (alarmTime <= new Date()) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Set alarm for next day if the time has passed today
      }

      AlarmManager.scheduleAlarm({
        message: 'Time to wake up!',
        date: alarmTime,
        playSound: true,
        vibrate: true,
        repeatInterval: 'day',
      });
    } else {
      AlarmManager.cancelAllAlarms();
    }
  };



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
              <TextInputComponent
                value={timeSleeptarget}
                onChangeText={setTimeSleeptarget}
                placeholder={"Mục tiêu giờ ngủ"} />
              <TextInputComponent
                onPress={() => setShowTimeStartPicker(true)}
                value={timeStart}
                onChangeText={setTimeStart}
                placeholder={"Giờ đi ngủ"} />
              <TextInputComponent
                onPress={() => setShowTimeStopPicker(true)}
                value={timeStop}
                onChangeText={setTimeStop}
                placeholder={"Giờ thức dậy"} />
              <View style={{ flexDirection: 'row', marginHorizontal: 20, width: '94%', marginVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Báo thức</Text>
                <Switch
                  value={alarmEnabled}
                  onValueChange={handleAlarmSwitch} />
              </View>

              <Text style={{
                fontSize: 20, color: 'rgba(67, 44, 129, 1)', marginHorizontal: 16,
                marginTop: 10
              }}>Thiết lập gần nhất</Text>

              <View style={{
                padding: 10,
                borderWidth: 1,
                marginVertical: 5,
                marginHorizontal: 10,
                borderRadius: 6,
                borderColor: 'rgba(34, 31, 31, 0.1)',
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ fontSize: 18, }}>Mục tiêu: </Text>
                  <Text style={{ color: '#5198FF', fontSize: 18, }}>8 giờ</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text>Giờ đi ngủ</Text>
                    <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>22:30</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text>Giờ thức dậy</Text>
                    <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>7:30</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>



      {/* ****time start picker */}
      <DateTimePickerModal
        isVisible={showTimeStartPicker}
        mode="time"
        onConfirm={handleConfirmTimeStart}
        onCancel={handleHideTimeStartPicker}
      />
      {/* ****time stop picker */}
      <DateTimePickerModal
        isVisible={showTimeStopPicker}
        mode="time"
        onConfirm={handleConfirmTimeStop}
        onCancel={handleHideTimeStopPicker}
      />

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



// import React, { useState } from "react";
// import { Button, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// const Sleep = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.log("A date has been picked: ", date);
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <Button title="Show Date Picker" onPress={showDatePicker} />
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="time"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// export default Sleep;