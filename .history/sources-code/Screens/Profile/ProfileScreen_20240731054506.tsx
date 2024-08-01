// import { ActivityIndicator, Alert, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// import BlockComponent from '../../../components/Block/BlockComponent'
// import { useNavigation } from '@react-navigation/native'
// import { firebase } from '@react-native-firebase/auth'
// import { useDispatch, useSelector } from 'react-redux'
// import firestore from '@react-native-firebase/firestore'
// import storage from '@react-native-firebase/storage';
// import { setUser } from '../../redux/Reducers/userReducer'
// import * as ImagePicker from 'react-native-image-picker';

// const ProfileScreen = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const [avatar, setAvatar] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [loadSignout, setLoadSignout] = useState(false);
//     const [showAvatar, setShowAvatar] = useState(false);
//     const user = useSelector(state => state.user.user);
//     console.log(user);


//     useEffect(() => {
//         console.log(avatar);
//     }, [avatar])
//     //choose a photo



//     useEffect(() => {
//         const unsubscribe = firestore()
//             .collection('Users')
//             .doc(user.uid)
//             .onSnapshot(documentSnapshot => {
//                 if (documentSnapshot.exists) {
//                     const userData = documentSnapshot.data();
//                     dispatch(setUser(userData));
//                 } else {
//                     console.log('User does not exist.');
//                 }
//             }, error => {
//                 console.log('Error fetching user data: ', error);
//             });

//         return () => unsubscribe();
//     }, [user.uid, dispatch]);


//     const chooseAvatar = () => {
//         ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else {
//                 const { uri } = response.assets[0];
//                 setAvatar(uri);
//                 uploadAvatar(uri);
//             }
//         });
//     };

//     const uploadAvatar = async (uri) => {
//         setIsLoading(true);
//         const userUid = user.uid;
//         const storageRef = storage().ref(`avatar/${userUid}.jpg`);

//         try {
//             await storageRef.putFile(uri);
//             const downloadURL = await storageRef.getDownloadURL();

//             await firestore().collection('Users').doc(userUid).update({
//                 avatar: downloadURL,
//             });

//             dispatch(setUser({ ...user, avatar: downloadURL }));
//         } catch (error) {
//             console.log('Error uploading avatar: ', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle sign out
//     const handleSignOut = async () => {
//         Alert.alert(
//             "Đăng Xuất",
//             "Bạn có chắc chắn muốn đăng xuất tài khoản không?",
//             [
//                 {
//                     text: "Hủy",
//                     style: "cancel"
//                 },
//                 {
//                     text: "Đăng Xuất",
//                     onPress: async () => {
//                         setLoadSignout(true);
//                         try {
//                             await firestore().collection('Users').doc(user.uid).update({
//                                 isOnline: false,
//                             });
//                             setLoadSignout(false);
//                             await firebase.auth().signOut();
//                             navigation.navigate('SignInScreen');
//                         } catch (error) {
//                             setLoadSignout(false);
//                             console.error('Sign out error:', error);
//                         }
//                     }
//                 }
//             ]
//         );
//     };

//     const calculateAge = (dateOfBirth) => {
//         const today = new Date();
//         const birthDate = new Date(dateOfBirth);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDifference = today.getMonth() - birthDate.getMonth();
//         if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//         }
//         return age;
//     };


//     const age = user.dateOfBirth ? calculateAge(user.dateOfBirth) : 'No Specified';

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => setShowAvatar(true)}>
//                     <Image style={styles.imgAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
//                     <TouchableOpacity onPress={chooseAvatar} style={styles.boxicPen}>
//                         <Image style={styles.icPen} source={require('../../image/ic_pen.png')} />
//                     </TouchableOpacity>
//                 </TouchableOpacity>

