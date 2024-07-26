import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/Header/HeaderComponent'
import TextInputComponent from '../components/TextInput/TextInputComponent'
import ButtonComponent from '../components/Button/ButtonComponent'
import { useSelector } from 'react-redux'

const EditProfileScreen = () => {
    const user = useSelector(state => state.user.user);
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Edit profile information" style={styles.headerContainer}>
                <Image source={require('./image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginTop: 16, marginLeft: 10 }} />
            </HeaderComponent>

            <View style={{ marginTop: 60, }}>
                <View style={{ marginVertical: 4 }}>
                    <Text style={{ marginHorizontal: 10 }}>Full Name</Text>
                    <TextInputComponent placeholder="Full name" value={user.fullName} tipStyle={{ height: 70, paddingLeft: 20 }} />
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

              
            </View>
            <ButtonComponent title="Submit" style={{
                    paddingVertical: 18,  
                }} />
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'space-evenly',
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