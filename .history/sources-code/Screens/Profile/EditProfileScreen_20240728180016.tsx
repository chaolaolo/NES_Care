import { Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import ModalComponent from '../../../components/Modal/ModalComponent'
import { RadioButton } from 'react-native-paper'

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [fullName, setfullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [consultingField, setConsultingField] = useState('');
    const [genderChecked, setGenderChecked] = useState('Male');
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [consultingFieldModal, setConsultingFieldModal] = useState(false);
    const user = useSelector(state => state.user.user);

    const [listField, setListField] = useState([]);

    useEffect(() => {
        if (user) {
            setfullName(user.fullName || '');
            setDateOfBirth(user.dateOfBirth || '');
            setGender(user.gender || '');
        }
    }, [user]);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const snapshot = await firestore().collection('ConsultingField').get();
                const fields = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListField(fields);
            } catch (error) {
                console.error('Error fetching consulting fields: ', error);
            }
        };

        fetchFields();
    }, []);

    const handleSaveGender = () => {
        setGender(genderChecked);
        setShowGenderModal(false);
    }


    const handleSubmit = async () => {
        try {
            if (!user.uid) {
                Alert.alert('Error', 'User ID is missing');
                return;
            }

            if (!moment(dateOfBirth, 'YYYY-MM-DD', true).isValid()) {
                Alert.alert('Error', 'Date of birth must be in the format YYYY-MM-DD');
                return;
            }

            const userData = {
                // uid: user.uid,
                ...user,
                fullName,
                dateOfBirth,
                gender,
                // email: user.email,
                // height: user.height || '',
                // weight: user.weight || '',
                // bmi: user.bmi || '',
                // avatar: user.avatar || '',
                // advice: user.advice || ''
            };

            await firestore().collection('Users').doc(user.uid).set(userData);

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleFieldSelect = (field) => {
        setConsultingField(field.field);
        setConsultingFieldModal(false);
    };

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
            <HeaderComponent title="Edit profile information" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
                </TouchableOpacity>
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
                        onPress={() => setShowGenderModal(true)}
                        tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Consulting Field</Text>
                    <TextInputComponent
                        value={consultingField}
                        onChangeText={setConsultingField}
                        placeholder="Consulting Field"
                        onPress={() => setConsultingFieldModal(true)}
                        tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>


            </View>
            <ButtonComponent
                onPress={handleSubmit}
                title="Submit" style={{
                    paddingVertical: 18,
                }} />


            {/* ***Gender Modal*** */}
            <ModalComponent
                visible={showGenderModal}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowGenderModal(false)}
                modalTitle="Choose your gender"
                onClose={() => setShowGenderModal(false)}
                btnSavePress={handleSaveGender}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="Male"
                            status={genderChecked === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => setGenderChecked('Male')}
                        />
                        <Text>Male</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="Female"
                            status={genderChecked === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setGenderChecked('Female')}
                        />
                        <Text>Female</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="Genderqueer"
                            status={genderChecked === 'Genderqueer' ? 'checked' : 'unchecked'}
                            onPress={() => setGenderChecked('Genderqueer')}
                        />
                        <Text>Genderqueer</Text>
                    </View>
                </View>
            </ModalComponent>
            {/* *** */}

            {/* ***consulting Field Modal*** */}
            <ModalComponent
                visible={consultingFieldModal}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setConsultingFieldModal(false)}
                modalTitle="Choose Consulting Field"
                onClose={() => setConsultingFieldModal(false)}
                btnSavePress={handleSaveGender}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FlatList
                            data={listField}
                            renderItem={renderListField}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View>
            </ModalComponent>
            {/* *** */}
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
    fieldItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    fieldText: {
        fontSize: 16,
        color: 'black'
    },
})