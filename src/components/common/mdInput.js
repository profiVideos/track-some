/**
 * React Native Class
 * mdInput - Material Design Input
 * based on TextInput from ....
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextField from 'react-native-material-textinput';
import AppColors from '../../templates/appColors';

// ... make a component ...
class mdInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localVal: props.value   // ... make a copy of passed input var ... 
    };
  }

/*
  componentWillMount() {
    this.props.navigator.toggleTabs({
        to: 'hidden',
        animate: true,
    });
  }

alt-text
Normal spacing
Padding above label: 16dp
Padding below label: 8dp
Padding above text input line: 8dp
Padding below text input line: 8dp

alt-text
Dense spacing
Padding above label: 8dp
Padding below label: 4dp
Padding above text input line: 8dp
Padding below text input line: 4dp

          underlineColor={this.props.darkInput ? 'gray' : '#c3c3c3'}
          underlineActiveColor={this.props.darkInput ? AppColors.accentColor 
                                                     : AppColors.accentColor} 

*/
  render() {
    //console.log(`Style: ${this.props.style}`);
    const ulineColor = this.props.darkInput ? 'gray' : '#c3c3c3';
    const ulineActiveColor = this.props.darkInput ? AppColors.accentColor : AppColors.accentColor;
    return (
      <View 
        style={this.props.darkInput ? 
          [styles.darkContainerStyle, this.props.style] : 
          [styles.lightContainerStyle, this.props.style]}
      >
        <TextField 
          //style={this.props.style}  // ... doesn't appear to work ...
          //containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          //inputContainerStyle={{ padding: 24, margin: 24 }}
          labelColor={this.props.darkInput ? AppColors.accentColor : AppColors.mainLiteColor}
          color={this.props.darkInput ? AppColors.hiliteColor : '#333'}
          fontSize={16}
          //marginLeft={2}
          //marginRight={2}
          paddingBottom={this.props.dense ? 2 : 4}
          //paddingTop={this.props.dense ? 20 : 40}
          //labelPadding={16}
          //inputContainerPadding={this.props.dense ? 8 : 16}
          labelActiveColor={this.props.darkInput ? AppColors.accentColor : AppColors.darkerColor}
          labelActiveScale={0.70}
          autoCorrect={false}
          disableFullscreenUI
          underlineColor={this.props.dense ? 'transparent' : ulineColor}
          underlineActiveColor={this.props.dense ? 'transparent' : ulineActiveColor} 
          underlineColorAndroid='transparent'
          {...this.props}
        />
      </View>
    );
  }
}
/*
          style={[this.props.darkInput ? styles.darkInputStyle 
                                       : styles.lightInputStyle, this.props.style]}
*/
const styles = StyleSheet.create({
  darkContainerStyle: {
    //width: '80%',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
    borderColor: '#929292',
    borderWidth: 0,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 3,
    opacity: 1.0,
    backgroundColor: 'rgba(40,40,40,0.65)',
    //marginBottom: 8
  },
  lightContainerStyle: {
    //width: '100%',
    //paddingLeft: 4,
    //paddingRight: 4,
    //borderColor: '#929292',
    borderRadius: 15,
    borderWidth: 0,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    //elevation: 3,
    opacity: 1.0,
    backgroundColor: 'transparent',
    //marginBottom: 8
  },
  darkInputStyle: {
    color: '#f2f2f2',
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
    //height: 40,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    opacity: 1.0
  },
  lightInputStyle: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
    margin: 12,
    //height: 40,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    opacity: 1.0
  }
});

export default mdInput;

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/
