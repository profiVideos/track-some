/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const styles = {
  loader: {
    flex: 1,
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