//                 <View style={{ marginHorizontal: 10, flex: 1, flexDirection: 'row' }}>
//                     <View>
//                         <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 24 }}>{user.fullName || 'No name'}</Text>
//                         <Text style={{ color: '#7B6BA8', fontSize: 16 }}>{user.email || 'No email'}</Text>
//                         <Pressable onPress={() => navigation.navigate('CalculateBMIScreen')}>
//                             <Text style={{ color: '#7B6BA8', fontSize: 17, textDecorationLine: 'underline' }} >Caculate BMI</Text>
//                         </Pressable>
//                     </View>
//                     <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={{ height: 30, marginHorizontal: 6, top: 2 }}>
//                         <Image style={{ width: 24, height: 24 }} source={require('../../image/ic_pen.png')} />
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity onPress={handleSignOut}>
//                     <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_sign_out.png')} />
//                 </TouchableOpacity>
//             </View>


//             <BlockComponent style={{ marginTop: 40 }}>

//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, alignItems: !user.role ? 'center' : 'flex-start' }}>
//                         <Text>Tuổi</Text>
//                         <Text style={styles.mainText}>{age}</Text>
//                     </View>
//                     <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, }}>
//                         <Text>Giới tính</Text>
//                         <Text style={styles.mainText}>{user.gender || 'Not Specified'}</Text>
//                     </View>
//                     {user.role === 'Expert' && (
//                         <>
//                             <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
//                                 <Text>Chuyên gia</Text>
//                                 <Text style={[styles.mainText, { fontSize: 17 }]}>{user.consultingField || 'Not update yet'}</Text>
//                             </View>
//                         </>
//                     )}
//                 </View>
//                 <View style={{ width: '94%', height: 1, borderWidth: 0.5, borderColor: 'gray', alignSelf: 'center', marginVertical: 10 }}></View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, }}>
//                         <Text>Chiều cao: </Text>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={styles.mainText}>{user.height || 'Not Specified'}</Text>
//                             <Text>(cm)</Text>
//                         </View>
//                     </View>
//                     <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
//                         <Text>Cân nặng:</Text>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={styles.mainText}>{user.weight || 'Not Specified'}</Text>
//                             <Text>(kg)</Text>
//                         </View>
//                     </View>
//                     <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
//                         <Text>BMI:</Text>
//                         <Text style={styles.mainText}>{user.bmi || 'Not calcuated'}</Text>
//                     </View>
//                 </View>
//                 <View style={{ paddingHorizontal: 10 }}>
//                     {/* <Text style={{position:'absolute'}}>Advice:</Text> */}
//                     <Text style={{ color: '#FFA500' }}>NES Care khuyên bạn {user.advice || 'Not calcuated'}</Text>
//                 </View>

//             </BlockComponent>
//             <BlockComponent>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_HelpNSupport.png')} />
//                     <Text style={{ color: 'black', fontSize: 18 }}>Hỗ trợ</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Message.png')} />
//                     <Text style={{ color: 'black', fontSize: 18 }}>Liên hệ với chúng tôi</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Lock.png')} />
//                     <Text style={{ color: 'black', fontSize: 18 }}>Quyền riêng tư</Text>
//                 </View>
//             </BlockComponent>

//             {/* <View> */}
//             {isLoading ?
//                 <View
//                     style={{
//                         width: 80,
//                         height: 80,
//                         borderRadius: 100,
//                         margin: 20,
//                         backgroundColor: 'rgba(0,0,0,0.5)',
//                         // backgroundColor: '#21CE9C',
//                         position: 'absolute',
//                         justifyContent: 'center'

//                     }} >
//                     <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
//                     {/* <Text style={{
//                         color: 'white',
//                         textAlign: 'center',
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                     }}>Signing in..</Text> */}
//                 </View>
//                 : null}
//             {/* </View> */}


//             {loadSignout ?
//                 <View
//                     style={{
//                         width: '120%',
//                         height: '100%',
//                         alignSelf: 'center',
//                         backgroundColor: 'rgba(0,0,0,0.6)',
//                         // backgroundColor: '#21CE9C',
//                         position: 'absolute',
//                         justifyContent: 'center',
//                         flexDirection: 'row',
//                         alignItems: 'center',

//                     }} >
//                     <ActivityIndicator size="large" color="#407CE2" style={{ marginHorizontal: 10 }} />
//                     <Text style={{
//                         color: 'white',
//                         textAlign: 'center',
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                     }}>Signing out..</Text>
//                 </View>
//                 : null}



