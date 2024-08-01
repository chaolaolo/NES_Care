import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComponent from '../../../components/TextInput/TextInputComponent'

const AddFriends = () => {
  const [listFriends, setListFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')


  const renderFriendItem = ({ item }) => {
    return (
      <View>

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 19 }}>
        <TextInputComponent
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Email" tipStyle={{ height: 70, paddingLeft: 60 }} />
        <Image source={require('../../image/ic_LeftinputEmail.png')} style={styles.icsearch} />
      </View>
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
  },
  icsearch: {
    position: 'absolute',
    marginVertical: 24,
    // marginLeft: 20,
    width: 30,
    height: 30
  }
})