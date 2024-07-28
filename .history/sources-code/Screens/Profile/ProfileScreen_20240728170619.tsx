import { ActivityIndicator, Alert, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BlockComponent from '../../../components/Block/BlockComponent'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import { setUser } from '../../redux/Reducers/userReducer'
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadSignout, setLoadSignout] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const user = useSelector(state => state.user.user);
    console.log(user);


    useEffect(() => {
        console.log(avatar);
    }, [avatar])
    //choose a photo



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


    const chooseAvatar = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const { uri } = response.assets[0];
                setAvatar(uri);
                uploadAvatar(uri);
            }
        });
    };

    const uploadAvatar = async (uri) => {
        setIsLoading(true);
        const userUid = user.uid;
        const storageRef = storage().ref(`avatar/${userUid}.jpg`);

        try {
            await storageRef.putFile(uri);
            const downloadURL = await storageRef.getDownloadURL();

            await firestore().collection('Users').doc(userUid).update({
                avatar: downloadURL,
            });

            dispatch(setUser({ ...user, avatar: downloadURL }));
        } catch (error) {
            console.log('Error uploading avatar: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle sign out
    const handleSignOut = async () => {
        Alert.alert(
            "Confirm Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign Out",
                    onPress: async () => {
                        setLoadSignout(true);
                        try {
                            await firestore().collection('Users').doc(user.uid).update({
                                isOnline: false,
                            });
                            setLoadSignout(false);
                            await firebase.auth().signOut();
                            navigation.navigate('SignInScreen');
                        } catch (error) {
                            setLoadSignout(false);
                            console.error('Sign out error:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setShowAvatar(true)}>
                    <Image style={styles.imgAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                    <TouchableOpacity onPress={chooseAvatar} style={styles.boxicPen}>
                        <Image style={styles.icPen} source={require('../../image/ic_pen.png')} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'row' }}>
                    <View>
                        <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 24 }}>{user.fullName || 'No name'}</Text>
                        <Text style={{ color: '#7B6BA8', fontSize: 16 }}>{user.email || 'No email'}</Text>
                        <Pressable onPress={() => navigation.navigate('CalculateBMIScreen')}>
                            <Text style={{ color: '#7B6BA8', fontSize: 17, textDecorationLine: 'underline' }} >Caculate BMI</Text>
                        </Pressable>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={{ height: 30, marginHorizontal: 6, top: 2 }}>
                        <Image style={{ width: 24, height: 24 }} source={require('../../image/ic_pen.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSignOut}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_sign_out.png')} />
                </TouchableOpacity>
            </View>


            <BlockComponent style={{ marginTop: 40 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                        <Text>Date of birth</Text>
                        <Text style={styles.mainText}>{user.dateOfBirth || 'No Specified'}</Text>
                    </View>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                        <Text>Gender</Text>
                        <Text style={styles.mainText}>{user.gender || 'Not Specified'}</Text>
                    </View>
                </View>
                <View style={{ width: '94%', height: 1, borderWidth: 0.5, borderColor: 'gray', alignSelf: 'center', marginVertical: 10 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, }}>
                        <Text>Height: </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.mainText}>{user.height || 'Not Specified'}</Text>
                            <Text>(cm)</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                        <Text>Weight:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.mainText}>{user.weight || 'Not Specified'}</Text>
                            <Text>(kg)</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                        <Text>BMI:</Text>
                        <Text style={styles.mainText}>{user.bmi || 'Not calcuated'}</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    {/* <Text style={{position:'absolute'}}>Advice:</Text> */}
                    <Text style={{ color: '#FFA500' }}>Advice: {user.advice || 'Not calcuated'}</Text>
                </View>

            </BlockComponent>
            <BlockComponent>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_HelpNSupport.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>help & Support</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Message.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Contact us</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Lock.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Privacy policy</Text>
                </View>
            </BlockComponent>

            {/* <View> */}
            {isLoading ?
                <View
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100,
                        margin: 20,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        // backgroundColor: '#21CE9C',
                        position: 'absolute',
                        justifyContent: 'center'

                    }} >
                    <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
                    {/* <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Signing in..</Text> */}
                </View>
                : null}
            {/* </View> */}


            {/* {loadSignout ? */}
                <View
                    style={{
                        width: '120%',
                        height: '100%',
                        alignSelf:'center',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        // backgroundColor: '#21CE9C',
                        position: 'absolute',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',

                    }} >
                    <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Signing out..</Text>
                </View>
                {/* : null} */}



            {/* show avatar */}
            <Modal
                animationType='fade'
                visible={showAvatar}
                transparent={true}
                onRequestClose={() => setShowAvatar(false)}
            >
                <Pressable
                    onPress={() => setShowAvatar(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={styles.modalAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                </Pressable>
            </Modal>
            {/* ********* */}




        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgAvatar: {
        width: 80,
        height: 80,
        backgroundColor: '#EDECF4',
        borderRadius: 100,
    },
    boxicPen: {
        // width: 30, height: 30,
        position: 'absolute',
        backgroundColor: 'white',
        right: 0,
        bottom: 0,
        borderRadius: 100,
        padding: 3,
        borderWidth: 0.2
    },
    icPen: {
        width: 20, height: 20,
    },
    mainText: { color: 'black', fontSize: 20 },
    modalAvatar: {
        width: '90%',
        height: 500
    }
})