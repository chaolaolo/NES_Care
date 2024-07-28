import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WebView = ({ route }) => {
    const { url } = route.params;
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webview}
            />
        </View>
    )
}

export default WebView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
})