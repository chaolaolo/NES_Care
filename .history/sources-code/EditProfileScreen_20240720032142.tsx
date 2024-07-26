import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [fullName, setfullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (user) {
            setfullName(user.fullName || '');
            setDateOfBirth(user.dateOfBirth || '');
            setGender(user.gender || '');
        }
    }, [user]);

    const handleSubmit = async () => {
        try {
            if (!user.uid) {
                Alert.alert('Error', 'User ID is missing');
                return;
            }

            const userData = {
                uid: user.uid,
                fullName,
                dateOfBirth,
                gender,
                email: user.email,
                height: user.height || '',
                weight: user.weight || '',
                bmi: user.bmi || '',
                avatar: user.avatar || ''
            };

            await firestore().collection('Users').doc(user.uid).set(userData);

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Edit profile information" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>

            <View style={{ marginTop: 60, }}>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Full Name</Text>
                    <TextInputComponent
                        placeholder="Full name"
                        value={fullName}
                        onChangeText={setfullName}
                        tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Date of birth</Text>
                    <TextInputComponent
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        placeholder="Date of birth"
                        tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Gender</Text>
                    <TextInputComponent
                        value={gender}
                        onChangeText={setGender}
                        placeholder="Gender"
                        tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>


            </View>
            <ButtonComponent
                onPress={handleSubmit}
                title="Submit" style={{
                    paddingVertical: 18,
                }} />
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2
    },

})