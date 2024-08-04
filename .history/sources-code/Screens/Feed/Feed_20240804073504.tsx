
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';
import { ActivityIndicator } from 'react-native';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import { useNavigation } from '@react-navigation/native';

const Feed = () => {
  const navigation = useNavigation();
  const [listGrateful, setListGrateful] = useState([]);
  const [friendsDetails, setFriendsDetails] = useState({});
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [likedItems, setLikedItems] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
          setIsLoading(false);
          const gratefulList = thanksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            friendDetails: friendsMap[doc.data().uid] || {}
          }));
          setListGrateful(gratefulList);

          // Initialize like counts
          const initialLikeCounts = {};
          gratefulList.forEach(item => {
            initialLikeCounts[item.id] = item.likeCount || 0; // Default to 0 if likeCount is undefined
          });
          setLikeCounts(initialLikeCounts);
        } else {
          setIsLoading(false);
          setListGrateful([]);
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error fetching grateful data: ', error);
      }
    };

    fetchData();
  }, [user.uid]);

  const toggleLike = async (itemId, isLiked) => {
    const newLikedItems = { ...likedItems, [itemId]: !isLiked };
    setLikedItems(newLikedItems);

    const newLikeCounts = { ...likeCounts };
    newLikeCounts[itemId] = isLiked ? (newLikeCounts[itemId] - 1) : (newLikeCounts[itemId] + 1);
    setLikeCounts(newLikeCounts);

    try {
      await firestore().collection('Thanks').doc(itemId).update({
        likeCount: newLikeCounts[itemId]
      });
    } catch (error) {
      console.log('Error updating like count: ', error);
    }
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
          <Text style={styles.friendName}>{item.timestamp}</Text>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', width: 90, marginRight: 10, alignSelf: 'flex-end', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, marginHorizontal: 2 }}>{likeCounts[item.id] || 0}</Text>
          <TouchableOpacity onPress={() => toggleLike(item.id, isLiked)}>
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

      <HeaderComponent style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image style={{ width: 30, height: 30 }} source={require('../../image/ic_drawer_menu.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeaderTitle}>Nội dung mới</Text>
      </HeaderComponent>

      {isLoading ? (
        <View style={{ position: 'absolute', width: '120%', height: '100%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (

        listGrateful.length > 0 ? (
          <FlatList
            data={listGrateful}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom:100}}
          />
        ) : (
          <View style={{ position: 'absolute', width: '120%', height: '100%', backgroundColor: 'white', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Chưa chó nội dung từ bạn bè</Text>
          </View>
        )

      )}

    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop:70
  },
  itemContainer: {
    padding: 10,
    backgroundColor: 'rgba(237, 236, 244, 0.5)',
    marginVertical: 10,
    borderRadius: 10
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
    fontSize: 18,
    color: '#432C81',
    flex: 1
  },
  headerContainer: {
    alignItems: 'center',
    // backgroundColor: '#E4F9F3',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    zIndex: 3,
    justifyContent: 'space-between',
    // flexDirection: 'row',
},
txtHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#432C81',
    textAlign: 'center',
    flex: 1,
    paddingRight: 30
},
});
