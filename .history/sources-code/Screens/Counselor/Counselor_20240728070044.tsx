import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_search.png')} />
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
                elevation: 4,
                shadowColor: black
            }}>
                <FlatList
                    data={listPerson}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
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

})