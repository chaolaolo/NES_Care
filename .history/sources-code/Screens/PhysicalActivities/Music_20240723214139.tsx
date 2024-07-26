// import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { DrawerActions, useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore'
// import Slider from '@react-native-community/slider';

// const Music = () => {
//     const navigation = useNavigation();
//     const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
//     const [listMusic, setListMusic] = useState([]);
//     const [loading, setLoading] = useState(true);

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

//     const renderItem = ({ item }) => (
//         <View style={styles.itemContainer}>
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
//                 <TouchableOpacity onPress={()=>console.log('Play music')}>
//                     <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} />
//                 </TouchableOpacity>
//             </View>
//         </View>
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
//                     keyExtractor={item => item.key}
//                     contentContainerStyle={styles.list}
//                 />
//             )
//                 :
//                 (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
//             }

//             <View style={styles.playingContainer}>
//                 <Image style={styles.imgPlayingCover} source={require('../../image/imgSplash.png')} />
//                 <View style={{ flex: 1, marginHorizontal: 16 }}>
//                     <Text style={styles.musicName}>Song Name</Text>
//                     <Text style={styles.musicArtist}>artist</Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Text>0:20</Text>
//                         <Slider
//                             style={{ width: 200, height: 40 }}
//                             minimumValue={0}
//                             // maximumValue={duration}
//                             minimumTrackTintColor="#FFFFFF"
//                             maximumTrackTintColor="#000000"
//                         // value={position}
//                         // onSlidingComplete={seekTo}
//                         />
//                         <Text>4:20</Text>
//                     </View>
//                     <View style={{ width: 210, marginLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
//                         <Image style={{ width: 40, height: 40 }} source={require('../../image/ic_playing_music.png')} />
//                         <View style={{ flexDirection: 'row' }}>
//                             <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
//                             <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require('../../image/ic_play_again.png')} />
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
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
//         backgroundColor: 'rgba(228, 249, 243, 0.4)',
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
//         backgroundColor:'white'
//     }
// })
 

import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { addTracks, setupPlayer,playbackService } from '../../Music/MusicService';


const Music = () => {
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
    const [listMusic, setListMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const playbackState = usePlaybackState();
    const progress = useProgress();

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
    };

    useEffect(() => {
        const fetchMusic = async () => {
            setLoading(true);
            try {
                const musicList = [];
                const querySnapshot = await firestore()
                    .collection('Music')
                    .where('category', '==', SelectedMusicSection)
                    .get();
                querySnapshot.forEach(documentSnapshot => {
                    musicList.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setListMusic(musicList);
            } catch (error) {
                console.error("Error fetching music: ", error);
            }
            setLoading(false);
        };

        fetchMusic();
    }, [SelectedMusicSection]);

    useEffect(() => {
        const initPlayer = async () => {
            const isSetup = await setupPlayer();
            if (isSetup) {
                await addTracks();
            }
        };

        initPlayer();
        return () => {
            TrackPlayer.destroy();
        };
    }, []);

    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            if (playbackState === State.Paused || playbackState === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View>
                <Image
                    source={{ uri: item.url_cover }}
                    style={styles.itemImage} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.musicName}>{item.name}</Text>
                <Text style={styles.musicArtist}>{item.artist}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => TrackPlayer.skip(item.key)}>
                    <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );

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
            {loading ? (
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color="#21CE9C"
                        hidesWhenStopped={true} />
                </View>
            ) : listMusic.length > 0 ? (
                <FlatList
                    data={listMusic}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    contentContainerStyle={styles.list}
                />
            )
                :
                (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
            }

            <View style={styles.playingContainer}>
                <Image style={styles.imgPlayingCover} source={require('../../image/imgSplash.png')} />
                <View style={{ flex: 1, marginHorizontal: 16 }}>
                    <Text style={styles.musicName}>Song Name</Text>
                    <Text style={styles.musicArtist}>artist</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{Math.floor(progress.position / 60)}:{Math.floor(progress.position % 60)}</Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            value={progress.position}
                            onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
                        />
                        <Text>{Math.floor(progress.duration / 60)}:{Math.floor(progress.duration % 60)}</Text>
                    </View>
                    <View style={{ width: 210, marginLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={async () => await TrackPlayer.skipToPrevious()}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={togglePlayback}>
                            <Image style={{ width: 40, height: 40 }} source={
                                playbackState === State.Playing ? require('../../image/ic_pause_music.png') : require('../../image/ic_play_music.png')
                            } />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => await TrackPlayer.skipToNext()}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    headerTitle: {
        color: '#432C81',
        fontSize: 25,
        fontWeight: '600',
        marginLeft: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    musicName: {
        color: '#432C81',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 3,
    },
    musicArtist: {
        fontSize: 12,
        color: '#746E93',
    },
    playmusic: {
        width: 20,
        height: 20,
    },
    playingContainer: {
        height: 90,
        backgroundColor: '#21CE9C',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    imgPlayingCover: {
        width: 70,
        height: 70,
        borderRadius: 4,
    }
});

export default Music;