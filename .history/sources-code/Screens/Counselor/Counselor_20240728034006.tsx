import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { setUser } from '../../redux/Reducers/userReducer';

const Counselor = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

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


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_search.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#EDECF4', flex:1, marginTop: 78, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Text>aa</Text>
            </View>
        </SafeAreaView>
    )
}

export default Counselor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
        width: 50, height: 50
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold'
    },
})