import { FlatList, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'
import ModalComponent from '../components/Modal/ModalComponent'

const WriteThanksScreen = () => {
    const [listGrateful, setListGrateful] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setshowAddModal] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [showDelete, setshowDelete] = useState(false);

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
                <Image style={{ width: 30, height: 30 }} source={require('./image/ic_delete_gratefull.png')} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.contentText} numberOfLines={2}>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Write Grateful" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>
            <Pressable
                onPress={() => setshowAddModal(true)}
                style={{ marginTop: 80 }}>
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
            </Pressable>
            <View style={styles.listContainer}>
                {loading ? (
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="#432C81"
                            hidesWhenStopped={true} />
                    </View>
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

            {/* ***Add Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showAddModal}
                onRequestClose={() => setshowAddModal(false)}
            >
                <View style={{backgroundColor:'red',height:'90%',alignSelf:'flex-end'}}>
                    <View>

                    </View>
                </View>
            </Modal>


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
        color: '#432C81'
    },
    contentText: {
        color: '#7B6BA8'
    },
    btnDelete: {
        position: 'absolute',
        right: 0,
        margin: 2
    }
})