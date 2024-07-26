import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Icon } from 'react-native-elements';
const Video = () => {
  const navigation = useNavigation();
  const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');

  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const seekBackAndForth = (control) => {
    console.log('currentTime');
    controlRef.current?.getCurrentTime().then((currentTime) => {
      control === 'forward'
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({ name, onPress }) => (
    // <Icon onPress={onPress} name={name} size={40} color="#fff" />
    <></>
  );

  const handleActivityChange = (section) => {
    setSelectedMusicSection(section);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PhysicalActivities')}>
          <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Pressable
          onPress={() => handleActivityChange('Meditation')}
          style={{
            flex: 1,
            // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#21CE9C',
            borderBottomWidth: SelectedMusicSection === 'Meditation' ? 1 : 0,
          }}>
          <Text style={{
            color: SelectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81',
            fontWeight: SelectedMusicSection === 'Meditation' ? 'bold' : 'normal',
            fontSize: 16
          }}>Meditation</Text>
        </Pressable>
        <Pressable
          onPress={() => handleActivityChange('Yoga')}
          style={{
            flex: 1,
            // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#21CE9C',
            borderBottomWidth: SelectedMusicSection === 'Yoga' ? 1 : 0,
          }}>
          <Text style={{
            color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
            fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
            fontSize: 16
          }}>Yoga</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        <YoutubePlayer
          height={300}
          ref={controlRef}
          play={playing}
          mute={isMute}
          videoId={'84WIaK3bl_s'}
          onChangeState={onStateChange}
        />
        <View style={styles.controlContainer}>
          <ControlIcon
            onPress={() => seekBackAndForth('rewind')}
            name="skip-previous"
          />
          <ControlIcon
            onPress={togglePlaying}
            name={playing ? 'pause' : 'play-arrow'}
          />
          <ControlIcon
            onPress={() => seekBackAndForth('forward')}
            name="skip-next"
          />
        </View>
        <ControlIcon
          onPress={muteVideo}
          name={isMute ? 'volume-up' : 'volume-off'}
        />
      </View>

    </SafeAreaView>
  )
}

export default Video

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: '#432C81',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -20
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})