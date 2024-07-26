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
        marginHorizontal: 20
    },
    boxText: {
        alignItems: 'center'
    },
    title: {
        color: 'green',
        fontWeight: 'bold'
    },
    number:{
        color:'yellow',
        fontWeight:'bold'
    }
})