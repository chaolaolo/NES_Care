import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { setUser } from '../../redux/Reducers/userReducer';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Counselor = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [listPerson, setListPerson] = useState([]);
    const [consultingFields, setConsultingFields] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
        if (user.role) {
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
    }, [user.role]);

    const fetchConsultingFields = async () => {
        const consultingFieldSnapshot = await firestore().collection('ConsultingField').get();
        const fields = consultingFieldSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConsultingFields(fields);
    };

    const handleFieldSelection = async (field) => {
        setModalVisible(false);
        const expertsSnapshot = await firestore()
            .collection('Users')
            .where('role', '==', 'Expert')
            .where('consultingField', '==', field.name)
            .get();
        const experts = expertsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListPerson(experts);
    };

    const renderItem = ({ item }) => {
        const chatId = [user.uid, item.uid].sort().join('_');
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ChatScreen', { fullName: item.fullName, avatar: item.avatar, uid: item.uid, chatId })}>
                <Image style={styles.avatar} source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                <Text style={styles.name}>{item.fullName}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('open list consulting field')}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_setting.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Psychological counseling</Text>
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
                <FlatList
                    data={listPerson}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>


            {/* *** */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {consultingFields.map(field => (
                            <TouchableOpacity key={field.id} onPress={() => handleFieldSelection(field)}>
                                <Text style={styles.fieldItem}>{field.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
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

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    fieldItem: {
        fontSize: 18,
        padding: 10
    }

})