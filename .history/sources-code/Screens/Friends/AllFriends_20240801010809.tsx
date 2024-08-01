import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const AllFriends = () => {

  const [listAllFriend, setListAllFriend] = useState([])

  const renderFriendItem = ({ item }) => {
    return (
      <View>

      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listAllFriend}
        keyExtractor={item => item.id.toString()}
        renderItem={renderFriendItem}
      />
    </SafeAreaView>
  )
}

export default AllFriends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  }
})