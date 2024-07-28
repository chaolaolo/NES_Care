import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MemoizedBlockComponent = React.memo(({ title, content }) => (
  <View style={styles.block}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
));

const styles = StyleSheet.create({
  block: {
    marginVertical: 10,
    paddingVertical: 20,
  },
  title: {
    color: '#432C81',
    fontSize: 16,
  },
  content: {
    color: '#7B6BA8',
    fontSize: 16,
  },
});

export default MemoizedBlockComponent;
