// import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { DrawerActions, useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore'
// import Slider from '@react-native-community/slider';
// import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
// import { setupPlayer } from '../../Music/MusicService';

// const Music = () => {
//     const navigation = useNavigation();
//     const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
//     const [listMusic, setListMusic] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const playerState = usePlaybackState();
//     const [currentTrack, setCurrentTrack] = useState(null);
//     const [position, setPosition] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const [url_cover, setUrl_cover] = useState('');
//     const [musicArtist, setMusicArtist] = useState('');
//     const [musicName, setMusicName] = useState('');
//     const [currentTracksID, setCurrentTracksID] = useState('');

//     const handleActivityChange = (section) => {
//         setSelectedMusicSection(section);
//     };

//     useEffect(() => {
//         const fetchMusic = async () => {
//             setLoading(true);
//             try {
//                 const musicList = [];
//                 const querySnapshot = await firestore()
//                     .collection('Music')
//                     .where('category', '==', SelectedMusicSection)
//                     .get();
//                 querySnapshot.forEach(documentSnapshot => {
//                     musicList.push({
//                         ...documentSnapshot.data(),
//                         key: documentSnapshot.id,
//                     });
//                 });
//                 setListMusic(musicList);
//             } catch (error) {
//                 console.error("Error fetching music: ", error);
//             }
//             setLoading(false);
//         };

//         fetchMusic();
//     }, [SelectedMusicSection]);

//     useEffect(() => {
//         const updateTrackInfo = async () => {
//             const track = await TrackPlayer.getCurrentTrack();
//             if (track) {
//                 const trackDetails = await TrackPlayer.getTrack(track);
//                 setCurrentTrack(trackDetails);
//                 if (trackDetails) {
//                     setUrl_cover(trackDetails.artwork);
//                     setMusicName(trackDetails.title);
//                     setMusicArtist(trackDetails.artist);
//                     setCurrentTrack(trackDetails);
//                     setCurrentTracksID(trackDetails.id);
//                 }
//                 console.log('Current Track Details: ', trackDetails);
//             }
//         };

//         const updatePlaybackState = () => {
//             const update = async () => {
//                 const playbackState = await TrackPlayer.getState();
//                 if (playbackState === State.Playing) {
//                     setPosition(await TrackPlayer.getPosition());
//                     setDuration(await TrackPlayer.getDuration());
//                     // console.log('Playing Position: ', await TrackPlayer.getPosition());
//                     // console.log('Track Duration: ', await TrackPlayer.getDuration());
//                     setIsPlaying(true);
//                 } else {
//                     setIsPlaying(false);
//                 }
//             };

//             const interval = setInterval(update, 1000);
//             return () => clearInterval(interval);
//         };

//         updateTrackInfo();
//         const unsubscribe = updatePlaybackState();
//         return () => {
//             if (unsubscribe) unsubscribe();
//         };
//     }, [playerState]);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const secs = Math.floor(seconds % 60);
//         return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
//     };


//     const handlePlay = async (item) => {
//         try {
//             await setupPlayer();

//             const currentTrack = await TrackPlayer.getCurrentTrack();
//             console.log('Current Track:', currentTrack);
//             console.log('Selected Item:', item);

//             const tracks = await TrackPlayer.getQueue();
//             console.log('Queue:', tracks);

//             const state = await TrackPlayer.getState();
//             console.log('Player State:', state);

//             const isTrackInQueue = tracks.some(track => track.id === item.key);

//             if (currentTrack === null || currentTrack !== item.key) {
//                 console.log('Adding new track and playing:', item);
//                 // await TrackPlayer.reset();
//                 // await TrackPlayer.add({
//                 //     id: item.key,
//                 //     url: item.link,
//                 //     title: item.name,
//                 //     artist: item.artist,
//                 //     artwork: item.url_cover,
//                 // });
//                 if (!isTrackInQueue) {
//                     await TrackPlayer.reset();
//                     await TrackPlayer.add({
//                         id: item.key,
//                         url: item.link,
//                         title: item.name,
//                         artist: item.artist,
//                         artwork: item.url_cover,
//                     });
//                     await TrackPlayer.play();
//                 } else {
//                     await TrackPlayer.play();
//                 }
//                 // await TrackPlayer.play();
//                 setUrl_cover(item.url_cover);
//                 setMusicName(item.name);
//                 setMusicArtist(item.artist);
//                 setIsPlaying(true);
//                 setCurrentTracksID(item.key);
//                 console.log('Current Tracks ID :', item.key);
//                 console.log('Track set and playing:', item.key);

