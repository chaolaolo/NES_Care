import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <MusicContext.Provider value={[isPlaying, setIsPlaying]}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusicContext = () => useContext(MusicContext);

const styles = StyleSheet.create({})