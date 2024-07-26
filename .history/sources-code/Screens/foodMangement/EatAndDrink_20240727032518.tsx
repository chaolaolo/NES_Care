import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { useNavigation } from '@react-navigation/native';
import BlockComponent from '../../../components/Block/BlockComponent';
import ButtonComponent from '../../../components/Button/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

const EatAndDrink = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const [imgMenu, setImgMenu] = useState('')
    const [menuSuggestions, setMenuSuggestions] = useState('')
    const [ExerciseSuggestions, setExerciseSuggestions] = useState('')

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
            setMenuSuggestions(
                '- Gợi ý thực phẩm:\n' +
                '+ Trứng,Thịt bò, thịt gà, thịt lợn nạc,Cá hồi, cá ngừ, cá thu... \n' +
                '+ Các loại hạt và quả hạch: Hạnh nhân, óc chó, hạt điều, hạt bí... cung cấp nhiều calo, protein và chất béo tốt cho cơ thể.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn nhiều bữa nhỏ trong ngày - Tránh bỏ bữa: Chia nhỏ các bữa ăn để cơ thể luôn được cung cấp năng lượng.\n' +
                '+ Ưu tiên các thực phẩm giàu calo, Uống đủ nước, Bổ sung thêm các loại vitamin và khoáng chất\n'
            )
            setExerciseSuggestions(
                '- \n' +
                '- \n' +
                '- \n' +
                '- \n' +
                '- \n'
            )
        } else if (user.bmi >= 18.5 && user.bmi < 24.9) {

        } else if (user.bmi >= 25 && user.bmi < 29.9) {

        } else if (user.bmi >= 30 && user.bmi < 34.9) {

        } else {

        }
    }, [user.bmi])


    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Eats and Drinks</Text>
            </HeaderComponent>
            <ScrollView style={{ backgroundColor: '#EDECF4', width: '100%', marginTop: 78, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <BlockComponent>
                    <Text style={styles.title}>Menu suggestions</Text>
                    <Text style={styles.suggestions}>{menuSuggestions}</Text>
                </BlockComponent>
                <BlockComponent>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Exercise suggestions</Text>
                    </View>
                </BlockComponent>
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ color: '#432C81', fontSize: 18, marginHorizontal: 20 }}>Current BMI: {user.bmi}</Text>
                    <Text style={{ color: '#432C81', fontSize: 18, marginHorizontal: 20 }}>BMI status: {user.BMIstatus}</Text>
                    <ButtonComponent title='UPDATE BMI' onPress={() => navigation.navigate('CalculateBMIScreen')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EatAndDrink

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        // backgroundColor: '#E4F9F3',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginLeft: -20
    },
    title: {
        fontSize: 22,
        color: '#432C81',
        fontWeight: 'bold'
    },
    suggestions: {
        fontSize: 16,
        color: '#432C81',
    }
})