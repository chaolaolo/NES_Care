import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/Reducers/userReducer'

const AddFriends = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [listFriends, setListFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [requestStatuses, setRequestStatuses] = useState({});


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          dispatch(setUser(userData));
        } else {
          console.log('User does not exist.');
        }
      }, error => {
        console.log('Error fetching user data: ', error);
      });

    return () => unsubscribe();
  }, [user.uid, dispatch]);

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

  const filteredFriends = listFriends.filter(friend =>
    friend.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchRequestStatuses = async () => {
      const senderId = firebase.auth().currentUser.uid;
      const newRequestStatuses = {};

      for (const friend of listFriends) {
        const friendId = friend.id;
        const friendRequestSnapshot = await firebase.firestore().collection('FriendRequests')
          .where('senderId', '==', senderId)
          .where('receiverId', '==', friendId)
          .where('status', '==', 'pending')
          .get();

        newRequestStatuses[friendId] = !friendRequestSnapshot.empty;
      }

      setRequestStatuses(newRequestStatuses);
    };

    fetchRequestStatuses();
  }, [listFriends]);


  // Send requets
  const sendFriendRequest = async (receiverId) => {
    const senderId = firebase.auth().currentUser.uid;
    try {
      const exists = await requestStatuses[receiverId];
      if (exists) {
        console.log('Friend request already sent');
        return;
      }
      await firebase.firestore().collection('FriendRequests').add({
        senderId: senderId,
        receiverId: receiverId,
        status: 'pending',
      });
      setRequestStatuses(prevStatuses => ({ ...prevStatuses, [receiverId]: true }));
      console.log('Friend request sent successfully');
    } catch (error) {
      console.error('Error sending friend request: ', error);
    }
  };


  // Cancel send requets
  const cancelFriendRequest = async (receiverId) => {
    const senderId = firebase.auth().currentUser.uid;
    try {
      const friendRequestSnapshot = await firebase.firestore().collection('FriendRequests')
        .where('senderId', '==', senderId)
        .where('receiverId', '==', receiverId)
        .where('status', '==', 'pending')
        .get();

      if (!friendRequestSnapshot.empty) {
        friendRequestSnapshot.forEach(async doc => {
          await doc.ref.delete();
        });

        setRequestStatuses(prevStatuses => ({ ...prevStatuses, [receiverId]: false }));
        console.log('Friend request cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling friend request: ', error);
    }
  };

  const renderFriendItem = ({ item }) => {
    const requestSent = requestStatuses[item.id] || false;
    return (
      <View style={styles.itemContainer}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} style={styles.itemAvatar} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.fullName}</Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.itemGender}>{item.gender}</Text>
              <Text style={styles.itemAge}>{item.yearOfBirth || ''}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5 }}>
            <TouchableOpacity
              onPress={() => {
                if (requestSent) {
                  cancelFriendRequest(item.id);
                } else {
                  sendFriendRequest(item.id);
                }
              }}
              style={[styles.btnAddFriend, requestSent && { backgroundColor: 'gray' }]}
            // disabled={requestSent}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                {requestSent ? 'Hủy Lời Mời' : 'Gửi Lời Mời'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRemoveFriend}>
              <Text style={{ textAlign: 'center', color: '#21CE9C', fontWeight: 'bold' }}>Gỡ</Text>
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
        data={filteredFriends}
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
    color: '#432C81',
    marginHorizontal: 5
  },
  itemAge: {
    textAlign: 'center',
    color: '#432C81',
    marginHorizontal: 5
  },

  btnAddFriend: {
    backgroundColor: '#21CE9C',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  btnRemoveFriend: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  }
})