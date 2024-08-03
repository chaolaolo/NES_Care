import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import TextInputComponent from '../../../components/TextInput/TextInputComponent';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const WriteThanksScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const [listGrateful, setListGrateful] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const textInputRef = useRef(null);

    const [grateful, setGrateful] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [showTarget, setShowTarget] = useState(false);
    const [openTarget, setOpenTarget] = useState(false);
    const [targetValue, setTargetValue] = useState(null);
    const [items, setItems] = useState([
        { label: '21 ngày', value: '21 ngày' },
        { label: '66 ngày', value: '66 ngày' },
        { label: '90 ngày', value: '90 ngày' }
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

    const handleSave = () => {
        if (grateful) {
            firestore()
                .collection('Thanks')
                .add({
                    content: grateful,
                    date: new Date(),
                    uid: user.uid
                })
                .then(() => {
                    setShowAddModal(false);
                    setGrateful('');
                })
                .catch(error => {
                    console.error("Error adding document: ", error);
                });
        }
    };

    const handleUpdate = () => {
        if (selectedItem && grateful) {
            firestore()
                .collection('Thanks')
                .doc(selectedItem.id)
                .update({ content: grateful })
                .then(() => {
                    setShowUpdateModal(false);
                    setGrateful('');
                    setSelectedItem(null);
                })
                .catch(error => {
                    console.error("Error updating document: ", error);
                });
        }
    };

    const handleDelete = () => {
        if (selectedItem) {
            firestore()
                .collection('Thanks')
                .doc(selectedItem.id)
                .delete()
                .then(() => {
                    setShowDelete(false);
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
                setShowUpdateModal(true);
            }}
            style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => {
                    setSelectedItem(item);
                    setShowDelete(true);
                }}
                style={styles.btnDelete}>
                <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_delete_gratefull.png')} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.contentText} numberOfLines={5}>{item.content}</Text>
        </Pressable>
    );

    const filteredList = listGrateful.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCancelSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
    }

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        setIsSearching(true);
    }, []);

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
                            onChangeText={handleSearch}
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
                onPress={() => setShowAddModal(true)}
                style={{ marginTop: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                <View>
                    <Text style={styles.promptText}>
                        Hôm nay bạn biết ơn với điều gì nhỉ?
                    </Text>
                    <Image source={require('../../image/ic_pen.png')} style={styles.imgPen} />
                </View>
                <TouchableOpacity onPress={() => setShowTarget(true)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_setting.png')} />
                </TouchableOpacity>
            </Pressable>
            <View style={styles.listContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="#432C81"
                            hidesWhenStopped={true} />
                    </View>
                ) : filteredList.length > 0 ? (
                    <FlatList
                        numColumns={2}
                        data={filteredList}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={styles.emptyText}>This page is empty</Text>
                )}
            </View>

            {/* ***Add Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showAddModal}
                onRequestClose={() => setShowAddModal(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text onPress={() => setShowAddModal(false)} style={styles.modalCancel}>Hủy</Text>
                                <Text style={styles.modalTitle}>Viết lời biết ơn mới</Text>
                                <Text
                                    onPress={grateful ? handleSave : null}
                                    style={[styles.modalSave, { backgroundColor: grateful ? '#21CE9C' : 'gray' }]}>Lưu</Text>
                            </View>
                            <View style={styles.modalContent}>
                                <Text style={styles.userName}>{user.fullName}</Text>
                                <TextInput
                                    autoFocus={true}
                                    ref={textInputRef}
                                    value={grateful}
                                    onChangeText={setGrateful}
                                    placeholder="Hôm nay bạn biết ơn với điều gì nhỉ?"
                                    multiline={true}
                                    style={styles.modalTextInput}
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
                onRequestClose={() => setShowUpdateModal(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalOverlay}
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text onPress={() => setShowUpdateModal(false)} style={styles.modalCancel}>Hủy</Text>
                                <Text style={styles.modalTitle}>Chỉnh sửa lời biết ơn</Text>
                                <Text
                                    onPress={grateful ? handleUpdate : null}
                                    style={[styles.modalSave, { backgroundColor: grateful ? '#21CE9C' : 'gray' }]}>Lưu</Text>
                            </View>
                            <View style={styles.modalContent}>
                                <Text style={styles.userName}>{user.fullName}</Text>
                                <TextInput
                                    autoFocus={true}
                                    ref={textInputRef}
                                    value={grateful}
                                    onChangeText={setGrateful}
                                    placeholder="Hôm nay bạn biết ơn với điều gì nhỉ?"
                                    multiline={true}
                                    style={styles.modalTextInput}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* ***Delete Modal*** */}
            <Modal
                transparent={true}
                visible={showDelete}
                onRequestClose={() => setShowDelete(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.deleteContainer}>
                        <Text style={styles.deleteText}>Bạn có chắc muốn xóa lời biết ơn này không?</Text>
                        <View style={styles.deleteButtonsContainer}>
                            <TouchableOpacity
                                onPress={() => setShowDelete(false)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>Không</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>Có</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ***Target Modal*** */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={showTarget}
                onRequestClose={() => setShowTarget(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.targetContainer}>
                        <View style={styles.modalHeader}>
                            <Text onPress={() => setShowTarget(false)} style={styles.modalCancel}>Hủy</Text>
                            <Text style={styles.modalTitle}>Chọn số ngày thách thức</Text>
                        </View>
                        <DropDownPicker
                            open={openTarget}
                            value={targetValue}
                            items={items}
                            setOpen={setOpenTarget}
                            setValue={setTargetValue}
                            setItems={setItems}
                            style={styles.dropdownPicker}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default WriteThanksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EAE3',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#432C81',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    txtHeaderTitle: {
        color: '#fff',
        fontSize: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 20,
        paddingLeft: 10,
        flex: 1,
    },
    cancelSearchButton: {
        marginLeft: 10,
    },
    cancelSearchText: {
        color: '#fff',
    },
    promptText: {
        color: '#432C81',
        fontSize: 20,
    },
    imgPen: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    listContainer: {
        flex: 1,
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flex: 1,
    },
    btnDelete: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    dateText: {
        color: '#888',
    },
    contentText: {
        marginTop: 10,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalCancel: {
        color: '#888',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalSave: {
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    modalContent: {
        marginTop: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTextInput: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    deleteContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    deleteText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    deleteButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    deleteButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#432C81',
    },
    deleteButtonText: {
        color: '#fff',
    },
    targetContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    dropdownPicker: {
        zIndex: 1000,
    },
});
