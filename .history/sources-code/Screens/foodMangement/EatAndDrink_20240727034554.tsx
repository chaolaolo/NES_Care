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

    const [imgMenu, setImgMenu] = useState([])
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
                '+ Trứng,Thịt bò, thịt gà, thịt lợn, các loại cá... \n' +
                '+ Hạnh nhân, óc chó, hạt điều, hạt bí... cung cấp nhiều calo, protein và chất béo tốt cho cơ thể.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn nhiều bữa nhỏ trong ngày: Chia nhỏ các bữa ăn để cơ thể luôn được cung cấp năng lượng.\n' +
                '+ Ưu tiên các thực phẩm giàu calo, Uống đủ nước, Bổ sung thêm các loại vitamin và khoáng chất\n'
            )
            setExerciseSuggestions(
                '- Tập các bài tập nhẹ nhàng như yoga, đi bộ, thể dục thẩm mỹ\n' +
                '- Tránh các bài tập cường độ cao và quá nặng\n' +
                '- Tập trung vào việc tăng cường sức khỏe tổng thể\n'
            );
            // const listImgMenu = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapfaQHURT86176JNDr3WuuIINmPK_s34SxpaXhotDgaFrfQCRlcN_Jt8CS-Tl',
            //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_EMWy2R3j9EW6mlaO5ZO80oXS9aey5yiAFjdlF8_GSo8iZiHCUWV0BaB5g7g',
            //     'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0tmqG5T3VC-YtpkC4Zc88_KqRB1Uj6vld8Q99gLmgzX6ZG6-lzq3N8i1sxAfE']
            setImgMenu(['https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0tmqG5T3VC-YtpkC4Zc88_KqRB1Uj6vld8Q99gLmgzX6ZG6-lzq3N8i1sxAfE']);
        } else if (user.bmi >= 18.5 && user.bmi < 24.9) {
            setMenuSuggestions(
                '- Gợi ý thực phẩm:\n' +
                '+ Ăn đủ chất dinh dưỡng với đầy đủ protein, chất béo, và carbohydrate.\n' +
                '+ Các loại thực phẩm như rau xanh, trái cây, thịt nạc, cá, các loại hạt và dầu ô liu.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn đủ 3 bữa chính và 2 bữa phụ trong ngày.\n' +
                '+ Uống đủ nước và bổ sung vitamin và khoáng chất cần thiết.\n'
            );
            setExerciseSuggestions(
                '- Tập luyện đều đặn với các bài tập cardio, strength training và flexibility exercises.\n' +
                '- Chú trọng vào việc duy trì cân nặng và sức khỏe tổng thể.\n'
            );
        } else if (user.bmi >= 25 && user.bmi < 29.9) {
            setMenuSuggestions(
                '- Gợi ý thực phẩm:\n' +
                '+ Tăng cường rau xanh, trái cây và các loại thực phẩm ít calo.\n' +
                '+ Hạn chế thức ăn nhanh, đồ ngọt và thức uống có ga.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn nhiều bữa nhỏ và hạn chế ăn vặt.\n' +
                '+ Uống đủ nước và tập trung vào việc giảm lượng calo tiêu thụ.\n'
            );
            setExerciseSuggestions(
                '- Tập các bài tập cardio như chạy bộ, bơi lội, đạp xe.\n' +
                '- Kết hợp với các bài tập strength training để tăng cơ.\n'
            );
        } else if (user.bmi >= 30 && user.bmi < 34.9) {
            setMenuSuggestions(
                '- Gợi ý thực phẩm:\n' +
                '+ Ăn nhiều rau xanh, trái cây, và các loại thực phẩm ít calo, nhiều chất xơ.\n' +
                '+ Tránh thức ăn nhanh, đồ ngọt và thức uống có ga.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn nhiều bữa nhỏ và hạn chế ăn vặt.\n' +
                '+ Uống đủ nước và tập trung vào việc giảm lượng calo tiêu thụ.\n'
            );
            setExerciseSuggestions(
                '- Tập các bài tập cardio như đi bộ, bơi lội, đạp xe.\n' +
                '- Kết hợp với các bài tập nhẹ nhàng như yoga.\n'
            );
        } else {
            setMenuSuggestions(
                '- Gợi ý thực phẩm:\n' +
                '+ Ăn nhiều rau xanh, trái cây, và các loại thực phẩm ít calo, nhiều chất xơ.\n' +
                '+ Tránh thức ăn nhanh, đồ ngọt và thức uống có ga.\n' +
                '- Gợi ý Chế độ ăn uống:\n' +
                '+ Ăn nhiều bữa nhỏ và hạn chế ăn vặt.\n' +
                '+ Uống đủ nước và tập trung vào việc giảm lượng calo tiêu thụ.\n'
            );
            setExerciseSuggestions(
                '- Tập các bài tập cardio như đi bộ, bơi lội, đạp xe.\n' +
                '- Kết hợp với các bài tập nhẹ nhàng như yoga.\n'
            );
            setImgMenu([
                'https://example.com/image8.jpg',
                'https://example.com/image9.jpg'
            ]);
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
                    <Image source={{ uri: imgMenu[0] }} />
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