import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputComponent from '../TextInput/TextInputComponent'
import ButtonComponent from '../Button/ButtonComponent'
import CheckBox from '@react-native-community/checkbox'

const ModalComponent = (props) => {
    return (
        <Modal
            visible={props.visible}
            transparent={true}
            animationType='fade'
            onRequestClose={props.onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer} >
                    <Text style={styles.modalTitle}>{props.modalTitle}</Text>
                    
                    {/* <View style={styles.checkboxContainer}>
                        <CheckBox value={props.isChecked} onValueChange={props.setIsChecked} />
                        <Text>{props.isChecked ? 'Complete' : 'Incomplete'}</Text>
                    </View> */}
                    {props.children}
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                        <ButtonComponent title={"Hủy"} onPress={props.onClose} style={{ backgroundColor: 'white', borderWidth: 2, borderColor: '#FD7278', flex: 1 }} btnTitleStyle={{color:'#FD7278'}}/>
                        <ButtonComponent title="Lưu" onPress={props.btnSavePress} style={{ flex: 1 }} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: 'black',
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#21CE9C'
    },
    txtStatus: {
        marginHorizontal: 10,
        fontSize: 20,
        color: 'black'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})