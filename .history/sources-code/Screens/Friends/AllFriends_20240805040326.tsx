import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native'

const AllFriends = () => {
  const [listAllFriend, setListAllFriend] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllFriends = async () => {
      try {
        const user = auth().currentUser
        if (user) {
          const uid = user.uid
          const userDoc = await firestore().collection('Users').doc(uid).get()
          const userData = userDoc.data()
          if (userData && userData.friends) {
            const friendsIds = userData.friends
            // Fetch all friends' documents
            const friendsCollection = firestore().collection('Users')
            const friendsDocs = await Promise.all(friendsIds.map(id => friendsCollection.doc(id).get()))
            const friendsList = friendsDocs.map(doc => ({ id: doc.id, ...doc.data() }))
            setListAllFriend(friendsList)
          }
        }
      } catch (error) {
        console.error("Error fetching friends: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllFriends()
  }, [])


  const unfriend = async (friendId) => {
    try {
      const user = auth().currentUser
      if (user) {
        const uid = user.uid
        await firestore().collection('Users').doc(uid).update({
          friends: firestore.FieldValue.arrayRemove(friendId)
        })
        setListAllFriend(listAllFriend.filter(friend => friend.id !== friendId))
      }
    } catch (error) {
      console.error("Error unfriending: ", error)
    }
  }

  const confirmUnfriend = (friendId) => {
    Alert.alert(
      "Hủy kết bạn",
      "Bạn chắc chắn hủy kết bạn với người này?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đúng",
          onPress: () => unfriend(friendId)
        }
      ],
      { cancelable: false }
    )
  }

  const renderFriendItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} style={styles.itemAvatar} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.fullName}</Text>
          <Text style={styles.itemEmail}>{item.email}</Text>
        </View>
        <TouchableOpacity onPress={() => confirmUnfriend(item.id)}>
          <Text>Hủy kết bạn</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={'large'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {listAllFriend.length > 0 ? (
        <FlatList
          data={listAllFriend}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFriendItem}
        />
      ) : (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <Text style={{ fontSize: 18 }}>Bạn chưa có bạn bè nào</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default AllFriends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowRadius: 9,
    shadowOffset: { width: 4, height: 10 }

  },
  itemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightgray',
    marginRight: 10
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#432C81'
  },
  itemEmail: {
    fontSize: 14,
    color: '#432C81'
  }
})