

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
                    keyExtractor={(item, index) => item.id}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.trackProgress}>
                    {format(position)}
                </Text>
                <Slider
                    style={{ flex: 1, height: 40 }}
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
        <View style={{ marginRight: 10, flexDirection: 'row', flex: 1 }}>
            <Image source={{ uri: info.artwork }} style={styles.imgPlayingCover} />
            <View style={{ marginHorizontal: 10, flex: 1 }}>
                <Text style={styles.musicName} numberOfLines={1}>{info.title}</Text>
                <Text style={styles.musicArtist}>{info.artist}</Text>
                <View>
                    <TrackProgress />
                    <Controls />
                </View>
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
            if (isSetup) {
                await addTracks();
            }
            setPlay(isSetup);
        }
        setup();
    }, []);

    // if (!play) {
    //     return (
    //         <ActivityIndicator />
    //     );
    // }

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

            {play ? (<Playlist />) : null}

            <View style={styles.playingContainer}>
                <Header />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        textAlign: 'center',
        fontSize: 16,
        color: '#000'
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
        fontWeight: 'bold',
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
        // alignItems: 'center',
        elevation: 1,
    },
    imgPlayingCover: {
        width: 100, height: 100,
        borderRadius: 14,
        backgroundColor: 'white'
    }
});

export default App;
