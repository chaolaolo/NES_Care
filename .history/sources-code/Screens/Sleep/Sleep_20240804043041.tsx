import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BlockComponent from '../../../components/Block/BlockComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { FlatList } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { setUser } from '../../redux/Reducers/userReducer'

const Sleep = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [listHistory, setListHistory] = useState([]);
  const [showTimeSleep, setShowTimeSleep] = useState(false);
  const [timeSleeptarget, setTimeSleeptarget] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeStop, setTimeStop] = useState('');
  const [checkAlarm, setCheckAlarm] = useState(false);

  const [fetchTimeSleeptarget, setFetchTimeSleeptarget] = useState('');
  const [fetchTimeStart, setFetchTimeStart] = useState('');
  const [fetchTimeStop, setFetchTimeStop] = useState('');
  const [fetchCheckAlarm, setFetchCheckAlarm] = useState(false);

  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeStopPicker, setShowTimeStopPicker] = useState(false);


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          dispatch(setUser(userData));
        } else {
          console.log('User does not exist.');
        }
      }, error => {
        console.log('Error fetching user data: ', error);
      });

    return () => unsubscribe();
  }, [user.uid, dispatch]);


  const fetchAllSleepSetup = async () => {
    try {
      const snapshot = await firestore()
        .collection('Sleeps')
        .where('uid', '==', user.uid)
        .orderBy('timeeStamp', 'desc')
        .get();

      const sleepData = snapshot.docs.map(doc => doc.data());

      if (sleepData.length > 0) {
        setListHistory(sleepData);
      } else {
        setListHistory([]);
      }
    } catch (error) {
      console.error("Error fetching latest sleep setting: ", error);
    }
  };
  useEffect(() => {
    fetchAllSleepSetup();
  }, []);


  const fetchLatestSleepSetting = async () => {
    try {
      const snapshot = await firestore()
        .collection('Sleeps')
        .where('uid', '==', user.uid)
        .orderBy('timeeStamp', 'desc')
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const latestDoc = snapshot.docs[0].data();
        setFetchTimeStart(latestDoc.timeStart || '');
        setFetchTimeStop(latestDoc.timeStop || '');
        setFetchTimeSleeptarget(latestDoc.timeSleeptarget || 0);
        // setCheckAlarm(latestDoc.checkAlarm || false);
      } else {
        // Set default values if no document is found
        setFetchTimeStart('');
        setFetchTimeStop('');
        setFetchTimeSleeptarget('');
        // setCheckAlarm(false);
      }
    } catch (error) {
      console.error("Error fetching latest sleep setting: ", error);
    }
  };




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


  //save target
  const saveSleepSettings = async () => {
    firestore()
      .collection('Sleeps')
      .add({
        timeStart: timeStart,
        timeStop: timeStop,
        checkAlarm: checkAlarm ? true : false,
        timeSleeptarget: timeSleeptarget,
        timeeStamp: new Date(),
        uid: user.uid
      })
      .then(() => {
        Alert.alert("Thành công", "Thiết lập thành công.")
        setShowTimeSleep(false);
        setTimeSleeptarget('')
        setTimeStop('')
        setTimeStart('')
        setCheckAlarm(false)
        fetchAllSleepSetup();
      })
      .catch(error => {
        Alert.alert("Thất bại", "Thiết lập thất bại.")
        console.error("Error adding document: ", error);
      });
  };


  const renderItem = ({ item }) => {
    return (
      // <View style={styles.sleepItem}>
      <View style={{
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 6,
        borderColor: 'rgba(34, 31, 31, 0.1)',
      }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ fontSize: 18, }}>Mục tiêu: </Text>
            <Text style={{ color: '#5198FF', fontSize: 18, }}>{item.timeSleeptarget} giờ</Text>
          </View>
          <Text style={styles.sleepText}>Báo thức: {item.checkAlarm ? 'Có' : 'Không'}</Text>
        </View>
       <View>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text>Giờ đi ngủ</Text>
            <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>{item.timeStart}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text>Giờ thức dậy</Text>
            <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>{item.timeStop}</Text>
          </View>
        </View>
       </View>
      </View>
      // </View>
    );
  };


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
          onPress={() => { setShowTimeSleep(true), fetchLatestSleepSetting() }}
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
              <Text onPress={() => {
                setShowTimeSleep(false)
                setTimeSleeptarget('')
                setTimeStop('')
                setTimeStart('')
                setCheckAlarm(false)
              }} style={styles.modalCancel}>Hủy</Text>
              <Text style={styles.modalTitle}>Thiết lập giờ ngủ</Text>
              <Text
                onPress={saveSleepSettings}
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
                  value={checkAlarm}
                  onValueChange={setCheckAlarm} />
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
                  <Text style={{ color: '#5198FF', fontSize: 18, }}>{fetchTimeSleeptarget} giờ</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text>Giờ đi ngủ</Text>
                    <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>{fetchTimeStart}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../image/ic_lock.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text>Giờ thức dậy</Text>
                    <Text style={{ color: 'rgba(67, 44, 129, 0.8)', fontSize: 16 }}>{fetchTimeStop}</Text>
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

