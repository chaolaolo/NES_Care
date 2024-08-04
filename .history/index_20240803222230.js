/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './sources-code/Screens/AppRun';
import { name as appName } from './app.json';

import TrackPlayer from 'react-native-track-player';
import { playbackService } from './sources-code/Music/MusicService';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService)
