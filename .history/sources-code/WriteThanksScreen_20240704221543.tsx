import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'

const WriteThanksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
           <HeaderComponent title="Sign Up" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View>
                <TextInputComponent placeholder="Username" tipStyle={{ height: 70, paddingLeft: 60,marginTop:80,backgroundColor:'white' }} />
                <Image source={require('./image/ic_pen.png')} style={styles.icPen} />
            </View>
      <Text>WriteThanksScreen</Text>
    </SafeAreaView>
  )
}

export default WriteThanksScreen

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#E4F9F3',
        // backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex:3
    },
    icPen: {
        position: 'absolute',
        marginVertical: 24,
        marginLeft: 20,
        width: 30,
        height: 30,
        zIndex:4

    },
})