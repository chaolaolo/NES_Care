import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BlockComponent from '../Block/BlockComponent'

const ModalBMI = (props) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            onRequestClose={true}
            visible={true}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* {...props.children} */}
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CHỈ SỐ HIỆN TẠI CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.BMInow}a</Text>
                        <Text>{props.BMIstatus}a</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG LÝ TƯỞNG CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.idealWeight}a</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG TỐI ĐA CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.maxWeight}a</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG TỐI THIỂU CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.minWeight}a</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>Lời khuyên dành cho bạn:</Text>
                        <Text style={{textAlign:'center',width:'90%'}}>{props.advice}Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos optio, repellat nulla distinctio maxime quis quidem, perferendis autem temporibus reprehenderit assumenda ex similique sed consequatur vero voluptates, facere at!</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalBMI

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingVertical: 40,
        marginHorizontal: 20,
        borderRadius:16,
        shadowColor:'black',
        elevation:8
    },
    boxText: {
        alignItems: 'center'
    },
    title: {
        color: '#017F5C',
        fontWeight: 'bold',
        fontSize:18
    },
    number: {
        color: '#FFA500',
        fontWeight: 'bold',
        fontSize:18
    }
})