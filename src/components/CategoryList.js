import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import CategoryItem from './CategoryItem';

// ... 10.01.2018 - MG - Not used at the moment ...
const CategoryList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.data}
      renderItem={(item) => (
        <CategoryItem
          categoryName={item.name}
          categoryDesc={item.desc}
          categoryIcon={item.icon}
          onItemPressed={() => props.onItemSelected(item.key)}
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
