import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import AppColors from '../templates/appColors';

const styles = StyleSheet.create({
  smallDot: {
    fontSize: 5,
    color: '#ccc',
    paddingRight: 3,
  },
  tagItem: {
    elevation: 1,
    padding: 3,
    paddingLeft: 4,
    paddingRight: 6,
    margin: 3,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    backgroundColor: AppColors.hiliteColor,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  textValue: {
    color: 'black',
    fontSize: 11,
    fontWeight: '500',
    paddingRight: 5,
  }
});

const RenderTags = (props) => {
  const showDeleteIcon = (props.noRemove === true ? <Text /> :
          <Icon size={13} name='times-circle' color={AppColors.accentColor} />);
  const myTagsContent = props.myTags.map((tag, i) => {
    return (
      <TouchableHighlight 
        key={i} 
        onPress={() => { props.onPressTag(tag); }} 
        style={styles.tagItem} 
        underlayColor='rgba(255,0,0,0.05)'
      >
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Text style={styles.smallDot}>⚫</Text>
          <Text style={styles.textValue}>{ tag }</Text>
          {showDeleteIcon}
        </View> 
      </TouchableHighlight>
    );                          
  });
  return myTagsContent;
};

export default RenderTags;
