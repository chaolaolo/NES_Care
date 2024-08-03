import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'
import ModalComponent from '../../../components/Modal/ModalComponent'
import { SearchBar } from 'react-native-screens'
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const WriteThanksScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const [listGrateful, setListGrateful] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setshowAddModal] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [showDelete, setshowDelete] = useState(false);
    const textInputRef = useRef(null);

    const [grateful, setGrateful] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [showTarget, setShowTarget] = useState(false);
    const [openTaret, setOpenTaret] = useState(false);
    const [targetValue, setTargetValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Thanks')
            .where('uid', '==', user.uid)
            .orderBy('date', 'desc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
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
                } else {
                    console.warn("Không nhận được querySnapshot");
                    setListGrateful([]);
                }
                setLoading(false);
            }, error => {
                console.error("Lỗi khi lấy tài liệu: ", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, [user.uid]);

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
                    date: new Date(),
                    uid: user.uid
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

    // Update
    const handleUpdate = () => {
        if (selectedItem && grateful) {
            firestore()
                .collection('Thanks')
                .doc(selectedItem.id)
                .update({ content: grateful })
                .then(() => {
                    setshowUpdateModal(false);
                    setGrateful('');
                    setSelectedItem(null);
                })
                .catch(error => {
                    console.error("Error updating document: ", error);
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
        <Pressable
            onLongPress={() => {
                setSelectedItem(item);
                setGrateful(item.content);
                setshowUpdateModal(true);
            }}
            style={styles.itemContainer}>
            {/* <TouchableOpacity
                onLongPress={() => {
                    setSelectedItem(item);
                    setGrateful(item.content);
                    setshowUpdateModal(true);
                }}
                style={styles.itemContent}
            > */}
            <TouchableOpacity
                onPress={() => {
                    setSelectedItem(item);
                    setshowDelete(true);
                }}
                style={styles.btnDelete}>
                <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_delete_gratefull.png')} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.contentText} numberOfLines={5}>{item.content}</Text>
            {/* </TouchableOpacity> */}
        </Pressable>
    );

    const filteredList = listGrateful.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCancelSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent style={styles.headerContainer}>
                {!isSearching ? (
                    <>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_drawer_menu.png')} />
                        </TouchableOpacity>
                        <Text style={styles.txtHeaderTitle}>Lời biết ơn</Text>
                        <TouchableOpacity onPress={() => setIsSearching(true)}>
                            <Image source={require('../../image/ic_search.png')} style={{ width: 34, height: 34, marginRight: 10, }} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.searchContainer}>
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Tìm kiếm..."
                            style={styles.searchInput}
                        />
                        <TouchableOpacity onPress={handleCancelSearch} style={styles.cancelSearchButton}>
                            <Text style={styles.cancelSearchText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </HeaderComponent>
            <Pressable
                onPress={() => setshowAddModal(true)}
                style={{ marginTop: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                <View>
                    <Text style={{
                        padding: 10,
                        borderWidth: 1,
                        marginVertical: 5,
                        marginRight: 10,
                        backgroundColor: '#F9FAFB',
                        borderRadius: 6,
                        textAlignVertical: 'center',
                        borderColor: 'rgba(34, 31, 31, 0.1)',
                        height: 70, paddingLeft: 60, fontSize: 16
                    }}
                    >
                        Hôm nay bạn biết ơn với điều gì nhỉ?
                    </Text>
                    <Image source={require('../../image/ic_pen.png')} style={styles.imgEmail} />
                </View>
                <TouchableOpacity onPress={() => setShowTarget(true)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_setting.png')} />
                </TouchableOpacity>
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
                    filteredList.length > 0 ?
                        (<FlatList
                            numColumns={2}
                            data={filteredList}
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
                                <Text onPress={() => setshowAddModal(false)} style={styles.modalCancel}>Hủy</Text>
                                <Text style={styles.modalTitle}>Viêt lời biết ơn mới</Text>
                                <Text
                                    onPress={grateful ? handleSave : null}
                                    style={[styles.modalSave, { backgroundColor: grateful ? '#21CE9C' : 'gray' }]}>Lưu</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 20 }}>{user.fullName}</Text>
                                <TextInput
                                    autoFocus={true}
                                    ref={textInputRef}
                                    value={grateful}
                                    onChangeText={setGrateful}
                                    placeholder="Hôm nay bạn biết ơn với điều gì nhỉ?"
                                    multiline={true}
                                    style={styles.modalTextinput}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* ***Update Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showUpdateModal}
                onRequestClose={() => setshowUpdateModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text onPress={() => setshowUpdateModal(false)} style={styles.modalCancel}>Hủy</Text>
                            <Text style={styles.modalTitle}>Chỉnh Sửa</Text>
                            <Text
                                onPress={grateful ? handleUpdate : null}
                                style={[styles.modalSave, { backgroundColor: grateful ? '#21CE9C' : 'gray' }]}>Lưu</Text>
                        </View>
                        {/* <Text style={[styles.modalTitle, { alignSelf: 'center', marginBottom: 40 }]}>Edit Grateful</Text> */}
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 20 }}>{user.fullName}</Text>
                            <TextInput
                                autoFocus={true}
                                value={grateful}
                                onChangeText={setGrateful}
                                placeholder="Hãy chỉnh sửa nội dung phù hợp nhất"
                                multiline={true}
                                style={styles.modalTextinput}
                            />
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 40, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setshowUpdateModal(false)} style={[styles.modalCancel, { flex: 1, alignItems: 'center', marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderColor: '#21CE9C' }]}>
                                <Text style={{ color: '#432C81', fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleUpdate} style={[styles.modalSave, { backgroundColor: '#21CE9C', flex: 1, alignItems: 'center', marginHorizontal: 10 }]}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Update</Text>
                            </TouchableOpacity> */}
                        {/* </View> */}
                    </View>
                </View>
            </Modal>

            {/* ***Delete Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showDelete}
                onRequestClose={() => setshowDelete(false)}
            >
                <View style={[styles.modalOverlay, { justifyContent: 'center' }]}>
                    <View style={[styles.modalContainer, { height: '30%', borderRadius: 20, marginHorizontal: 20 }]}>
                        <Text style={[styles.modalTitle, { alignSelf: 'center', marginBottom: 40 }]}>Xác Nhận</Text>
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Bạn có chắc chắn muốn xóa mục này không?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 40, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setshowDelete(false)} style={[styles.modalCancel, { flex: 1, alignItems: 'center', marginHorizontal: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 16, borderRadius: 10, borderColor: '#21CE9C', }]}>
                                <Text style={{ color: '#432C81', fontSize: 16, fontWeight: 'bold', }}>KHÔNG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete} style={[styles.modalSave, { backgroundColor: '#21CE9C', flex: 1, alignItems: 'center', marginHorizontal: 10, paddingVertical: 16 }]}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>CÓ, HÃY XÓA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* ***Target Modal*** */}
            <Modal
                visible={showTarget}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowTarget(false)}
            >
                <Pressable onPress={() => setShowTarget(false)} style={styles.modalOverlay} >
                    <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                            <Text onPress={() => setShowTarget(false)} style={styles.modalCancel}>Hủy</Text>
                            <Text style={styles.modalTitle}>Chỉnh Sửa</Text>
                            <Text
                                onPress={handleUpdate }
                                style={[styles.modalSave, { backgroundColor: '#21CE9C'  }]}>Lưu</Text>
                        </View>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Hãy chọn mục tiêu chuỗi ngày nhé!</Text>
                            
                        </View>
                        <DropDownPicker
                                open={openTaret}
                                value={targetValue}
                                items={items}
                                setOpen={setOpenTaret}
                                setValue={setTargetValue}
                                setItems={setItems}
                                style={{ marginTop:20 }}
                            />
                    </View>
                </Pressable>
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
        zIndex: 3,
        justifyContent: 'space-between',
        // flexDirection: 'row',
    },
    txtHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#432C81',
        textAlign: 'center',
        flex: 1,
        paddingRight: 30
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
    itemContent: {
        // flex: 1,
        // position: 'relative'
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
        fontSize: 16,
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
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: -20,
        paddingVertical: 10,
    },
    searchInput: {
        flex: 1,
        // height: 40,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#E4E4E4',
        borderWidth: 1,
    },
    cancelSearchButton: {
        marginLeft: 10,
    },
    cancelSearchText: {
        color: '#432C81',
        fontWeight: 'bold',
        fontSize: 16,
    },
})