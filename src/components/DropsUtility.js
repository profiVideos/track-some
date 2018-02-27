import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  //Text,
  StyleSheet,
  //TouchableHighlight,
} from 'react-native';
//import AppColors from '../templates/appColors';

const styles = StyleSheet.create({
  extraInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 20
  },
  badgeStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

const RenderCheckedBadge = (props) => {
  return (
    <View 
      style={[styles.extraInfo, { 
        backgroundColor: 'blue', 
        marginLeft: props.marginLeft, 
        marginTop: props.marginTop 
      }]}
    >
      <Icon name='check' style={styles.badgeStyle} />
    </View>
  );
};
export default RenderCheckedBadge;
