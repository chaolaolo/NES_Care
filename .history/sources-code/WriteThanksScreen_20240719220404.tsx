import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'

const WriteThanksScreen = () => {
    const [listGrateful, setListGrateful] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Thanks')
            .orderBy('date', 'desc')
            .onSnapshot(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const { date, content } = doc.data();
                    list.push({
                        id: doc.id,
                        date: date.toDate().toDateString(),
                        content,
                    });
                });
                setListGrateful(list);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.btnDelete}>
                <Image style={{width:30,height:30}} source={require('./image/ic_delete_gratefull.png')}/>
            </TouchableOpacity>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.contentText} numberOfLines={2}>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Write Thanks" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <View style={{ marginTop: 80 }}>
                <Text style={{
                    padding: 10,
                    borderWidth: 1,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    backgroundColor: '#F9FAFB',
                    borderRadius: 6,
                    textAlignVertical: 'center',
                    borderColor: 'rgba(34, 31, 31, 0.1)',
                    height: 70, paddingLeft: 60, fontSize: 18
                }}
                >
                    What are you grateful for today?
                </Text>
                <Image source={require('./image/ic_pen.png')} style={styles.imgEmail} />
            </View>
            <View style={styles.listContainer}>
                {loading ? (
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color="blue"
                        hidesWhenStopped={true} />
                    // <Text style={styles.loadingText}>Loading...</Text>
                ) :
                    listGrateful.length > 0 ?
                        (<FlatList
                            numColumns={2}
                            data={listGrateful}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />)
                        :
                        (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
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
        padding: 5,
        marginTop: 10
    },
    itemContainer: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginVertical: 5,
        width: '47%',
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowColor: 'black'
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 16,
        color:'#432C81'
    },
    btnDelete:{
        position:'absolute',
        right:0,
        margin:2
    }
})