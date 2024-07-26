

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
    TextInput,
} from 'react-native';
import TrackPlayer, {
    useProgress,
    useTrackPlayerEvents,
    Event,
    State
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addTracks, setupPlayer } from '../../Music/MusicService';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { MusicProvider, useMusicContext } from './MusicContext';



function Playlist({ category }) {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useMusicContext();


    async function loadPlaylist() {
        console.log('Loading playlist for category:', category);
        await TrackPlayer.reset();  // Reset hàng đợi trước khi tải playlist mới
        await addTracks(category);
        const queue = await TrackPlayer.getQueue();
        console.log('Queue:', queue);
        setQueue(queue);
    }

    useEffect(() => {
        loadPlaylist();
        console.log('Category changed:', category);
    }, [category]);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
        if (event.state == State.nextTrack) {
            TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
        }
    });

    function PlaylistItem({ index, title, artist, url_cover, isCurrent }) {

        async function handleItemPress() {
            const currentTrackIndex = await TrackPlayer.getCurrentTrack();
            if (currentTrackIndex === index && await TrackPlayer.getState() === State.Playing && currentTrack === index) {
                await TrackPlayer.pause();
                setIsPlaying(false);
            } else {
                await TrackPlayer.skip(index);
                await TrackPlayer.play();
                setIsPlaying(true);
            }
        }

        return (
            <TouchableOpacity onPress={handleItemPress} style={[styles.itemContainer, { backgroundColor: isCurrent ? 'lightgray' : 'white', }]}>
                <View>
                    <Image
                        source={url_cover ? { uri: url_cover } : require('../../image/ic_sound.png')}
                        style={styles.itemImage} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.musicName}>{title}</Text>
                    <Text style={styles.musicArtist}>{artist}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handleItemPress}>
                        {/* <Image style={styles.playmusic} source={playerState == State.Playing ? require('../../image/ic_stop_music.png') : require('../../image/ic_playing_music.png')} /> */}
                        {/* <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} /> */}
                        <Image style={styles.playmusic} source={isPlaying && currentTrack === index ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        );
    }

    // async function handleShuffle() {
    //     let queue = await TrackPlayer.getQueue();
    //     await TrackPlayer.reset();
    //     queue.sort(() => Math.random() - 0.5);
    //     await TrackPlayer.add(queue);

    //     loadPlaylist()
    // }

    return (
        <View>
            {/* <Controls  style={{position:'absolute',zIndex:10,bottom:100,height:200}} onShuffle={handleShuffle} /> */}
            <View style={styles.playlist}>
                <FlatList
                    data={queue}
                    keyExtractor={(item) => item.id.toString()}
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
    const [isPlaying, setIsPlaying] = useMusicContext();

    async function handlePlayPress() {
        if (await TrackPlayer.getState() == State.Playing) {
            TrackPlayer.pause();
            setIsPlaying(false);
        }
        else {
            TrackPlayer.play();
            setIsPlaying(true);
        }
    }

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 20
        }}>
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
                <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPress}>
                <Image style={{ width: 40, height: 40 }} source={isPlaying ? require('../../image/ic_playing_music.png') : require('../../image/ic_stop_music.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
                <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
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
                    {format(position || 0)}
                </Text>
                <Slider
                    style={{ flex: 1, height: 40 }}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={position || 0}
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
        if (track != null) {
            const info = await TrackPlayer.getTrack(track);
            setInfo(info);
        } else {
            setInfo({ title: 'Unknown', artist: 'Unknown', artwork: 'https://pngimg.com/d/music_notes_PNG37.png' });
        }
    }

    return (
        <View style={{ marginRight: 10, flexDirection: 'row', flex: 1 }}>
            <Image source={info.artwork !== null ? { uri: info.artwork } : require('../../image/ic_sound.png')} style={styles.imgPlayingCover} />
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
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
    };

    useEffect(() => {
        async function setup() {
            console.log('SelectedMusicSection:', SelectedMusicSection);
            let isSetup = await setupPlayer();
            if (isSetup) {
                await TrackPlayer.reset();
                await addTracks(SelectedMusicSection);
            }
            setPlay(isSetup);
        }
        setup();
    }, [SelectedMusicSection]);

    return (
        <MusicProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    {!showSearch ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.goBack('PhysicalActivities')}>
                                <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Music</Text>
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

                {play ? (<Playlist category={SelectedMusicSection} />)
                    :
                    (
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <ActivityIndicator
                                animating={true}
                                size="large"
                                color="#21CE9C"
                                hidesWhenStopped={true} />
                        </View>
                    )}

                <View style={styles.playingContainer}>
                    <Header />
                </View>
            </SafeAreaView>
        </MusicProvider>
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
