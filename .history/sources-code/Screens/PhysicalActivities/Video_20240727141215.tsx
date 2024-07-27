// import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { DrawerActions, useNavigation } from '@react-navigation/native';

// const Video = () => {
//   const navigation = useNavigation();
//   const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');

//   const handleActivityChange = (section) => {
//     setSelectedMusicSection(section);
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate('PhysicalActivities')}>
//           <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Video</Text>
//       </View>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
//         <Pressable
//           onPress={() => handleActivityChange('Meditation')}
//           style={{
//             flex: 1,
//             // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
//             paddingVertical: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderColor: '#21CE9C',
//             borderBottomWidth: SelectedMusicSection === 'Meditation' ? 1 : 0,
//           }}>
//           <Text style={{
//             color: SelectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81',
//             fontWeight: SelectedMusicSection === 'Meditation' ? 'bold' : 'normal',
//             fontSize: 16
//           }}>Meditation</Text>
//         </Pressable>
//         <Pressable
//           onPress={() => handleActivityChange('Yoga')}
//           style={{
//             flex: 1,
//             // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
//             paddingVertical: 5,
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderColor: '#21CE9C',
//             borderBottomWidth: SelectedMusicSection === 'Yoga' ? 1 : 0,
//           }}>
//           <Text style={{
//             color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
//             fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
//             fontSize: 16
//           }}>Yoga</Text>
//         </Pressable>
//       </View>

//     </SafeAreaView>
//   )
// }

// export default Video

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: '#432C81',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//     marginLeft: -20
//   },
// })


import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, TextInput, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import YouTubeIframe from 'react-native-youtube-iframe';
import ModalComponent from '../../../components/Modal/ModalComponent';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import { RadioButton } from 'react-native-paper';

const API_KEY = 'AIzaSyAmKwqjAr-2ha3PsrErg0r0gqyfz2XpiKM';

const Video = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const prevScrollY = useRef(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [categoryChecked, setCategoryChecked] = useState('Meditation');


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snapshot = await firestore().collection('Videos').where('category', '==', SelectedMusicSection).get();
        const videosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const videosWithTitles = await Promise.all(videosList.map(async video => {
          const title = await fetchVideoTitle(video.videoId);
          return { ...video, title };
        }));
        setVideos(videosWithTitles);

      } catch (error) {
        console.error('Error fetching videos: ', error);
      }
    };
    fetchVideos();
  }, [SelectedMusicSection]);

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

  const handleActivityChange = (section) => {
    setSelectedMusicSection(section);
  };

  const fetchVideoTitle = async (videoId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
      const title = response.data.items[0].snippet.title;
      return title;
    } catch (error) {
      console.error('Error fetching video title: ', error);
      return 'Unknown Title';
    }
  };

  const filteredList = videos.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = ({ nativeEvent }) => {
    const currentScrollY = nativeEvent.contentOffset.y;
    if (currentScrollY > prevScrollY.current) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    prevScrollY.current = currentScrollY;
  };


  const renderItem = ({ item }) => (
    <View style={styles.videoItem}>
      <YouTubeIframe
        videoId={item.videoId}
        height={300}
        play={false}
        onError={e => console.log(e)}
        onChangeState={event => {
          if (event === 'ended') {
            setSelectedVideoId(null);
          }
        }}
      />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!showSearch ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('PhysicalActivities')}>
              <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Video</Text>
            <TouchableOpacity onPress={() => setShowSearch(true)}>
              <Image source={require('../../image/ic_search.png')} style={{ width: 34, height: 34, marginRight: 10, }} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={() => setShowSearch(false)} style={styles.cancelSearchButton}>
              <Text style={styles.cancelSearchText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
        <Pressable
          onPress={() => handleActivityChange('Meditation')}
          style={{
            flex: 1,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#21CE9C',
            backgroundColor: SelectedMusicSection === 'Meditation' ? 'rgba(0,0,0,0.05)' : 'white',
            borderBottomWidth: SelectedMusicSection === 'Meditation' ? 2 : 0,
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
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#21CE9C',
            backgroundColor: SelectedMusicSection === 'Yoga' ? 'rgba(0,0,0,0.05)' : 'white',
            borderBottomWidth: SelectedMusicSection === 'Yoga' ? 2 : 0,
          }}>
          <Text style={{
            color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
            fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
            fontSize: 16
          }}>Yoga</Text>
        </Pressable>
      </View>

      <View style={styles.listVideo}>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          scrollEventThrottle={1}// Sự kiện cuộn sẽ được gửi mỗi 16ms
        />
      </View>

      {
        user.uid !== "Admin" ? (
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            style={[styles.btnAddVideo, isScrollingDown ? { opacity: 0 } : { opacity: 1 }]}>
            <Text style={styles.txtAddVideo}>+</Text>
          </TouchableOpacity>
        )
          : null
      }

      {/* **** */}
      <ModalComponent
        visible={showAddModal}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowAddModal(false)}
        modalTitle='Add new video'
        onClose={() => setShowAddModal(false)}
      >
        <TextInputComponent
          placeholder="Enter youtube video id here"
          value={videoId}
          onChangeText={setVideoId} />
        <Text style={{marginHorizontal:20,color:'gray'}}>Choose category:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="Meditation"
              status={categoryChecked === 'Meditation' ? 'checked' : 'unchecked'}
              onPress={() => setCategoryChecked('Meditation')}
            />
            <Text>Meditation</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="Yoga"
              status={categoryChecked === 'Yoga' ? 'checked' : 'unchecked'}
              onPress={() => setCategoryChecked('Yoga')}
            />
            <Text>Yoga</Text>
          </View>
        </View>
      </ModalComponent>
      {/* **** */}

    </SafeAreaView>
  );
}

export default Video;

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: -20,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    // height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  cancelSearchButton: {
    marginLeft: 10,
  },
  cancelSearchText: {
    color: '#432C81',
    fontWeight: 'bold',
    fontSize: 16,
  },


  listVideo: {
    flex: 1,
    backgroundColor: 'white'
  },
  videoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  videoTitle: {
    fontSize: 16,
    color: '#000',
    marginTop: -50,
    marginBottom: 20
  },
  btnAddVideo: {
    backgroundColor: '#21CE9C', width: 60, height: 60,
    position: 'absolute', bottom: 10, right: 10,
    elevation: 4, shadowColor: 'green',
    shadowOffset: { width: -5, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtAddVideo: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
  }
});
