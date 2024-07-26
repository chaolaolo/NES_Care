import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BlockComponent from '../Block/BlockComponent'

const ModalBMI = (props) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            onRequestClose={props.onRequestClose}
            visible={props.visible}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {props.children}
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CHỈ SỐ HIỆN TẠI CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.BMInow}</Text>
                        <Text>{props.BMIstatus}</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG LÝ TƯỞNG CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.idealWeight}</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG TỐI ĐA CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.maxWeight}</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>CÂN NẶNG TỐI THIỂU CỦA BẠN LÀ</Text>
                        <Text style={styles.number}>{props.minWeight}</Text>
                        <Text>kilogram</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.title}>Lời khuyên dành cho bạn:</Text>
                        <Text style={{ textAlign: 'center', width: '90%' }}>{props.advice}Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos optio, repellat nulla distinctio maxime quis quidem, perferendis autem temporibus reprehenderit assumenda ex similique sed consequatur vero voluptates, facere at!</Text>
                    </View>
                  <TouchableOpacity style={{
                    backgroundColor:'#017F5C',
                    paddingHorizontal:20,
                    paddingVertical:20,
                    marginHorizontal:40,
                    marginTop:30,
                    alignItems:'center'
                  }}>
                    <Text style={{color:'white'}}>Refer to knowledge about nutrition</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalBMI

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingVertical: 40,
        marginHorizontal: 20,
        borderRadius: 16,
        shadowColor: 'black',
        elevation: 8
    },
    boxText: {
        alignItems: 'center'
    },
    title: {
        color: '#017F5C',
        fontWeight: 'bold',
        fontSize: 18
    },
    number: {
        color: '#FFA500',
        fontWeight: 'bold',
        fontSize: 18
    }
})