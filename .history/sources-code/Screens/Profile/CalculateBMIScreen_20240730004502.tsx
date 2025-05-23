import { Alert, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../../components/Button/ButtonComponent'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import ModalBMI from '../../../components/Modal/ModalBMI'

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
    const [helpfulAdvice, setHelpfulAdvice] = useState('');
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
            let status = '';
            let av;
            if (parseFloat(calculatedBMI) < 18.5) {
                status = 'Underweight';
                av = ('Bạn đang thiếu cân, bạn nên ăn nhiều bữa nhỏ trong ngày thay vì ba bữa chính.');
                setHelpfulAdvice(
                    '- Ăn nhiều bữa nhỏ trong ngày thay vì ba bữa chính. \n' +
                    '- Chọn thực phẩm giàu calo và chất dinh dưỡng, bao gồm trái cây, rau, ngũ cốc nguyên hạt, protein nạc và chất béo lành mạnh. \n' +
                    '- Uống nhiều sữa và các sản phẩm từ sữa. \n' +
                    '- Tập thể dục thường xuyên, nhưng tránh tập luyện quá sức.'
                );
            } else if (parseFloat(calculatedBMI) >= 18.5 && parseFloat(calculatedBMI) < 24.9) {
                status = 'Normal weight';
                av = ('Hãy duy trì lối sống lành mạnh để giữ gìn cân nặng và sức khỏe tốt.')
                setHelpfulAdvice(
                    '-  Ăn uống cân bằng và đầy đủ dinh dưỡng.\n' +
                    '-  Tập thể dục ít nhất 30 phút mỗi ngày, hầu hết các ngày trong tuần.\n' +
                    '-  Ngủ đủ giấc và kiểm soát căng thẳng.\n' +
                    '-  Tránh hút thuốc lá và hạn chế uống rượu bia.'
                );
            } else if (parseFloat(calculatedBMI) >= 25 && parseFloat(calculatedBMI) < 29.9) {
                status = 'Overweight';
                av = ('Bạn nên giảm cân để giảm nguy cơ mắc các bệnh mãn tính như bệnh tim, đột quỵ, tiểu đường loại 2 và một số loại ung thư.')
                setHelpfulAdvice(
                    '-  Tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng để xây dựng kế hoạch giảm cân an toàn và hiệu quả.\n' +
                    '-  Ăn ít calo hơn và tập thể dục nhiều hơn.\n' +
                    '-  Chọn thực phẩm lành mạnh và hạn chế thực phẩm chế biến sẵn, đồ ngọt và đồ ăn nhanh.\n' +
                    '-  Thay đổi lối sống, chẳng hạn như ăn chậm nhai kỹ, kiểm soát khẩu phần ăn và tăng cường hoạt động thể chất trong ngày.\n'
                );
            } else if (parseFloat(calculatedBMI) >= 30 && parseFloat(calculatedBMI) < 34.9) {
                status = 'Obesity';
                av = ('Bạn nên giảm cân càng sớm càng tốt để cải thiện sức khỏe và giảm nguy cơ mắc các bệnh nghiêm trọng.')
                setHelpfulAdvice(
                    '-  Tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng để được tư vấn và điều trị phù hợp.\n' +
                    '-  Có thể áp dụng các biện pháp như thay đổi chế độ ăn uống, tập thể dục, sử dụng thuốc hoặc phẫu thuật (trong một số trường hợp).\n' +
                    '-  Tham gia các chương trình hỗ trợ giảm cân hoặc nhóm hỗ trợ để có thêm động lực và sự chia sẻ kinh nghiệm.\n'
                );
            } else {
                status = 'Extremly obsese';
                av = ('Rất cần giảm cân. Cần có sự theo dõi và hỗ trợ của bác sĩ. Chế độ ăn uống và tập luyện cần được điều chỉnh cẩn thận.');
                setHelpfulAdvice(
                    '- Giảm cân khẩn cấp: Cần có sự hỗ trợ của bác sĩ và chuyên gia dinh dưỡng.\n' +
                    '- Thay đổi lối sống: Điều chỉnh chế độ ăn uống, tăng cường hoạt động thể chất, ngủ đủ giấc.\n' +
                    '- Điều trị các bệnh kèm theo: Nếu có các bệnh lý như tiểu đường, huyết áp cao, cần điều trị đồng thời.');
            }
            setBMIstatus(status);
            setAdvice(av);
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
                    // uid: user.uid,
                    // fullName: user.fullName || '',
                    // dateOfBirth: user.dateOfBirth || '',
                    // gender: user.gender || '',
                    // email: user.email || '',
                    ...user,
                    height,
                    weight,
                    bmi: calculatedBMI,
                    advice: av,
                    BMIstatus: status || '',
                    // avatar: user.avatar || ''
                };

                await firestore().collection('Users').doc(user.uid).set(userData);

                setShowBmiModal(true);

            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Calculate BMI" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
                </TouchableOpacity>
            </HeaderComponent>

            <View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Chiều cao(cm)</Text>
                    <TextInputComponent
                        value={height}
                        onChangeText={setHeight}
                        placeholder="Height(cm)" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    {errHeight ? <Text style={styles.errText}>{errHeight}</Text> : null}
                </View>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Cân nặng(kg)</Text>
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
                        placeholder="Chỉ số BMI" tipStyle={{ height: 70, paddingLeft: 20 }} />
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
                advice={helpfulAdvice}
                // onReferPress={() => Linking.openURL('https://hebekery.vn/blogs/all')}
                onReferPress={() => navigation.navigate('MyWebView', { url: 'https://hebekery.vn/blogs/all' })}
            >
                <TouchableOpacity onPress={() => setShowBmiModal(false)} style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Image
                        style={{ width: 26, height: 26 }}
                        source={require('../../image/ic_x.png')} />
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