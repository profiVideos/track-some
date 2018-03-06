import React from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet,
  //TouchableHighlight,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AppColors from '../templates/appColors';

const styles = StyleSheet.create({
  inputWidth: {     // ... used to define the item name input width ...
    width: '100%',
    opacity: 1.0
  },
  errorText: {
    color: 'white',
    fontWeight: '600'
  },
  errorContainer: {
    //width: '90%',
    marginHorizontal: 10,
    paddingVertical: 4.5,
    paddingHorizontal: 10,
    paddingBottom: 6,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: AppColors.accentColor,
    borderWidth: 1.75,
    backgroundColor: 'rgba(200,50,50,1)'
  },
  inputContainer: {
    //width: '100%',
    elevation: 2,
    margin: 3,
    paddingHorizontal: 10,
    borderRadius: 7,
    borderColor: '#999',
    borderWidth: 1.75,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.90)'
  },
  outerContainer: {
    width: '87%'
  }
});
const inputs = {};
const passVerify = () => {
  return (
    <TextField
      //style={styles.nameInput}
      label='Verify Password*'
      title='Enter the same password again to verify.'
      lineWidth={0.75}
      labelHeight={20}
      animationDuration={375}
      inputContainerPadding={6}
      blurOnSubmit
      secureTextEntry
      ref={input => { inputs.verify = input; }}
      //onSubmitEditing={() => { inputs.password.focus(); }}
      titleTextStyle={{ fontStyle: 'italic', marginTop: -2 }}
      enablesReturnKeyAutomatically
      //characterRestriction={32}
      returnKeyType='done'
      disableFullscreenUI
      //value={props.email}
      //onChangeText={text => props.itemChanged(text)}
    />      
  );
};

const errorBox = (message) => {
  if (message === '' || message === null) return;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const Login = (props) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWidth}>
          <TextField
            //style={styles.nameInput}
            label='Email*'
            title='Please enter your login email address.'
            lineWidth={0.75}
            labelHeight={20}
            animationDuration={375}
            inputContainerPadding={6}
            blurOnSubmit={false}
            keyboardType='email-address'
            ref={input => { inputs.email = input; }}
            onSubmitEditing={() => { inputs.password.focus(); }}
            titleTextStyle={{ fontStyle: 'italic', marginTop: -2 }}
            enablesReturnKeyAutomatically
            //characterRestriction={32}
            returnKeyType='next'
            disableFullscreenUI
            value={props.email}
            onChangeText={text => props.onEmailChange(text)}
          />
          <TextField
            //style={styles.nameInput}
            label='Password*'
            title='Enter your secure password (min 10 chars).'
            lineWidth={0.75}
            labelHeight={20}
            animationDuration={375}
            inputContainerPadding={6}
            blurOnSubmit={props.verify}
            ref={input => { inputs.password = input; }}
            onSubmitEditing={props.verify ? () => { inputs.verify.focus(); } : ''}
            titleTextStyle={{ fontStyle: 'italic', marginTop: -2 }}
            enablesReturnKeyAutomatically
            secureTextEntry
            //characterRestriction={32}
            returnKeyType={props.verify ? 'next' : 'done'}
            disableFullscreenUI
            value={props.password}
            onChangeText={text => props.onPasswordChange(text)}
          />      
          { props.verify ? passVerify() : <View /> }
        </View>
      </View>
      { errorBox(props.errorMsg) }
    </View>
  );                          
};

export default Login;
