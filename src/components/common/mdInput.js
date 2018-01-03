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

  handleChange(text) {
    this.setState({ localVal: text });
    console.log(this.state.localVal);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <TextField
          style={[styles.inputStyle, this.props.style]}
          //label={this.props.label}
          labelColor={AppColors.accentColor}
          //placeholder={this.props.placeholder}
          color={AppColors.hiliteColor}
          //value={this.props.value}
          //onChangeText={this.props.onChangeText}
          paddingTop={16}
          paddingBottom={2}
          labelActiveColor={AppColors.accentColor}
          labelActiveScale={0.75}
          autoCorrect={false}
          disableFullscreenUI
          underlineActiveColor={AppColors.accentColor} 
          underlineColorAndroid='transparent'
          {...this.props}
        />
      </View>
    );
  }
}

export default mdInput;

/*
const AppColors = {
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

const styles = StyleSheet.create({
  containerStyle: {
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
    backgroundColor: '#282828',
    marginBottom: 8
    //backgroundColor: AppColors.mainDarkColor
  },
  inputStyle: {
    color: '#f2f2f2',
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

/*

          <DefaultInput
            placeholder="Place Name"
            value={this.state.emailAddr}
            valid
            touched={false}
            onChangeText={emailAddr => this.setState({ emailAddr })}
          />


  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style, 
      !props.valid && props.touched ? styles.invalid : null]}
  />

        <TextField
          style={[styles.inputStyle, this.props.style]}
          value={this.state.inputVal}
          onChangeText={text => this.handleChange(text)}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          {...this.props}
        />

*/


  /*
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 2,

          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    backgroundColor: '#434265'
  },
  headerStyle: {
    fontSize: 22,
    color: '#F8e033'

  input: {
    color: '#111111',
    //marginTop: 5,
    //padding: 3,
    width: '80%',
    //height: 35,
    //borderWidth: 2,
    //backgroundColor: 'white',
    //opacity: 0.5,
  },
  backgroundImage: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1
  },
  buttonStyle: {
    marginTop: 15
  },
  card1: {
    width: '80%',
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  logoPortrait: {
    marginTop: 20,
    width: 218,
    height: 197
  },
  logoLandscape: {
    marginTop: 5,
    width: 132,
    height: 120
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center'
  },
  container: {
    flex: 3,
    alignItems: 'center'
  },
  text: {
    color: '#f2f2f2',
    margin: 10
  },
  inputStyle: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 2,
      color: '#262626',
      fontSize: 18,
      fontWeight: '200',
      flex: 1,
      width: '100%',
      height: 40
  },
  labelStyle: {
      fontSize: 12,
      color: '#7F7D7D',
      fontWeight: '200',
      flex: 1
  },
  containerStyle: {
      height: 60,
      padding: 5,
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderColor: '#D4D4D4',
      borderBottomWidth: 1,
  }
  */
