import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ModalBMI = () => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            onRequestClose={true}
            visible={false}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>

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