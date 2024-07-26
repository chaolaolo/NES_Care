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

export async function addTracks(category) { 
    const currentQueue = await TrackPlayer.getQueue();
    if (currentQueue.length !== 0) {
        await TrackPlayer.reset();
    }
    const tracks = [];
    const querySnapshot = await firestore().collection('Music').where('category','==',category).get();
    // const querySnapshot = await firestore().collection('Music').get();
    querySnapshot.forEach(documentSnapshot => {
        const data = documentSnapshot.data();
        tracks.push({
            id: documentSnapshot.id,
            url: data.link,
            title: data.name,
            artist: data.artist,
            category: data.category,
            artwork: data.url_cover,
        });
    });

    await TrackPlayer.add(tracks);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    // }
}


export async function playbackService() {
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