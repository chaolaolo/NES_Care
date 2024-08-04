import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';

const Feed = () => {
  const [listGrateful, setListGrateful] = useState([]);
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

        // Fetch public Thanks items where userId is in friends array
        const thanksSnapshot = await firestore()
          .collection('Thanks')
          .where('privacy', '==', 'Public')
          .where('uid', 'in', friends)
          .get();

        if (!thanksSnapshot.empty) {
          const gratefulList = thanksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        <Text>Null</Text>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  }
});
