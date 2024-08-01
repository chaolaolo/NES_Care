import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'

const AddFriends = () => {
  const [listFriends, setListFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchFriends = async () => {
        try {
          const usersQuerySnapshot = await firestore()
            .collection('Users')
            .where('role', '==', 'User')
            .where('name', '>=', searchQuery)
            .where('name', '<=', searchQuery + '\uf8ff')
            .get()

          const usersList = usersQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          setListFriends(usersList)
        } catch (error) {
          console.error('Error fetching friends: ', error)
        }
      }

      fetchFriends()
    } else {
      setListFriends([])
    }
  }, [searchQuery])

  const renderFriendItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
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
  }
})