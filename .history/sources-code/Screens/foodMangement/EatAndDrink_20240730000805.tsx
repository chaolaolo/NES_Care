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
    const [imgExercise, setImgExercise] = useState([])
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
            setImgMenu(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapfaQHURT86176JNDr3WuuIINmPK_s34SxpaXhotDgaFrfQCRlcN_Jt8CS-Tl',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_EMWy2R3j9EW6mlaO5ZO80oXS9aey5yiAFjdlF8_GSo8iZiHCUWV0BaB5g7g',
                'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT0tmqG5T3VC-YtpkC4Zc88_KqRB1Uj6vld8Q99gLmgzX6ZG6-lzq3N8i1sxAfE'])
            setImgExercise([
                'https://vcdn1-suckhoe.vnecdn.net/2023/11/21/chi-huye-n-2-jpeg-1700552007-5071-1700555612.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=Z3xrKL_UjlJAiGGuBtWFsA',
                'https://tiki.vn/blog/wp-content/uploads/2023/09/tap-cardio-cuong-do-thap-1024x570.jpg'
            ])
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
            setImgMenu(['https://trungtamytedian.com/wp-content/uploads/2023/09/bua-an-day-du-chat-dinh-duong-gom-nhung-gi-1775.jpg',
                'https://cdn.tgdd.vn/Files/2021/01/18/1320904/carbohydrate-la-gi-va-carbohydrate-trong-loai-thuc-pham-nao-la-tot-202101181625174611.jpg',
                'https://file.hstatic.net/200000365241/file/nhom_bot_duong__5__4b5e6ee2dbe74051849a57e602ce9fcf_grande.jpg'

            ]);
            setImgExercise([
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xY2k43bSAMLvfhijXgQjBsYGgj5toGYTmQ&s',
                'https://file.hstatic.net/1000185761/file/nhin-doi-cardio-de-giam-can_9ebc4da964fb4726b07019187e831a9d.jpg'
            ])
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
            setImgMenu([
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUFsEFNqVwRl_Gni26EF_9s_0FsTNJvrdGw&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIczGl3rY8J297BTTHvui2l5LWUoE0uh8Og&s',
                'https://cdn.tgdd.vn/Files/2018/08/10/1108355/tet-nay-it-uong-ruou-bia-nhung-dung-quen-bao-ve-gan-than-bang-cac-thuc-pham-nay-202201051655221926.jpg'
            ]);
            setImgExercise([
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFCqtTixqEGwXur1Zv6vLAtk7rOil3IDc-SA&s',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMFALMp4mXAzMQF06g-a3U78uETqyaj3Kakw&s'
            ])
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
            setImgMenu([
                'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/9/20/chat-xo-16636918685181604230782.jpg',
                'https://cdn.eva.vn/upload/2-2024/images/2024-05-04/thi---t-k----ch--a-c---t--n--2--1714800966-904-width780height532.jpg',
                'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/4/17/rau-xanh-chat-xo-16817238898872098709375-189-0-681-940-crop-16817241256851213072045.png'
            ]);
            setImgExercise([
                'https://file.hstatic.net/1000288768/article/xe-dap-tap-02_b7a4790efc67444db24b734f39f94f2f_ae787cb95dad4872a6c6a19b976ca2fc.jpg',
                'https://kaitashi.com/media/news/1306_cac-bai-tap-cardio.jpg'
            ])
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
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9XVooXzhhO8UAYc1iIm0bf1jvqoO7s-Ueg&s',
                'https://hoanmy.com/wp-content/uploads/2023/07/thuc-pham-giam-can.jpg',
                'https://file.hstatic.net/1000185761/file/thuc-pham-it-calo.jpg'
            ]);
            setImgExercise([
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAv-UqNMP1MaaUAiQU2Pc2loBU2skXAHwrDg&s',
                'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/phai_nu_nen_di_boi_hay_tap_gym_co_the_ket_hop_hai_loai_hinh_nay_khong_1_8573a0c211.png'
            ])
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={{ uri: imgMenu[0] }} style={{ width: 100, height: 100 }} />
                        <Image source={{ uri: imgMenu[1] }} style={{ width: 100, height: 100 }} />
                        <Image source={{ uri: imgMenu[2] }} style={{ width: 100, height: 100 }} />
                    </View>
                </BlockComponent>
                <BlockComponent>
                    <Text style={styles.title}>Exercise suggestions</Text>
                    <Text style={styles.suggestions}>{ExerciseSuggestions}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image source={{ uri: imgExercise[0] }} style={{ width: 100, height: 100 }} />
                        <Image source={{ uri: imgExercise[1] }} style={{ width: 100, height: 100 }} />
                    </View>
                </BlockComponent>
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ color: '#432C81', fontSize: 18, marginHorizontal: 20 }}>Current BMI: {user.bmi}</Text>
                    <Text style={{ color: '#432C81', fontSize: 18, marginHorizontal: 20 }}>BMI status: {user.BMIstatus}</Text>
                    <ButtonComponent title='UPDATE BMI' onPress={() => navigation.navigate('CalculateBMIScreen')} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text onPress={() => navigation.navigate('MyWebView',{ url: 'https://hebekery.vn/blogs/all' })} style={{ fontSize: 16, color: '#5198FF', textDecorationLine: 'underline' }}>Tham khảo kiến thức về dinh dưỡng</Text>
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