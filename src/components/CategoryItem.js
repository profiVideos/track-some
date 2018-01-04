import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CategoryItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.categoryItem}>
      <Image resizeMode="cover" source={props.categoryIcon} style={styles.categoryIcon} />
      <Text>{props.categoryName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    width: '100%',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryIcon: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default CategoryItem;
