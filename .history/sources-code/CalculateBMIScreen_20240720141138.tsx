import { Alert, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '../components/Button/ButtonComponent'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import ModalBMI from '../components/Modal/ModalBMI'

const CalculateBMIScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const [height, setHeight] = useState('');
    const [errHeight, setErrHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [errWeight, setErrWeight] = useState('');
    const [bmi, setBmi] = useState('');
    const [BMIstatus, setBMIstatus] = useState('');
    const [idealWeight, setIdealWeight] = useState('');
    const [minWeight, setMinWeight] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [advice, setAdvice] = useState('');
    const [showBmiModal, setShowBmiModal] = useState(false);

    useEffect(() => {
        if (user) {
            setHeight(user.height || '');
            setWeight(user.weight || '');
            setBmi(user.bmi || '');
        }
    }, [user]);

    const calculateBMI = (height, weight) => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            return bmiValue;
        }
        return '';
    };

    const calculateWeightRange = (height) => {
        if (height) {
            const heightInMeters = height / 100;
            const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(2);
            const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(2);
            const idealWeight = ((parseFloat(minWeight) + parseFloat(maxWeight)) / 2).toFixed(2);
            return { minWeight, maxWeight, idealWeight };
        }
        return { minWeight: '', maxWeight: '', idealWeight: '' };
    };

    const handleSubmit = async () => {
        let err = false;
        if (parseFloat(height) < 50) {
            setErrHeight('Please enter a larger number or less than 50 cm!');
            err = true;
        } else if (parseFloat(height) > 400) {
            setErrHeight('Please enter a number less than or equal to 400 cm!');
            err = true;
        } else {
            setErrHeight('');
        }
        if (parseFloat(weight) < 20) {
            setErrWeight('Please enter a larger number or less than 20 kg!');
            err = true;
        } else if (parseFloat(weight) > 400) {
            setErrWeight('Please enter a number less than equal to 400 kg!');
            err = true;
        } else {
            setErrWeight('');
        }



        if (!err) {
            const calculatedBMI = calculateBMI(height, weight);
            setBmi(calculatedBMI);
            // if (parseFloat(bmi) < 18.5) {
            //     setBMIstatus('Underweight');
            // } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 24.9) {
            //     setBMIstatus('Normal weight');
            // } else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 29.9) {
            //     setBMIstatus('Overweight');
            // } else {
            //     setBMIstatus('Obesity');
            // }
            // console.log(BMIstatus);
            let status = '';
            if (parseFloat(calculatedBMI) < 18.5) {
                status = 'Underweight';
                setAdvice(
                    '- Ăn nhiều bữa nhỏ trong ngày thay vì ba bữa chính. ' +
                    '- Chọn thực phẩm giàu calo và chất dinh dưỡng, bao gồm trái cây, rau, ngũ cốc nguyên hạt, protein nạc và chất béo lành mạnh.');
            } else if (parseFloat(calculatedBMI) >= 18.5 && parseFloat(calculatedBMI) < 24.9) {
                status = 'Normal weight';
            } else if (parseFloat(calculatedBMI) >= 25 && parseFloat(calculatedBMI) < 29.9) {
                status = 'Overweight';
            } else {
                status = 'Obesity';
            }
            setBMIstatus(status);
            console.log('BMIstatus:', status);
            const { minWeight, maxWeight, idealWeight } = calculateWeightRange(height);
            setMinWeight(minWeight);
            setMaxWeight(maxWeight);
            setIdealWeight(idealWeight);

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
                    bmi: calculatedBMI,
                    BMIstatus: status || '',
                    avatar: user.avatar || ''
                };

                await firestore().collection('Users').doc(user.uid).set(userData);

                setShowBmiModal(true);
                // Alert.alert('Success', 'Profile updated successfully');
                // Alert.alert('Success', `Profile updated successfully. Your BMI is ${calculatedBMI} (${bmiLevel})`);

            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Calculate BMI" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
                </TouchableOpacity>
            </HeaderComponent>

            <View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Height(cm)</Text>
                    <TextInputComponent
                        value={height}
                        onChangeText={setHeight}
                        placeholder="Height(cm)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    {errHeight ? <Text style={styles.errText}>{errHeight}</Text> : null}
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Weight(kg)</Text>
                    <TextInputComponent
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Weight(kg)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    {errWeight ? <Text style={styles.errText}>{errWeight}</Text> : null}
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

            {/* ****Modal**** */}
            <ModalBMI
                visible={showBmiModal}
                onRequestClose={() => setShowBmiModal(false)}
                BMInow={user.bmi}
                BMIstatus={BMIstatus}
                minWeight={minWeight}
                maxWeight={maxWeight}
                idealWeight={idealWeight}
                advice={advice}
                onReferPress={() => Linking.openURL('https://hebekery.vn/blogs/all')}
            >
                <TouchableOpacity onPress={() => setShowBmiModal(false)} style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Image
                        style={{ width: 26, height: 26 }}
                        source={require('./image/ic_x.png')} />
                </TouchableOpacity>
            </ModalBMI>

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
    errText: {
        color: 'red',
        marginHorizontal: 20
    }
})