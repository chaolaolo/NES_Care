import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const FriendRequest = () => {
  const [listFriendRequest, setListFriendRequest] = useState([])



  const renderRequestItem = ({ item }) => {
    return (
      <View>

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={listFriendRequest}
      keyExtractor={item => item.id.toString()}
      renderItem={renderRequestItem}
    />
  </SafeAreaView>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 10
  }
})