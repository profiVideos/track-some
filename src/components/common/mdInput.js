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
*/
  render() {
    return (
      <View style={this.props.darkInput ? styles.darkContainerStyle : styles.lightContainerStyle}>
        <TextField 
          style={[this.props.darkInput ? styles.darkInputStyle 
                                       : styles.lightInputStyle, this.props.style]}
          labelColor={this.props.darkInput ? AppColors.accentColor : '#4f7bf3'}
          color={this.props.darkInput ? AppColors.hiliteColor : '#000000'}
          paddingTop={16}
          paddingBottom={2}
          labelActiveColor={this.props.darkInput ? AppColors.accentColor : AppColors.accentColor}
          labelActiveScale={0.75}
          autoCorrect={false}
          disableFullscreenUI
          underlineColor={this.props.darkInput ? 'gray' : '#c3c3c3'}
          underlineActiveColor={this.props.darkInput ? AppColors.accentColor 
                                                     : AppColors.accentColor} 
          underlineColorAndroid='transparent'
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  darkContainerStyle: {
    width: '80%',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    borderColor: '#929292',
    borderWidth: 0,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 3,
    opacity: 1.0,
    backgroundColor: 'rgba(40,40,40,0.65)',
    marginBottom: 8
  },
  lightContainerStyle: {
    width: '90%',
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    borderColor: '#929292',
    borderWidth: 0,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    //elevation: 3,
    opacity: 1.0,
    backgroundColor: 'white',
    marginBottom: 8
  },
  darkInputStyle: {
    color: '#f2f2f2',
    fontSize: 28,
    fontWeight: '400',
    width: '100%',
    height: 40,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    opacity: 1.0
  },
  lightInputStyle: {
    color: '#121212',
    fontSize: 28,
    fontWeight: '400',
    width: '100%',
    height: 40,
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
