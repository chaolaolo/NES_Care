import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BlockComponent from '../Block/BlockComponent'

const ModalBMI = () => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            onRequestClose={true}
            visible={true}
        >
            <View style={styles.modalOverlay}>
                <BlockComponent style={styles.modalContainer}>

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