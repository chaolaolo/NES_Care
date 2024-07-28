import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';

const MyWebView = ({ route }) => {
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

export default MyWebView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
})