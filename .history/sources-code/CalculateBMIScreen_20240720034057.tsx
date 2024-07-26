import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'

const CalculateBMIScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState('');

    useEffect(() => {
        if (user) {
            setHeight(user.height || '');
            setWeight(user.weight || '');
            setBmi(user.bmi || '');
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
                fullName: user.fullName || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                email: user.email || '',
                height,
                weight,
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
            <HeaderComponent title="Calculate BMI" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>

            <View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Height(cm)</Text>
                    <TextInputComponent
                        value={height}
                        onChangeText={setHeight}
                        placeholder="Height(cm)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Weight(kg)</Text>
                    <TextInputComponent
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Weight(kg)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>BMI</Text>
                    <TextInputComponent
                        value={bmi}
                        editable={false}
                        onChangeText={setBmi}
                        placeholder="Weight(kg)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                </View>
            </View>
            <ButtonComponent
                onPress={handleSubmit}
                title="Submit" style={{ paddingVertical: 18, marginTop: 60 }} />
        </SafeAreaView>
    )
}

export default CalculateBMIScreen

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