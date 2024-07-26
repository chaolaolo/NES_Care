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
    
    await TrackPlayer.reset(); 
    const tracks = [];
    const querySnapshot = await firestore().collection('Music').get();
    querySnapshot.forEach(documentSnapshot => {
        const data = documentSnapshot.data();
        tracks.push({
            id: documentSnapshot.key,
            url: data.link,
            title: data.name,
            artist: data.artist,
            category: data.category,
            artwork: data.url_cover,
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