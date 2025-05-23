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

    const [imgBodyCondition, setImgBodyCondition] = useState('');
    const [latestMove, setLatestMove] = useState({ steps: 0, distance: 0 });
    const [gratefulCount, setGratefulCount] = useState(0);
    const [gratefulDate, setGratefulDate] = useState('Hôm nay');

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
        const unsubscribeMove = firestore()
            .collection('Moves')
            .where('uid', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .limit(1)
            .onSnapshot(querySnapshot => {
                if (!querySnapshot.empty) {
                    const moveData = querySnapshot.docs[0].data();
                    setLatestMove({ steps: moveData.steps, distance: moveData.distance });
                } else {
                    console.log('No move data found.');
                }
            }, error => {
                console.log('Error fetching move data: ', error);
            });

        return () => unsubscribeMove();
    }, [user.uid]);

    useEffect(() => {
        if (user.bmi < 18.5) {
            setImgBodyCondition('https://www.planetayurveda.com/pa-wp-images/underweight.jpg');
        } else if (user.bmi >= 18.5 && user.bmi < 24.9) {
            setImgBodyCondition('https://gcs.tripi.vn/public-tripi/tripi-feed/img/474084HRF/chi-so-bmi_014148769.jpg');

        } else if (user.bmi >= 25 && user.bmi < 29.9) {
            setImgBodyCondition('https://render.fineartamerica.com/images/rendered/default/poster/8/8/break/images/artworkimages/medium/2/1-topless-overweight-man-holding-body-fat-science-photo-library.jpg');

        } else if (user.bmi >= 30 && user.bmi < 34.9) {
            setImgBodyCondition('https://www.docdrmuratkanlioz.com/en/wp-content/uploads/2023/06/Obez-Oldugumu-Nasil-Anlarim1.jpg');
        } else if (user.bmi >= 35) {
            setImgBodyCondition('https://i.pinimg.com/236x/7f/27/bf/7f27bfdb527b473c3af27946c4aeb527.jpg');
        } else {
            setImgBodyCondition('')
        }
    }, [user.bmi])

    useEffect(() => {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const unsubscribeGratefuls = firestore()
            .collection('Thanks')
            .where('uid', '==', user.uid)
            .where('date', '>=', startOfDay)
            .where('date', '<=', endOfDay)
            .onSnapshot(querySnapshot => {
                if (!querySnapshot.empty) {
                    setGratefulCount(querySnapshot.size);
                    setGratefulDate('Today');
                } else {
                    firestore()
                        .collection('Thanks')
                        .where('uid', '==', user.uid)
                        .orderBy('date', 'desc')
                        .limit(1)
                        .get()
                        .then(snapshot => {
                            if (!snapshot.empty) {
                                const lastGrateful = snapshot.docs[0];
                                setGratefulCount(lastGrateful.data().count);
                                setGratefulDate(new Date(lastGrateful.data().date.toDate()).toDateString());
                            } else {
                                setGratefulCount(0);
                                setGratefulDate('No data');
                            }
                        });
                }
            }, error => {
                console.log('Error fetching grateful data: ', error);
            });

        return () => unsubscribeGratefuls();
    }, [user.uid]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_drawer_menu.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trang Chủ</Text>
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
                            <Text style={styles.title}>Bước Chân</Text>
                            <Text style={styles.dateItem}>Hôm nay</Text>
                        </View>
                        <Text style={styles.contentItem}>Số bước: {latestMove.steps}</Text>
                        <Text style={styles.contentItem}>Quãng đường: {latestMove.distance} m</Text>
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('WriteThanksScreen')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Lời biết ơn</Text>
                            <Text style={styles.dateItem}>{gratefulDate}</Text>
                        </View>
                        <Text style={styles.contentItem}>Số lượng: {gratefulCount}</Text>
                        {/* <Text style={styles.contentItem}>Target: 5/day</Text> */}
                    </BlockComponent>
                    <BlockComponent
                        onPress={() => navigation.navigate('PhysicalActivities')}
                        style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Mục tiêu</Text>
                            <Text style={styles.dateItem}>Hôm nay</Text>
                        </View>
                        <Text style={styles.contentItem}>Giấc ngủ: Hoàn Thành</Text>
                        <Text style={styles.contentItem}>Số bước chân: Chưa Hoàn Thành</Text>
                        <Text style={styles.contentItem}>Số lời biết ơn: Hoàn Thành</Text>
                    </BlockComponent>
                </View>
                <BlockComponent style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                        <Text style={styles.title}>Your current health status</Text>
                        <Text style={[styles.dateItem, { color: '#5198FF', fontWeight: '400', fontSize: 18 }]} onPress={() => navigation.navigate('EatAndDrink')}>Details</Text>
                    </View>
                    <Text style={[styles.contentItem, { color: '#FFA500' }]}>- {user.advice}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.contentItem}>Weight: {user.weight}</Text>
                        <Text style={styles.contentItem}>Status: {user.BMIstatus}</Text>
                    </View>
                    <Text style={[styles.contentItem, { marginTop: 10 }]}>- Cơ Thể hiênj tại của bạn trông như thế nào? </Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 300, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        {imgBodyCondition !== null && imgBodyCondition !== '' ? (
                            <View>
                                <Image source={{ uri: imgBodyCondition }} style={{ flex: 1, resizeMode: 'cover', width: 200, height: 200 }} />
                            </View>
                        ) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'black' }}>You have not updated your BMI.</Text>
                                <Text onPress={() => navigation.navigate('CalculateBMIScreen')} style={{ color: '#5198FF', textDecorationLine: 'underline' }}>Update now</Text>
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
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold'
    },
    dateItem: {
        fontSize: 14,
        color: '#21CE9C',
        fontWeight: 'bold'
    },
    contentItem: {
        fontSize: 18,
        color: '#432C81',
        textAlign: 'justify'
    }
})