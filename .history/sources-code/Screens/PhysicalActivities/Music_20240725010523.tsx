import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { setupPlayer } from '../../Music/MusicService';

const Music = () => {
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
    const [listMusic, setListMusic] = useState([]);
    const [loading, setLoading] = useState(true);

    const playerState = usePlaybackState();
    const [currentTrack, setCurrentTrack] = useState(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [url_cover, setUrl_cover] = useState('');
    const [musicArtist, setMusicArtist] = useState('');
    const [musicName, setMusicName] = useState('');
    const [currentTracksID, setCurrentTracksID] = useState('');

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
        const updateTrackInfo = async () => {
            const track = await TrackPlayer.getCurrentTrack();
            if (track) {
                const trackDetails = await TrackPlayer.getTrack(track);
                setCurrentTrack(trackDetails);
                if (trackDetails) {
                    setUrl_cover(trackDetails.artwork);
                    setMusicName(trackDetails.title);
                    setMusicArtist(trackDetails.artist);
                    setCurrentTrack(trackDetails);
                    setCurrentTracksID(trackDetails.id);
                }
                console.log('Current Track Details: ', trackDetails);
            } else {
                // Clear the track information if no track is currently playing
                setUrl_cover('');
                setMusicName('');
                setMusicArtist('');
                setCurrentTracksID('');
            }
        };

        const updatePlaybackState = () => {
            const update = async () => {
                const playbackState = await TrackPlayer.getState();
                if (playbackState === State.Playing) {
                    setPosition(await TrackPlayer.getPosition());
                    setDuration(await TrackPlayer.getDuration());
                    // console.log('Playing Position: ', await TrackPlayer.getPosition());
                    // console.log('Track Duration: ', await TrackPlayer.getDuration());
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            };

            const interval = setInterval(update, 1000);
            return () => clearInterval(interval);
        };

        updateTrackInfo();
        const unsubscribe = updatePlaybackState();
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [playerState]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };


    const handlePlay = async (item) => {
        try {
            await setupPlayer();

            const currentTrack = await TrackPlayer.getCurrentTrack();
            console.log('Current Track:', currentTrack);
            console.log('Selected Item:', item);

            const tracks = await TrackPlayer.getQueue();
            console.log('Queue:', tracks);

            const state = await TrackPlayer.getState();
            console.log('Player State:', state);

            const isTrackInQueue = tracks.some(track => track.id === item.key);

            if (currentTrack === null || currentTrack !== item.key) {
                console.log('Adding new track and playing:', item);
                // await TrackPlayer.reset();
                // await TrackPlayer.add({
                //     id: item.key,
                //     url: item.link,
                //     title: item.name,
                //     artist: item.artist,
                //     artwork: item.url_cover,
                // });
                if (!isTrackInQueue) {
                    await TrackPlayer.reset();
                    await TrackPlayer.add({
                        id: item.key,
                        url: item.link,
                        title: item.name,
                        artist: item.artist,
                        artwork: item.url_cover,
                    });
                    await TrackPlayer.play();
                } else {
                    await TrackPlayer.play();
                }
                // await TrackPlayer.play();
                setUrl_cover(item.url_cover);
                setMusicName(item.name);
                setMusicArtist(item.artist);
                setIsPlaying(true);
                setCurrentTracksID(item.key);
                console.log('Current Tracks ID :', item.key);
                console.log('Track set and playing:', item.key);

                setCurrentTrack({
                    id: item.key,
                    url: item.link,
                    title: item.name,
                    artist: item.artist,
                    artwork: item.url_cover,
                });

                // if (state === State.Playing) {
                //     await TrackPlayer.pause();
                //     console.log('pausing');
                //     setIsPlaying(false);
                // } 
                if (state === State.Paused) {
                    await TrackPlayer.play();
                    console.log('playing');
                    setIsPlaying(true);
                }
            } else {
                // Nếu bài nhạc hiện tại là bài nhạc được chọn, chuyển đổi giữa phát và dừng
                if (state === State.Playing) {
                    await TrackPlayer.pause();
                    console.log('pausing');
                    setIsPlaying(false);
                } else {
                    await TrackPlayer.play();
                    console.log('playing');
                    setIsPlaying(true);
                }
            }

        } catch (error) {
            console.error("Error handling track play: ", error);
        }
    };

    const handlePrevious = async () => {
        const currentTrackIndex = listMusic.findIndex(music => music.key === currentTracksID);
        console.log('Current Track Index:', currentTrackIndex);
        if (currentTrackIndex > 0) {
            console.log('Playing previous track:', listMusic[currentTrackIndex - 1]);
            handlePlay(listMusic[currentTrackIndex - 1]);
        } else {
            console.log('No previous track');
        }
    };

    const handleNext = async () => {
        const currentTrackIndex = listMusic.findIndex(music => music.key === currentTracksID);
        console.log('Current Track Index:', currentTrackIndex);
        if (currentTrackIndex < listMusic.length - 1) {
            console.log('Playing next track:', listMusic[currentTrackIndex + 1]);
            handlePlay(listMusic[currentTrackIndex + 1]);
        } else {
            console.log('No next track');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePlay(item)} style={styles.itemContainer}>
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
                <TouchableOpacity onPress={() => handlePlay(item)}>
                    {/* <Image style={styles.playmusic} source={playerState == State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')} /> */}
                    {/* <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} /> */}
                    <Image style={styles.playmusic} source={isPlaying && currentTracksID === item.key ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )
                :
                (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
            }


            <View style={styles.playingContainer}>
                <Image style={styles.imgPlayingCover} source={{ uri: url_cover } || require('../../image/ic_sound.png')} />
                <View style={{ flex: 1, marginHorizontal: 16 }}>
                    <Text style={styles.musicName}>{musicName || "Unknow Name"}</Text>
                    <Text style={styles.musicArtist}>{musicArtist || "Unknow Artist"}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{formatTime(position)}</Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={duration}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            value={position}
                            onValueChange={async (value) => {
                                await TrackPlayer.seekTo(value);
                            }}
                        />
                        <Text>{formatTime(duration)}</Text>
                    </View>
                    <View style={{ width: 210, marginLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={handlePrevious}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePlay(currentTrack)}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                // source={playerState === State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')}
                                source={isPlaying ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNext}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </SafeAreaView >
    )
}

export default Music

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
    listContainer: {},
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
        backgroundColor: 'lightgray',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1

    },
    imgPlayingCover: {
        width: 100, height: 100,
        borderRadius: 14,
        backgroundColor: 'white'
    }
})


/// dựa vào log để lấy ra các thông tin sau đó tạo state tương ứng để xử ký tiếp các chức năng