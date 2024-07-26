import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
    const textInputRef = useRef(null);

    const [grateful, setGrateful] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

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

    useEffect(() => {
        if (showAddModal && textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [showAddModal]);


    //Add new
    const handleSave = () => {
        // Save logic here
        // setshowAddModal(false);
        // // Clear the input after saving
        // setGrateful('');

        if (grateful) {
            firestore()
                .collection('Thanks')
                .add({
                    content: grateful,
                    date: new Date()
                })
                .then(() => {
                    setshowAddModal(false);
                    setGrateful('');
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                });
        }
    };

    //Delete
    const handleDelete = () => {
        if (selectedItem) {
            firestore()
                .collection('Thanks')
                .doc(selectedItem.id)
                .delete()
                .then(() => {
                    setshowDelete(false);
                    setSelectedItem(null);
                })
                .catch(error => {
                    console.error("Error deleting document: ", error);
                });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => {
                    setSelectedItem(item);
                    setshowDelete(true);
                }}
                style={styles.btnDelete}>
                <Image style={{ width: 30, height: 30 }} source={require('./image/ic_delete_gratefull.png')} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.contentText} numberOfLines={5}>{item.content}</Text>
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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text onPress={() => setshowAddModal(false)} style={styles.modalCancel}>Cancel</Text>
                                <Text style={styles.modalTitle}>Write new grateful</Text>
                                <Text
                                    onPress={grateful ? handleSave : null}
                                    style={[styles.modalSave, { backgroundColor: grateful ? '#21CE9C' : 'gray' }]}>Save</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 20 }}>Username</Text>
                                <TextInput
                                    autoFocus={true}
                                    ref={textInputRef}
                                    value={grateful}
                                    onChangeText={setGrateful}
                                    placeholder="What are you grateful for?"
                                    multiline={true}
                                    style={styles.modalTextinput}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>


            {/* ***Delete Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showDelete}
                onRequestClose={() => setshowDelete(false)}
            >
                <View style={[styles.modalOverlay, { justifyContent: 'center' }]}>
                    <View style={[styles.modalContainer, { height: '20%',alignItems:'center' }]}>
                        <Text style={styles.modalTitle}>Confirm Delete</Text>
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Are you sure you want to delete this item?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => setshowDelete(false)} style={styles.modalCancel}>
                                <Text style={{ color: '#432C81', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete} style={[styles.modalSave, { backgroundColor: '#21CE9C' }]}>
                                <Text style={{ color: 'white', fontSize: 16 }}>Yes</Text>
                            </TouchableOpacity>
                        </View>
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
    },

    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        height: '90%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // marginHorizontal: 20,
        // borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: 'black',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        paddingBottom: 10,
        alignItems: 'center'
    },
    modalCancel: {
        color: '#432C81',
        fontSize: 16
    },
    modalTitle: {
        color: '#432C81',
        fontWeight: 'bold',
        fontSize: 19
    },
    modalSave: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,

    },
    modalTextinput: {
        borderBottomWidth: 0.17,
        paddingHorizontal: 24,
        borderBottomColor: 'rgba(0,0,0,0.2)'
    }
})