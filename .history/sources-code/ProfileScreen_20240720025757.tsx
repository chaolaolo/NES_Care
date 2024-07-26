import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BlockComponent from '../components/Block/BlockComponent'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    console.log(user);

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
                        try {
                            await firebase.auth().signOut();
                            navigation.navigate('SignInScreen');
                        } catch (error) {
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
                <TouchableOpacity>
                    <Image style={styles.imgAvatar} source={user.avatar ? { uri: user.avatar } : require('./image/ic_LeftinputUserName.png')} />
                    <TouchableOpacity style={styles.boxicPen}>
                        <Image style={styles.icPen} source={require('./image/ic_pen.png')} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <Text style={{ color: '#432C81', fontWeight: 'bold', fontSize: 24 }}>{user.fullName || 'No name'}</Text>
                    <Text style={{ color: '#7B6BA8', fontSize: 16 }}>{user.email || 'No email'}</Text>
                </View>
                <TouchableOpacity onPress={handleSignOut}>
                    <Image style={{ width: 30, height: 30 }} source={require('./image/ic_sign_out.png')} />
                </TouchableOpacity>
            </View>

            <BlockComponent style={{ marginTop: 40 }}>
                <View style={{ marginLeft: 10, marginVertical: 2 }}>
                    <Text>Date of birth</Text>
                    <Text style={styles.mainText}>{user.dateOfBirth || 'No Specified'}</Text>
                </View>
                <View style={{ marginLeft: 10, marginVertical: 2 }}>
                    <Text>Gender</Text>
                    <Text style={styles.mainText}>{user.gender || 'Not Specified'}</Text>
                </View>
                <View style={{ marginLeft: 10, marginVertical: 2 }}>
                    <Text>Height</Text>
                    <Text style={styles.mainText}>{user.height || 'Not Specified'}</Text>
                </View>
                <View style={{ marginLeft: 10, marginVertical: 2 }}>
                    <Text>Weight</Text>
                    <Text style={styles.mainText}>{user.weight || 'Not Specified'}</Text>
                </View>
                <View style={{ marginLeft: 10, marginVertical: 2 }}>
                    <Text>BMI</Text>
                    <Text style={styles.mainText}>{user.bmi || 'Not calcuated'}</Text>
                </View>

                <View style={{ width: '94%', height: 1, borderWidth: 0.5, borderColor: 'gray', alignSelf: 'center', marginVertical: 20 }}></View>

                <Pressable onPress={() => navigation.navigate('EditProfileScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('./ProfileScreenIcon/ic_Doc.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Edit profile information</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('CalculateBMIScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('./ProfileScreenIcon/ic_Calculator.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Caculate BMI</Text>
                </Pressable>
            </BlockComponent>
            <BlockComponent>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('./ProfileScreenIcon/ic_HelpNSupport.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>help & Support</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('./ProfileScreenIcon/ic_Message.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Contact us</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('./ProfileScreenIcon/ic_Lock.png')} />
                    <Text style={{ color: 'black', fontSize: 18 }}>Privacy policy</Text>
                </View>
            </BlockComponent>

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
        padding: 4,
        borderWidth: 0.2
    },
    icPen: {
        width: 25, height: 25,
    },
    mainText: { color: 'black', fontSize: 20 },
})