import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CategoryItem from './CategoryItem';

const CategoryList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.categories}
      renderItem={(info) => (
        <CategoryItem
          categoryName={info.item.name}
          categoryIcon={info.item.icon}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
});

export default CategoryList;
