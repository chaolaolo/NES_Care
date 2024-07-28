import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import BlockComponent from '../../../components/Block/BlockComponent';
import firestore from '@react-native-firebase/firestore'
import { setUser } from '../../redux/Reducers/userReducer';

const HomeScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const [imgBodyCondition, setImgBodyCondition] = useState('')

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
        if (user.bmi < 18.5) {
            setImgBodyCondition('https://www.planetayurveda.com/pa-wp-images/underweight.jpg');
        } else if (user.bmi >= 18.5 && user.bmi < 24.9) {
            setImgBodyCondition('https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084HRF/chi-so-bmi_014148769.jpg');

        } else if (user.bmi >= 25 && user.bmi < 29.9) {
            setImgBodyCondition('https://render.fineartamerica.com/images/rendered/default/poster/8/8/break/images/artworkimages/medium/2/1-topless-overweight-man-holding-body-fat-science-photo-library.jpg');

        } else if (user.bmi >= 30 && user.bmi < 34.9) {
            setImgBodyCondition('https://www.docdrmuratkanlioz.com/en/wp-content/uploads/2023/06/Obez-Oldugumu-Nasil-Anlarim1.jpg');

        } else if (user.bim > 35) {
            setImgBodyCondition('https://i.pinimg.com/236x/7f/27/bf/7f27bfdb527b473c3af27946c4aeb527.jpg');

        } else {
            setImgBodyCondition('');
        }
    }, [user.bmi])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image style={styles.avatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginBottom: 60 }}>
                <View
                    style={styles.boxItem}>
                    <BlockComponent
                        onPress={() => navigation.navigate('PhysicalActivities')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Move</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Steps: 3000</Text>
                        <Text style={styles.contentItem}>Distances: 2000 m</Text>
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('WriteThanksScreen')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Gratefuls</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Count: 3</Text>
                        <Text style={styles.contentItem}>Target: 5/day</Text>
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('PhysicalActivities')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Targets</Text>
                            <Text style={styles.dateItem}>Today</Text>
                        </View>
                        <Text style={styles.contentItem}>Sleep Target: complete</Text>
                        <Text style={styles.contentItem}>Move steps target: incomplete</Text>
                        <Text style={styles.contentItem}>Gratefuls target: incomplete</Text>
                        <Text style={styles.contentItem}>Target 4: complete</Text>
                        <Text style={styles.contentItem}>Target 5: complete</Text>
                    </BlockComponent>
                </View>
                <BlockComponent style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                        <Text style={styles.title}>Your current health status</Text>
                        <Text style={[styles.dateItem, { color: '#5198FF', fontWeight: '400' }]} onPress={() => navigation.navigate('EatAndDrink')}>Details</Text>
                    </View>
                    <Text style={[styles.contentItem, { color: '#FFA500' }]}>- {user.advice}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.contentItem}>Weight: {user.weight}</Text>
                        <Text style={styles.contentItem}>Status: {user.BMIstatus}</Text>
                    </View>
                    <Text style={[styles.contentItem, { marginTop: 10 }]}>- Your body now: </Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 300, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        {imgBodyCondition! == null && imgBodyCondition! == '' ? (
                            <>
                                <Image source={{ uri: imgBodyCondition }} style={{ flex: 1, resizeMode: 'cover', width: 200, height: 200 }} />
                            </>
                        ) : (
                            <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>You have not updated your BMI.</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('CalculateBMIScreen')}>Update now</TouchableOpacity>
                            </View>
                        )}
                    </View>
                </BlockComponent>
            </ScrollView>


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
    boxItem: {
        backgroundColor: '#EDECF4',
        marginTop: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        color: '#432C81',
        fontWeight: 'bold'
    },
    dateItem: {
        fontSize: 18,
        color: '#21CE9C',
        fontWeight: 'bold'
    },
    contentItem: {
        fontSize: 18,
        color: '#432C81',
        textAlign: 'justify'
    }
})