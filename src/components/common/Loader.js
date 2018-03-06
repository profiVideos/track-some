/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const styles = {
  loader: {
    //flex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 5,
    padding: 3,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Loader = ({ size }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size || 'small'} />
    </View>
  );
};

export default Loader;
