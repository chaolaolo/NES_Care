import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'

const AddFriends = () => {
  const [listFriends, setListFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firebase.firestore().collection('Users').get();
        const usersList = usersCollection.docs.map(doc => {
          const data = doc.data();
          const yearOfBirth = new Date(data.dateOfBirth).getFullYear();
          return { id: doc.id, ...data, yearOfBirth };
        });
        setListFriends(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);



  const renderFriendItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} style={styles.itemAvatar} />
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <Text style={styles.itemName}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.genderText}>Giới tính: {item.gender}</Text>
              <Text style={styles.itemAge}> {item.yearOfBirth}</Text>
            </View>
          </View>
          <View style={{flex:1}}>

          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 19 }}>
        <TextInputComponent
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Nhập tên bạn bè.."
          tipStyle={{ height: 70, paddingLeft: 20 }} />
        <Image source={require('../../image/ic_search.png')} style={styles.icsearch} />
      </View>
      <FlatList
        data={listFriends}
        keyExtractor={item => item.id.toString()}
        renderItem={renderFriendItem}
      />
    </SafeAreaView>
  )
}

export default AddFriends

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  icsearch: {
    position: 'absolute',
    marginVertical: 24,
    width: 36,
    height: 36,
    right: 20
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row'
  },
  itemAvatar: {
    width: 70, height: 70,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    marginRight: 10
  }
})