//             {/* show avatar */}
//             <Modal
//                 animationType='fade'
//                 visible={showAvatar}
//                 transparent={true}
//                 onRequestClose={() => setShowAvatar(false)}
//             >
//                 <Pressable
//                     onPress={() => setShowAvatar(false)}
//                     style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
//                     <Image style={styles.modalAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
//                 </Pressable>
//             </Modal>
//             {/* ********* */}




//         </SafeAreaView>
//     )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     imgAvatar: {
//         width: 80,
//         height: 80,
//         backgroundColor: '#EDECF4',
//         borderRadius: 100,
//     },
//     boxicPen: {
//         // width: 30, height: 30,
//         position: 'absolute',
//         backgroundColor: 'white',
//         right: 0,
//         bottom: 0,
//         borderRadius: 100,
//         padding: 3,
//         borderWidth: 0.2
//     },
//     icPen: {
//         width: 20, height: 20,
//     },
//     mainText: { color: 'black', fontSize: 20 },
//     modalAvatar: {
//         width: '90%',
//         height: 500
//     }
// })

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
import { ScrollView } from 'react-native'
import HeaderComponent from '../../../components/Header/HeaderComponent'

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
            "Đăng Xuất",
            "Bạn có chắc chắn muốn đăng xuất tài khoản không?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đăng Xuất",
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

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


    const age = user.dateOfBirth ? calculateAge(user.dateOfBirth) : 'No Specified';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ backgroundColor: '#21CE9C', width: '100%', height: 500 }}>
                    <HeaderComponent style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_arrow_left.png')} />
                        </TouchableOpacity>
                        <Text style={styles.txtHeaderTitle}>Trang cá nhân</Text>
                        <TouchableOpacity onPress={handleSignOut}>
                            <Image source={require('../../image/ic_sign_out.png')} style={{ width: 26, height: 26, marginRight: 10, }} />
                        </TouchableOpacity>
                    </HeaderComponent>
                </View>
                <View style={{ height: 400 }} ></View>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '90%',
                        position: 'absolute',
                        margin: 20, marginTop: 180,
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        elevation:10,
                        shadowColor:'black'
                    }}>
                    <View style={styles.mainContent}>
                        <TouchableOpacity onPress={() => setShowAvatar(true)} style={{ position: 'absolute', }}>
                            <Image style={styles.imgAvatar} source={user.avatar ? { uri: user.avatar } : require('../../image/ic_LeftinputUserName.png')} />
                            <TouchableOpacity onPress={chooseAvatar} style={styles.boxicPen}>
                                <Image style={styles.icPen} source={require('../../image/ic_pen.png')} />
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 70, alignItems: 'center' }}>
                        <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
                            <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginLeft: 10 }}>{user.fullName || 'No name'}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} style={{ height: 30, marginHorizontal: 6, top: 2 }}>
                                <Image style={{ width: 24, height: 24 }} source={require('../../image/ic_pen.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#7B6BA8', fontSize: 16, textAlign: 'center' }}>{user.email || 'No email'}</Text>
                        <Text
                            onPress={() => navigation.navigate('CalculateBMIScreen')}
                            style={{ color: '#7B6BA8', fontSize: 17, textDecorationLine: 'underline', textAlign: 'center' }} >
                            Caculate BMI
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 10 }}>
                        <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, alignItems: 'center', backgroundColor: '#E4F9F3' }}>
                            <Text style={styles.mainText}>{age}</Text>
                            <Text>Tuổi</Text>
                        </View>
                        <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, alignItems: 'center', backgroundColor: '#E4F9F3' }}>
                            <Text style={styles.mainText}>{user.gender || 'Not Specified'}</Text>
                            <Text>Giới tính</Text>
                        </View>
                        {user.role === 'Expert' ? (
                            <>
                                <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, backgroundColor: '#E4F9F3' }}>
                                    <Text style={[styles.mainText, { fontSize: 17 }]}>{user.consultingField || 'Not update yet'}</Text>
                                    <Text>Chuyên gia</Text>
                                </View>
                            </>
                        ) : (<View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, }}>

                        </View>)}
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 10, }}>
                        <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, alignItems: 'center', backgroundColor: '#E4F9F3' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.mainText}>{user.height || 'Not Specified'}</Text>
                                <Text>(cm)</Text>
                            </View>
                            <Text>Chiều cao</Text>
                        </View>
                        <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, alignItems: 'center', backgroundColor: '#E4F9F3' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.mainText}>{user.weight || 'Not Specified'}</Text>
                                <Text>(kg)</Text>
                            </View>
                            <Text>Cân nặng</Text>
                        </View>
                        <View style={{ marginHorizontal: 4, marginVertical: 2, flex: 1, alignItems: 'center', backgroundColor: '#E4F9F3' }}>
                            <Text style={styles.mainText}>{user.bmi || 'Not calcuated'}</Text>
                            <Text>BMI</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 18 }}>
                        <Text style={{ color: '#FFA500', textAlign: 'justify' }}>NES Care khuyên bạn {user.advice || 'Not calcuated'}</Text>
                    </View>

                    <View style={{ backgroundColor: 'gray', width: '90%', height: 1, marginVertical: 20, alignSelf: 'center' }}>
                    </View>

                    <BlockComponent>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_HelpNSupport.png')} />
                            <Text style={{ color: 'black', fontSize: 18 }}>Hỗ trợ</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Message.png')} />
                            <Text style={{ color: 'black', fontSize: 18 }}>Liên hệ với chúng tôi</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Lock.png')} />
                            <Text style={{ color: 'black', fontSize: 18 }}>Quyền riêng tư</Text>
                        </View>
                    </BlockComponent>


                </View>

                {/* <BlockComponent style={{ marginTop: 40 }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, alignItems: !user.role ? 'center' : 'flex-start' }}>
                        <Text>Tuổi</Text>
                        <Text style={styles.mainText}>{age}</Text>
                    </View>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, }}>
                        <Text>Giới tính</Text>
                        <Text style={styles.mainText}>{user.gender || 'Not Specified'}</Text>
                    </View>
                    {user.role === 'Expert' && (
                        <>
                            <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                                <Text>Chuyên gia</Text>
                                <Text style={[styles.mainText, { fontSize: 17 }]}>{user.consultingField || 'Not update yet'}</Text>
                            </View>
                        </>
                    )}
                </View>
                <View style={{ width: '94%', height: 1, borderWidth: 0.5, borderColor: 'gray', alignSelf: 'center', marginVertical: 10 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1, }}>
                        <Text>Chiều cao: </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.mainText}>{user.height || 'Not Specified'}</Text>
                            <Text>(cm)</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginVertical: 2, flex: 1 }}>
                        <Text>Cân nặng:</Text>
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
                    <Text style={{ color: '#FFA500' }}>NES Care khuyên bạn {user.advice || 'Not calcuated'}</Text>
                </View>
            </BlockComponent> */}

                {/* <BlockComponent>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_HelpNSupport.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Hỗ trợ</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Message.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Liên hệ với chúng tôi</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../../ProfileScreenIcon/ic_Lock.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Quyền riêng tư</Text>
                </View>
            </BlockComponent> */}

                {/* <View> */}
                {
                    isLoading ?
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
                        : null
                }
                {/* </View> */}


                {
                    loadSignout ?
                        <View
                            style={{
                                width: '120%',
                                height: '100%',
                                alignSelf: 'center',
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
                        : null
                }



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



            </ScrollView >
        </SafeAreaView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    mainContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        // backgroundColor: '#E4F9F3',
        // backgroundColor: 'white',
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
        textAlign: 'left',
        flex: 1,
        paddingRight: 30
    },
    imgAvatar: {
        width: 120,
        height: 120,
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
        width: 24, height: 24,
    },
    mainText: { color: 'black', fontSize: 20, },
    modalAvatar: {
        width: '90%',
        height: 500
    }
})