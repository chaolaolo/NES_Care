import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';

const Feed = () => {
  const [listGrateful, setListGrateful] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState({});
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

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
    const fetchData = async () => {
      try {
        // Fetch friends of the current user
        const userDoc = await firestore().collection('Users').doc(user.uid).get();
        const userData = userDoc.data();
        const friends = userData.friends || [];

        // Fetch details of friends
        const friendsSnapshot = await firestore()
          .collection('Users')
          .where('uid', 'in', friends)
          .get();

        const friendsMap = {};
        friendsSnapshot.forEach(doc => {
          const friendData = doc.data();
          friendsMap[friendData.uid] = {
            avatar: friendData.avatar,
            fullName: friendData.fullName
          };
        });
        setFriendsDetails(friendsMap);

        // Fetch public Thanks items where userId is in friends array
        const thanksSnapshot = await firestore()
          .collection('Thanks')
          .where('privacy', '==', 'Public')
          .where('uid', 'in', friends)
          .get();

        if (!thanksSnapshot.empty) {
          const gratefulList = thanksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            friendDetails: friendsMap[doc.data().uid] || {}
          }));
          setListGrateful(gratefulList);
        } else {
          setListGrateful([]);
        }
      } catch (error) {
        console.log('Error fetching grateful data: ', error);
      }
    };

    fetchData();
  }, [user.uid]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {item.friendDetails.avatar ? (
          <Image source={{ uri: item.friendDetails.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />  // Empty view for missing avatar
        )}
        <Text style={styles.friendName}>{item.friendDetails.fullName}</Text>
        <Text style={styles.itemText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {listGrateful.length > 0 ? (
        <FlatList
          data={listGrateful}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text>No grateful posts found.</Text>
      )}
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDECF4',
    marginRight: 10
  },
  friendName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1
  }
});
