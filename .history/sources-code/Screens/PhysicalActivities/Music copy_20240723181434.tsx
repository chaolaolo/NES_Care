

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
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

  function PlaylistItem({ index, title, isCurrent }) {

    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <Text
          style={{
            ...styles.playlistItem,
            ...{ backgroundColor: isCurrent ? '#666' : 'white', }
          }}>
          {title}
        </Text>
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
        <FlatList
          data={queue}
          renderItem={({ item, index }) =>
            <PlaylistItem
              index={index}
              title={item.title}
              isCurrent={currentTrack == index} />
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


function App() {

  const [play, setPlay] = useState(false);

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
    <View style={styles.container}>
      <Header />
      <TrackProgress />
      <Playlist />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFEE'
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
});

export default App;




// *******************************************************//
// *******************************************************//
// *******************************************************//

import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from "react-native-track-player";
import firestore from '@react-native-firebase/firestore';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,// dừng chạy nhạc và loại bỏ notify
                // AppKilledPlaybackBehavior.ContinuePlayback, // tiếp tục chạy đến hết bài nhạc.

            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
        isSetup = true;
    }
    finally {
        return isSetup;
    }

}

export async function addTracks() {
    // await TrackPlayer.add([
    //     {
    //         id: '1',
    //         url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
    //         title: 'Password Infinity',
    //         artist: 'zezo.dev',
    //     },
    //     {
    //         id: '2',
    //         url: 'https://www.w3schools.com/tags/horse.mp3',
    //         title: 'horse 1',
    //         artist: 'zezo.dev',
    //     },
    //     {
    //         id: '3',
    //         url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    //         title: 'horse 2',
    //         artist: 'zezo.dev',
    //     },
    //     {
    //         id: '4',
    //         url: 'https://sample-music.netlify.app/death%20bed.mp3',
    //         title: 'Make a cup of coffe 1',
    //         artist: 'Powfu',
    //       }, 

    // ]);
    // await TrackPlayer.setRepeatMode(RepeatMode.Queue);

    const tracks = [];
    const querySnapshot = await firestore().collection('Music').get();
    querySnapshot.forEach(documentSnapshot => {
        const data = documentSnapshot.data();
        tracks.push({
            id: documentSnapshot.id,
            link: data.link,
            name: data.name,
            artist: data.artist,
            category: data.category,
            url_cover: data.url_cover,
        });
    });

    await TrackPlayer.add(tracks);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);

}


export async function playbackService() {
    // Các điều khiển dưới đây khai báo xong bạn có thể điều khiển ở phần notify trên điện thoại
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        console.log('Event.RemoteNext');
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        console.log('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
    });
}