//                 setCurrentTrack({
//                     id: item.key,
//                     url: item.link,
//                     title: item.name,
//                     artist: item.artist,
//                     artwork: item.url_cover,
//                 });

//                 // if (state === State.Playing) {
//                 //     await TrackPlayer.pause();
//                 //     console.log('pausing');
//                 //     setIsPlaying(false);
//                 // } 
//                 if(state === State.Paused) {
//                     await TrackPlayer.play();
//                     console.log('playing');
//                     setIsPlaying(true);
//                 }
//             } else {
//                 // Nếu bài nhạc hiện tại là bài nhạc được chọn, chuyển đổi giữa phát và dừng
//                 if (state === State.Playing) {
//                     await TrackPlayer.pause();
//                     console.log('pausing');
//                     setIsPlaying(false);
//                 } else {
//                     await TrackPlayer.play();
//                     console.log('playing');
//                     setIsPlaying(true);
//                 } 
//             }
//         } catch (error) {
//             console.error("Error handling track play: ", error);
//         }
//     };

//     const handlePrevious = async () => {
//         const currentTrackIndex = listMusic.findIndex(music => music.key === currentTracksID);
//         console.log('Current Track Index:', currentTrackIndex);
//         if (currentTrackIndex > 0) {
//             console.log('Playing previous track:', listMusic[currentTrackIndex - 1]);
//             handlePlay(listMusic[currentTrackIndex - 1]);
//         } else {
//             console.log('No previous track');
//         }
//     };

//     const handleNext = async () => {
//         const currentTrackIndex = listMusic.findIndex(music => music.key === currentTracksID);
//         console.log('Current Track Index:', currentTrackIndex);
//         if (currentTrackIndex < listMusic.length - 1) {
//             console.log('Playing next track:', listMusic[currentTrackIndex + 1]);
//             handlePlay(listMusic[currentTrackIndex + 1]);
//         } else {
//             console.log('No next track');
//         }
//     };

//     const renderItem = ({ item }) => (
//         <TouchableOpacity onPress={() => handlePlay(item)} style={styles.itemContainer}>
//             <View>
//                 <Image
//                     source={{ uri: item.url_cover }}
//                     style={styles.itemImage} />
//             </View>
//             <View style={{ flex: 1 }}>
//                 <Text style={styles.musicName}>{item.name}</Text>
//                 <Text style={styles.musicArtist}>{item.artist}</Text>
//             </View>
//             <View>
//                 <TouchableOpacity onPress={() => handlePlay(item)}>
//                     {/* <Image style={styles.playmusic} source={playerState == State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')} /> */}
//                     {/* <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} /> */}
//                     <Image style={styles.playmusic} source={isPlaying && currentTracksID === item.key ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')} />
//                 </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     );


//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack('PhysicalActivities')}>
//                     <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Music</Text>
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
//                 <Pressable
//                     onPress={() => handleActivityChange('Meditation')}
//                     style={{
//                         flex: 1,
//                         // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
//                         paddingVertical: 5,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderColor: '#21CE9C',
//                         borderBottomWidth: SelectedMusicSection === 'Meditation' ? 1 : 0,
//                     }}>
//                     <Text style={{
//                         color: SelectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81',
//                         fontWeight: SelectedMusicSection === 'Meditation' ? 'bold' : 'normal',
//                         fontSize: 16
//                     }}>Meditation</Text>
//                 </Pressable>
//                 <Pressable
//                     onPress={() => handleActivityChange('Yoga')}
//                     style={{
//                         flex: 1,
//                         // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
//                         paddingVertical: 5,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderColor: '#21CE9C',
//                         borderBottomWidth: SelectedMusicSection === 'Yoga' ? 1 : 0,
//                     }}>
//                     <Text style={{
//                         color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
//                         fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
//                         fontSize: 16
//                     }}>Yoga</Text>
//                 </Pressable>
//             </View>
//             {loading ? (
//                 <View style={{ flex: 1, alignSelf: 'center' }}>
//                     <ActivityIndicator
//                         animating={true}
//                         size="large"
//                         color="#21CE9C"
//                         hidesWhenStopped={true} />
//                 </View>
//             ) : listMusic.length > 0 ? (
//                 <FlatList
//                     data={listMusic}
//                     renderItem={renderItem}
//                     keyExtractor={item => item.id}
//                     contentContainerStyle={styles.listContainer}
//                 />
//             )
//                 :
//                 (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
//             }


