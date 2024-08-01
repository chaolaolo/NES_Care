import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { TouchableOpacity } from 'react-native'

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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
              <Text style={styles.itemGender}>{item.gender}</Text>
              <Text style={styles.itemAge}>{item.yearOfBirth || ''}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly',marginVertical:5 }}>
            <TouchableOpacity style={styles.btnAddFriend}>
              <Text style={{ textAlign: 'center',color:'white',fontWeight:'bold' }}>Gửi Lời Mời</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRemoveFriend}>
              <Text style={{ textAlign: 'center',color:'#21CE9C',fontWeight:'bold' }}>Gỡ</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemAvatar: {
    width: 80, height: 80,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    marginRight: 10
  },
  itemName: {
    color: '#432C81',
    fontSize: 20,
    fontWeight: 'bold'

  },
  itemGender: {
    textAlign: 'center',
    color: '#432C81'
  },
  itemAge: {
    textAlign: 'center',
    color: '#432C81',
    backgroundColor:'red'

  },

  btnAddFriend: {
    backgroundColor: '#21CE9C',
    flex: 1,
    marginHorizontal:5,
    paddingVertical: 5,
  },
  btnRemoveFriend: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    marginHorizontal:5,
    paddingVertical: 5,

  }
})