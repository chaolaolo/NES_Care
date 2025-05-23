import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { setUser } from '../../redux/Reducers/userReducer';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import ModalComponent from '../../../components/Modal/ModalComponent';
import { Modal } from 'react-native';

const Counselor = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [listPerson, setListPerson] = useState([]);

    const [consultingField, setConsultingField] = useState('');
    const [listField, setListField] = useState([]);
    const [showConsultingFieldModal, setShowConsultingFieldModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const userData = documentSnapshot.data();
                    dispatch(setUser(userData));
                } else {
                    console.log('User does not exist.');
                }
            }, error => {
                console.log('Error fetching user data: ', error);
            });

        return () => unsubscribe();
    }, [user.uid, dispatch]);

    useEffect(() => {
        // if (user.role) {
        //     const roleToFetch = user.role === 'Expert' ? 'User' : 'Expert';
        //     const unsubscribeList = firestore()
        //         .collection('Users')
        //         .where('role', '==', roleToFetch)
        //         .onSnapshot(querySnapshot => {
        //             const list = [];
        //             querySnapshot.forEach(documentSnapshot => {
        //                 list.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        //             });
        //             setListPerson(list);
        //         }, error => {
        //             console.log('Error fetching list of users: ', error);
        //         });

        //     return () => unsubscribeList();
        // }
        setLoading(true);

        const fetchUsers = async () => {
            if (user.role === 'Expert') {
                try {
                    const messagesSnapshot = await firestore()
                        .collection('Messages')
                        .where('receiver', '==', user.uid)
                        .get();

                    const userIds = messagesSnapshot.docs.map(doc => doc.data().sender);
                    const uniqueUserIds = [...new Set(userIds)];
                    
                    const usersPromises = uniqueUserIds.map(uid => 
                        firestore().collection('Users').doc(uid).get()
                    );

                    const usersSnapshots = await Promise.all(usersPromises);
                    const users = usersSnapshots.map(doc => ({ ...doc.data(), id: doc.id }));
                    setListPerson(users);
                    setLoading(false);

                } catch (error) {
                    setLoading(false);
                    console.error('Error fetching users for Expert:', error);
                }
            } else {
                setLoading(false);
                const roleToFetch = user.role === 'Expert' ? 'User' : 'Expert';
                const unsubscribeList = firestore()
                    .collection('Users')
                    .where('role', '==', roleToFetch)
                    .onSnapshot(querySnapshot => {
                        const list = [];
                        querySnapshot.forEach(documentSnapshot => {
                            list.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
                        });
                        setListPerson(list);
                    }, error => {
                        console.log('Error fetching list of users: ', error);
                    });

                return () => unsubscribeList();
            }
        };

        fetchUsers();
    }, [user.role]);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const snapshot = await firestore().collection('ConsultingField').get();
                const fields = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                fields.sort((a, b) => a.field.localeCompare(b.field));
                setListField(fields);
            } catch (error) {
                console.error('Error fetching consulting fields: ', error);
            }
        };

        fetchFields();
    }, []);

    const handleFieldSelect = async (field) => {
        setConsultingField(field.field);
        setShowConsultingFieldModal(false);
        let snapshot;
        try {
            if (field.field === 'All') {
                snapshot = await firestore()
                    .collection('Users')
                    .where('role', '==', 'Expert')
                    .get();
            } else {
                snapshot = await firestore()
                    .collection('Users')
                    .where('consultingField', '==', field.field)
                    .get();

            }
            const experts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setListPerson(experts);
        } catch (error) {
            console.error('Error fetching experts: ', error);
        }
    };

    const renderItem = ({ item }) => {
        const chatId = [user.uid, item.uid].sort().join('_');
        // const chatId = user.uid;
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() =>
                navigation.navigate('ChatScreen', {
                    fullName: item.fullName,
                    avatar: item.avatar,
                    uid: item.uid,
                    chatId: chatId
                })}>
                <Image style={styles.avatar} source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={styles.name}>{item.role==="Expert"?"Chuyên gia":"Người cần tư vấn"}</Text>
                    {item.consultingField ? (
                        <>
                            <Text style={{ marginLeft: 16 }}>(Chuyên gia: {item.consultingField})</Text>
                        </>
                    ) : null
                    }
                </View>
            </TouchableOpacity>
        );
    }

    const renderListField = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleFieldSelect(item)}>
                <View style={styles.fieldItem}>
                    <Text style={styles.fieldText}>{item.field}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {user.role == "User" ?
                    (
                        <TouchableOpacity onPress={() => setShowConsultingFieldModal(true)}>
                            <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_setting.png')} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
                        </TouchableOpacity>
                    )}
                <Text style={styles.headerTitle}>Tư vấn tâm lý</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.headerAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <View style={{
                backgroundColor: 'rgba(237, 236, 244, 0.2)', flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 2,
                shadowColor: 'black',
                shadowOpacity: 0.6,
                shadowOffset: 0.6
            }}>
               {
                loading?(
                    <View>
                        <ActivityIndicator size={'large'}/>
                    </View>
                ):(
                    
                )
               } {listPerson.length > 0 ? (
                    <FlatList
                        data={listPerson}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={{
                        color: '#5198FF', justifyContent: 'center', alignSelf: 'center', flex: 1, fontSize: 18, textAlignVertical: 'center', marginHorizontal: 20
                    }}>Chưa có chuyên gia nào trong lĩnh vực này, vui lòng chọn lại sau!</Text>
                )}

            </View>


            {/* ***consulting Field Modal*** */}
            <Modal
                visible={showConsultingFieldModal}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowConsultingFieldModal(false)}
            >
                <Pressable onPress={() => setShowConsultingFieldModal(false)} style={styles.modalOverlay} >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Chọn mục mà bạn cần tư vấn</Text>
                        </View>
                        <FlatList
                            data={listField}
                            renderItem={renderListField}
                            keyExtractor={item => item.id.toString()}
                            style={{ marginTop: 30 }}
                        />
                    </View>
                </Pressable>
            </Modal>
            {/* *** */}
        </SafeAreaView>
    )
}

export default Counselor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20
    },
    headerAvatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
        width: 50, height: 50
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold'
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    name: {
        fontSize: 18,
        marginLeft: 16,
        color: 'black'
    },
    avatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
        width: 50, height: 50
    },


    fieldItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'lightblue',
        marginVertical: 2,
        borderRadius: 5
    },
    fieldText: {
        fontSize: 16,
        color: 'black'
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

    modalTitle: {
        color: '#432C81',
        // fontWeight: 'bold',
        fontSize: 16
    }, modalCancel: {
        color: '#432C81',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    modalSave: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 16,
        borderRadius: 10,

    },
})