//             <View style={styles.playingContainer}>
//                 <Image style={styles.imgPlayingCover} source={{ uri: url_cover }} />
//                 <View style={{ flex: 1, marginHorizontal: 16 }}>
//                     <Text style={styles.musicName}>{musicName}</Text>
//                     <Text style={styles.musicArtist}>{musicArtist}</Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Text>{formatTime(position)}</Text>
//                         <Slider
//                             style={{ width: 200, height: 40 }}
//                             minimumValue={0}
//                             maximumValue={duration}
//                             minimumTrackTintColor="#FFFFFF"
//                             maximumTrackTintColor="#000000"
//                             value={position}
//                             onValueChange={async (value) => {
//                                 await TrackPlayer.seekTo(value);
//                             }}
//                         />
//                         <Text>{formatTime(duration)}</Text>
//                     </View>
//                     <View style={{ width: 210, marginLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <TouchableOpacity onPress={handlePrevious}>
//                             <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => handlePlay(currentTrack)}>
//                             <Image
//                                 style={{ width: 40, height: 40 }}
//                                 // source={playerState === State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')}
//                                 source={isPlaying ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')}
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handleNext}>
//                             <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>


//         </SafeAreaView >
//     )
// }

// export default Music

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 20,
//     },
//     headerTitle: {
//         fontSize: 20,
//         color: '#432C81',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         flex: 1,
//         marginLeft: -20
//     },
//     listContainer: {},
//     itemContainer: {
//         backgroundColor: 'rgba(0,0,0,0.1)',
//         flexDirection: 'row',
//         marginVertical: 5,
//         marginHorizontal: 5,
//         padding: 10,
//         alignItems: 'center'
//     },
//     itemImage: {
//         width: 60, height: 60,
//         marginRight: 10,
//         borderRadius: 10
//     },
//     musicName: {
//         color: '#432C81',
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     musicArtist: {
//         color: '#82799D',
//         fontSize: 16
//     },
//     playmusic: {
//         width: 30, height: 30,
//     },

//     playingContainer: {
//         width: '100%',
//         // backgroundColor: 'rgba(228, 249, 243, 0.4)',
//         backgroundColor: 'lightgray',
//         borderTopRightRadius: 20,
//         borderTopLeftRadius: 20,
//         paddingVertical: 20,
//         paddingHorizontal: 20,
//         position: 'absolute',
//         bottom: 0,
//         flexDirection: 'row',
//         alignItems: 'center',
//         elevation: 1

//     },
//     imgPlayingCover: {
//         width: 100, height: 100,
//         borderRadius: 14,
//         backgroundColor: 'white'
//     }
// })


// /// dựa vào log để lấy ra các thông tin sau đó tạo state tương ứng để xử ký tiếp các chức năng



import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    SafeAreaView,
    Pressable,
} from 'react-native';
import TrackPlayer, {
    useProgress,
    usePlaybackState,
    useTrackPlayerEvents,
    Event,
    State
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addTracks, setupPlayer } from '../../Music/MusicService';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';



function Playlist() {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    async function loadPlaylist() {
        const queue = await TrackPlayer.getQueue();
        setQueue(queue);
    }

    useEffect(() => {
        loadPlaylist();
    }, []);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
        if (event.state == State.nextTrack) {
            TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
        }
    });

    function PlaylistItem({ index, title, artist, url_cover, isCurrent }) {

        function handleItemPress() {
            TrackPlayer.skip(index);
        }

        return (
            //   <TouchableOpacity onPress={handleItemPress}>
            //     <Text
            //       style={{
            //         ...styles.playlistItem,
            //         ...{ backgroundColor: isCurrent ? '#666' : 'white', }
            //       }}>
            //       {title}
            //     </Text>
            //   </TouchableOpacity>

            <TouchableOpacity onPress={handleItemPress} style={[styles.itemContainer, { backgroundColor: isCurrent ? '#666' : 'white', }]}>
                <View>
                    <Image
                        source={{ uri: url_cover }}
                        style={styles.itemImage} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.musicName}>{title}</Text>
                    <Text style={styles.musicArtist}>{artist}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handleItemPress}>
                        {/* <Image style={styles.playmusic} source={playerState == State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')} /> */}
                        <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} />
                        {/* <Image style={styles.playmusic} source={isPlaying && currentTracksID === item.key ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')} /> */}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        );
    }

    async function handleShuffle() {
        let queue = await TrackPlayer.getQueue();
        await TrackPlayer.reset();
        queue.sort(() => Math.random() - 0.5);
        await TrackPlayer.add(queue);

        loadPlaylist()
    }

    return (
        <View>
            {/* <Controls  style={{position:'absolute',zIndex:10,bottom:100,height:200}} onShuffle={handleShuffle} /> */}
            <View style={styles.playlist}>
                <FlatList
                    data={queue}
                    renderItem={({ item, index }) =>
                        <PlaylistItem
                            index={index}
                            title={item.title}
                            artist={item.artist}
                            url_cover={item.artwork}
                            isCurrent={currentTrack == index} />
                    }
                />
            </View>
        </View>
    );
}

