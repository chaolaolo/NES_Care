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
                        <Text>{props.BMInow}a</Text>
                        <Text>{props.BMIstatus}a</Text>
                    </View>
                    <View>
                        <Text>CÂN NẶNG LÝ TƯỞNG CỦA BẠN LÀ</Text>
                        <Text>{props.idealWeight}a</Text>
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
        backgroundColor: 'gray'
    }
})