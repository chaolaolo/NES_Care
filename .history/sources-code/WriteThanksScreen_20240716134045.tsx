import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'

const WriteThanksScreen = () => {
    const [listGrateful, setListGrateful] = useState([]);
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Write Thanks" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View style={{ marginTop: 80 }}>
                <TextInputComponent placeholder="What are you grateful for today?" tipStyle={{ height: 70, paddingLeft: 60, fontSize: 18 }} />
                <Image source={require('./image/ic_pen.png')} style={styles.imgEmail} />
            </View>
            <View style={styles.listContainer}>
                {listGrateful.length > 0 ?
                    // <FlatList
                    //     numColumns={2}
                    //     data={listGrateful}
                    //     keyExtractor={item => item.id}
                    //     renderItem={renderItem}
                    // />
                    <Text>This page is 12312327584akshj</Text>
                    :
                    <Text style={{alignSelf:'center',textAlignVertical:'center',flex:1,fontSize:20}}>This page is empty</Text>

            }

            </View>
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
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 3
    },
    imgEmail: {
        position: 'absolute',
        marginVertical: 24,
        marginLeft: 20,
        width: 30,
        height: 30

    },
    listContainer: {
        backgroundColor: '#EDECF4',
        flex: 1,
        marginHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        marginTop: 10
    }
})