function Controls() {
    const playerState = usePlaybackState();

    async function handlePlayPress() {
        if (await TrackPlayer.getState() == State.Playing) {
            TrackPlayer.pause();
        }
        else {
            TrackPlayer.play();
        }
    }

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'red',
        }}>
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
                <Image source={require('../../image/ic_previous_music.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPress}>
                <Image source={require('../../image/ic_stop_music.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                <Image source={require('../../image/ic_next_music.png')} />
            </TouchableOpacity>
        </View>
    );
}



function TrackProgress() {
    const { position, duration } = useProgress(200);

    function format(seconds) {
        let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.trackProgress}>
                    {format(position)}
                </Text>
                <Slider
                    style={{flex:1, height: 40 }}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={position}
                    onValueChange={async (value) => {
                        await TrackPlayer.seekTo(value);
                    }}
                />
                <Text style={styles.trackProgress}>
                    {format(duration)}
                </Text>
            </View>
        </View>
    );
}


function Header() {
    const [info, setInfo] = useState({});
    useEffect(() => {
        setTrackInfo();
    }, []);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
        if (event.state == State.nextTrack) {
            setTrackInfo();
        }
    });

    async function setTrackInfo() {
        const track = await TrackPlayer.getCurrentTrack();
        const info = await TrackPlayer.getTrack(track);
        setInfo(info);
    }

    return (
        <View style={{ marginRight: 10, }}>
            <Image source={{ uri: info.artwork }} style={styles.imgPlayingCover} />
            <View>
                <Text style={styles.musicName}>{info.title}</Text>
                <Text style={styles.musicArtist}>{info.artist}</Text>
            </View>
        </View>
    );
}


function App() {

    const [play, setPlay] = useState(false);
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
    };

    useEffect(() => {
        async function setup() {
            let isSetup = await setupPlayer();
            await addTracks();
            setPlay(isSetup);
        }
        setup();
    }, []);

    if (!play) {
        return (
            <ActivityIndicator />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack('PhysicalActivities')}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Music</Text>
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

            <Playlist />

            <View style={styles.playingContainer}>
                <Header />
                <View style={{ backgroundColor: 'gray', flex: 1 }}>
                    <TrackProgress />
                    <Controls />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // padding: 20,
        backgroundColor: 'white'
    },
    playlist: {
        paddingBottom: 100
    },
    playlistItem: {
        fontSize: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
    },
    trackProgress: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 16,
        color: '#000'
    },
    // songTitle: {
    //     fontSize: 32,
    //     marginTop: 50,
    //     color: '#CA92EE'
    // },
    // artistName: {
    //     fontSize: 24,
    //     color: '#000'
    // },
    musicName: {
        color: '#432C81',
        fontSize: 18,
        fontWeight: 'bold'
    },
    musicArtist: {
        color: '#82799D',
        fontSize: 16
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


    itemContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10,
        alignItems: 'center'
    },
    itemImage: {
        width: 60, height: 60,
        marginRight: 10,
        borderRadius: 10
    },
    musicName: {
        color: '#432C81',
        fontSize: 18,
        fontWeight: 'bold'
    },
    musicArtist: {
        color: '#82799D',
        fontSize: 16
    },
    playmusic: {
        width: 30, height: 30,
    },
    playingContainer: {
        width: '100%',
        // backgroundColor: 'rgba(228, 249, 243, 0.4)',
        backgroundColor: 'lightblue',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
    },
    imgPlayingCover: {
        width: 100, height: 100,
        borderRadius: 14,
        backgroundColor: 'white'
    }
});

export default App;
