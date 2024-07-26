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


import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import YouTubeIframe from 'react-native-youtube-iframe';
import ModalComponent from '../../../components/Modal/ModalComponent';

const Video = () => {
  const navigation = useNavigation();
  const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snapshot = await firestore().collection('Videos').where('category', '==', SelectedMusicSection).get();
        const videosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(videosList);
      } catch (error) {
        console.error('Error fetching videos: ', error);
      }
    };
    fetchVideos();
  }, [SelectedMusicSection]);

  const handleActivityChange = (section) => {
    setSelectedMusicSection(section);
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
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

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
  }
});
