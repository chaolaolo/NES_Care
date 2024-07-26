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
                <BlockComponent style={styles.modalContainer}>
                    {...props}
                    <View>
                        <Text>CHỈ SỐ HIỆN TẠI CỦA BẠN LÀ</Text>
                        <Text>{props.BMInow}</Text>
                        <Text>{props.BMIstatus}</Text>
                    </View>
                    <View>
                        <Text>CÂN NẶNG LÝ TƯỞNG CỦA BẠN LÀ</Text>
                        <Text>{props.idealWeight}</Text>
                        <Text>kilogram</Text>
                    </View>
                </BlockComponent>
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