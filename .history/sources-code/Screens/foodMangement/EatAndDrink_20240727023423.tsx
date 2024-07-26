import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../components/Header/HeaderComponent'
import { useNavigation } from '@react-navigation/native';
import BlockComponent from '../../../components/Block/BlockComponent';

const EatAndDrink = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ width: 34, height: 34, marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Eats and Drinks</Text>
            </HeaderComponent>
            <ScrollView style={{ backgroundColor: '#EDECF4', width: '100%', marginTop: 78, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <BlockComponent>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Menu suggestions</Text>
                    </View>
                </BlockComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EatAndDrink

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        // backgroundColor: '#E4F9F3',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginLeft: -20
    },
    title: {
        fontSize: 22,
        color: '#432C81',
        fontWeight: 'bold'
    },
})