import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const FriendRequest = () => {
  const [listFriendRequest, setListFriendRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const uid = user.uid;
          const friendRequestsCollection = firestore().collection('FriendRequests');
          const snapshot = await friendRequestsCollection.where('receiverId', '==', uid).get();
          const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setListFriendRequest(requests);
        }
      } catch (error) {
        console.error("Error fetching friend requests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  // removeRequest
  const removeRequest = async (id) => {
    try {
      await firestore().collection('FriendRequests').doc(id).delete();
      // Update local state
      setListFriendRequest(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.error("Error removing friend request: ", error);
    }
  };

  // Chap Nhan loi moi
  const acceptRequest = async (requestId, senderId) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const uid = user.uid;
        const friendRequestsCollection = firestore().collection('FriendRequests');
        const senderRef = firestore().collection('Users').doc(senderId);
        const receiverRef = firestore().collection('Users').doc(uid);

        // Update "friends" field of sender and receiver
        await firestore().runTransaction(async (transaction) => {
          const senderDoc = await transaction.get(senderRef);
          const receiverDoc = await transaction.get(receiverRef);

          if (!senderDoc.exists || !receiverDoc.exists) {
            throw new Error("User does not exist!");
          }

          const senderFriends = senderDoc.data().friends || [];
          const receiverFriends = receiverDoc.data().friends || [];

          // Add each other to friends list
          if (!senderFriends.includes(uid)) {
            senderFriends.push(uid);
            transaction.update(senderRef, { friends: senderFriends });
          }
          if (!receiverFriends.includes(senderId)) {
            receiverFriends.push(senderId);
            transaction.update(receiverRef, { friends: receiverFriends });
          }
        });

        // Delete the friend request
        await friendRequestsCollection.doc(requestId).delete();

        // Update local state
        setListFriendRequest(prevRequests => prevRequests.filter(request => request.id !== requestId));
      }
    } catch (error) {
      console.error("Error accepting friend request: ", error);
    }
  };

  const renderRequestItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.avatar ? { uri: item.avatar } : require('../../image/ic_LeftinputUserName.png')} style={styles.itemAvatar} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName}>{item.senderName}</Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.itemGender}>{item.senderGender}</Text>
              <Text style={styles.itemAge}>{item.senderYOB || ''}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 5 }}>
            <TouchableOpacity
              onPress={() => acceptRequest(item.id, item.senderId)}
              style={styles.btnAddFriend}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                Chấp Nhận
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeRequest(item.id)}
              style={styles.btnRemoveFriend} >
              <Text style={{ textAlign: 'center', color: '#21CE9C', fontWeight: 'bold' }}>Gỡ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={'large'}
        />
      </SafeAreaView>
    );
  // }

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <FlatList
  //       data={listFriendRequest}
  //       keyExtractor={item => item.id.toString()}
  //       renderItem={renderRequestItem}
  //     />
  //   </SafeAreaView>
  // );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  requestItem: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2
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
});
