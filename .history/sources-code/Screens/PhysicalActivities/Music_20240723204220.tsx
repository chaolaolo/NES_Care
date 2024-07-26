import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';



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

    function PlaylistItem({ index, name, url_cover, artist, isCurrent }) {

        function handleItemPress() {
            TrackPlayer.skip(index);
        }

        return (
            <TouchableOpacity onPress={handleItemPress}>
                {/* <Text
            style={{
              ...styles.playlistItem,
              ...{ backgroundColor: isCurrent ? '#666' : 'white', }
            }}>
            {title}
          </Text> */}
                <View>
                    <Image
                        source={{ uri: url_cover }}
                        style={styles.itemImage} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.musicName}>{name}</Text>
                    <Text style={styles.musicArtist}>{artist}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => console.log('Play music')}>
                        <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} />
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
            <View style={styles.playlist}>
                {/* <FlatList
            data={queue}
            renderItem={({ item, index }) =>
              <PlaylistItem
                index={index}
                title={item.title}
                isCurrent={currentTrack == index} />
            }
          /> */}
                <FlatList
                    data={queue}
                    renderItem={({ item, index }) =>
                        <PlaylistItem
                            index={index}
                            name={item.name}
                            url_cover={item.url_cover}
                            artist={item.artist}
                            isCurrent={currentTrack == index}
                        />
                    }
                />
            </View>
            <Controls onShuffle={handleShuffle} />
        </View>
    );
}



function Controls({ onShuffle }) {
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
            flexWrap: 'wrap', alignItems: 'center'
        }}>
            <Icon.Button
                name="arrow-left"
                size={28}
                color='#000'
                backgroundColor="transparent"
                onPress={() => TrackPlayer.skipToPrevious()} />
            <Icon.Button
                name={playerState == State.Playing ? 'pause' : 'play'}
                size={28}
                color='#000'
                backgroundColor="transparent"
                onPress={handlePlayPress} />
            <Icon.Button
                name="arrow-right"
                color='#000'
                size={28}
                backgroundColor="transparent"
                onPress={() => TrackPlayer.skipToNext()} />
            <Icon.Button
                name="random"
                size={28}
                color='#000'
                backgroundColor="transparent"
                onPress={onShuffle} />
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
            <Text style={styles.trackProgress}>
                {format(position)} / {format(duration)}
            </Text>
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
        <View>
            <Text style={styles.songTitle}>{info.name}</Text>
            <Text style={styles.artistName}>{info.artist}</Text>
        </View>
    );
}

const Music = () => {
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
    const [listMusic, setListMusic] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
    };

    // useEffect(() => {
    //     const fetchMusic = async () => {
    //         setLoading(true);
    //         try {
    //             const musicList = [];
    //             const querySnapshot = await firestore()
    //                 .collection('Music')
    //                 .where('category', '==', SelectedMusicSection)
    //                 .get();
    //             querySnapshot.forEach(documentSnapshot => {
    //                 musicList.push({
    //                     ...documentSnapshot.data(),
    //                     key: documentSnapshot.id,
    //                 });
    //             });
    //             setListMusic(musicList);
    //         } catch (error) {
    //             console.error("Error fetching music: ", error);
    //         }
    //         setLoading(false);
    //     };

    //     fetchMusic();
    // }, [SelectedMusicSection]);

    // const renderItem = ({ item }) => (
    //     <View style={styles.itemContainer}>
    //         <View>
    //             <Image
    //                 source={{ uri: item.url_cover }}
    //                 style={styles.itemImage} />
    //         </View>
    //         <View style={{ flex: 1 }}>
    //             <Text style={styles.musicName}>{item.name}</Text>
    //             <Text style={styles.musicArtist}>{item.artist}</Text>
    //         </View>
    //         <View>
    //             <TouchableOpacity onPress={()=>console.log('Play music')}>
    //                 <Image style={styles.playmusic} source={require('../../image/ic_stop_music.png')} />
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );


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
                // <FlatList
                //     data={listMusic}
                //     renderItem={renderItem}
                //     keyExtractor={item => item.key}
                //     contentContainerStyle={styles.list}
                // />
                <Playlist />
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
                        <Text>0:20</Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            // maximumValue={duration}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                        // value={position}
                        // onSlidingComplete={seekTo}
                        />
                        <Text>4:20</Text>
                    </View>
                    <View style={{ width: 210, marginLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_previous_music.png')} />
                        <Image style={{ width: 40, height: 40 }} source={require('../../image/ic_playing_music.png')} />
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../image/ic_next_music.png')} />
                            <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require('../../image/ic_play_again.png')} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
        backgroundColor: 'rgba(228, 249, 243, 0.4)',
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
    },
    playlist: {
        marginTop: 40,
        marginBottom: 40
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
        fontSize: 24,
        color: '#000'
    },
    songTitle: {
        fontSize: 32,
        marginTop: 50,
        color: '#CA92EE'
    },
    artistName: {
        fontSize: 24,
        color: '#000'
    },
})
