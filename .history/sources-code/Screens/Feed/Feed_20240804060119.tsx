import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'

const Feed = () => {
  const [listGrateful, setListGrateful] = useState('')



  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>Item</Text>
      </View>
    )
  }
  return (
    <SafeAreaView>
      <Text></Text>
      <FlatList
        data={listGrateful}
        keyExtractor={Item => Item.id}
        renderItem={renderItem} />
    </SafeAreaView>
  )
}

export default Feed

const styles = StyleSheet.create({})