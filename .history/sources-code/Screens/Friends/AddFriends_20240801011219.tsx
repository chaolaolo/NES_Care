import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const AddFriends = () => {
  const [listFriends, setListFriends] = useState([])


  const renderFriendItem = ({ item }) => {
    return (
      <View>

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listFriends}
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
    backgroundColor: 'gray',
    padding: 10
  }
})