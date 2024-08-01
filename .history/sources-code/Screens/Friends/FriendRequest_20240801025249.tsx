import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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

  const renderRequestItem = ({ item }) => {
    return (
      <View style={styles.requestItem}>
        <Text>{item.fullName}</Text>
         {/* Hiển thị tên người gửi */}
        {/* Bạn có thể thêm các thông tin khác và nút hành động ở đây */}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listFriendRequest}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRequestItem}
      />
    </SafeAreaView>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 10
  },
  requestItem: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2
  }
});
