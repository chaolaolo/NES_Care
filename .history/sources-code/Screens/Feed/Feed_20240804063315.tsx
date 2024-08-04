import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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

  const [likedItems, setLikedItems] = useState({});

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

  const toggleLike = (itemId) => {
    setLikedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const renderItem = ({ item }) => {
    const isLiked = likedItems[item.id];
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 10, alignItems: 'center' }}>
          {item.friendDetails.avatar ? (
            <Image source={{ uri: item.friendDetails.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />  // Empty view for missing avatar
          )}
          <Text style={styles.friendName}>{item.friendDetails.fullName}</Text>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', width: 90, alignSelf: 'flex-end',alignItems:'center' }}>
          <Text style={{fontSize:30,marginHorizontal:2}}>0</Text>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Image
              source={isLiked
                ? require('../../image/ic_like.png')
                : require('../../image/ic_dislike.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <Image source={require('../../image/ic_share.png')} style={{ width: 40, height: 40 }} />
        </View>
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
    padding: 10,
    backgroundColor: 'rgba(237, 236, 244, 0.5)',
    marginVertical: 10
  },
  itemContent: {
    padding: 10,
    marginVertical: 10
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
    color: '#432C81',
    flex: 1
  }
});
