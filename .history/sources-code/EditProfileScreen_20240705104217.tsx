import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'

const EditProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Edit profile information" style={styles.headerContainer}>
                <Image source={require('./image/iconBack.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>

            <ScrollView style={{ backgroundColor: 'red', marginTop: 80, }}>
                    <View style={{ marginVertical: 4 }}>
                        <Text style={{ marginHorizontal: 10 }}>Full Name</Text>
                        <TextInputComponent placeholder="Full name" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    </View>
                    <View style={{ marginVertical: 4 }}>
                        <Text style={{ marginHorizontal: 10 }}>Date of birth</Text>
                        <TextInputComponent placeholder="Date of birth" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    </View>
                    <View style={{ marginVertical: 4 }}>
                        <Text style={{ marginHorizontal: 10 }}>Email</Text>
                        <TextInputComponent placeholder="Email" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    </View>
                    <View style={{ marginVertical: 4 }}>
                        <Text style={{ marginHorizontal: 10 }}>Gender</Text>
                        <TextInputComponent placeholder="Gender" tipStyle={{ height: 70, paddingLeft: 20 }} />
                    </View>

                <ButtonComponent title="Submit" style={{ paddingVertical: 18,matop
                    50
                 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        alignItems: 'center',
        // backgroundColor: '#E4F9F3',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2
    },

})