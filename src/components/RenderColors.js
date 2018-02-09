import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  colorSwatch: {
    elevation: 1,
    height: 40, //40,
    width: 52, //55,
    //margin: 2,
    borderRadius: 20,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  borderStyle: {
    height: 44,
    width: 56,
    margin: 1,
    borderRadius: 22,
    //borderColor: '#727272',
    borderWidth: 2
  }
});

const RenderColors = ({ myColors, activeColor, onPressColor }) => {
  const swatch = '   ';
  const myColorsContent = myColors.map((color, i) => {
    //console.log(color, activeColor);
    const activeBorder = (color === activeColor ? '#727272' : 'transparent');
    return (
      <TouchableHighlight 
        key={i}
        onPress={() => { onPressColor(color); }} 
        underlayColor='rgba(255,0,0,0.05)'
      >
        <View key={i} style={[styles.borderStyle, { borderColor: activeBorder }]}>
          <Text style={[styles.colorSwatch, { backgroundColor: `${color}` }]}>
            {swatch}
          </Text>
        </View> 
      </TouchableHighlight>
    );                          
  });
  return myColorsContent;
};

export default RenderColors;
