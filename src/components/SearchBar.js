import React, { Component } from 'react';
import {
  View,
  //Text,
  TextInput,
  StyleSheet
} from 'react-native';
//import AppColors from '../templates/appColors';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.statusBar}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputStyle}
            //autoFocus
            returnKeyType='done'
            //ref={input => { this.inputs.title = input; }}
            blurOnSubmit
            //onSubmitEditing={() => { this.inputs.note.focus(); }}
            disableFullscreenUI
            underlineColorAndroid={'transparent'}
            placeholder={'Search'}
            //value={this.props.searchInput}
            //onChangeText={this.props.onSearchChange}
          />
        </View>
      </View>
    );
  }
}

/*
          <View style={styles.closeButton}>
            <Text style={styles.closeText}>x</Text>
          </View>
*/

const styles = StyleSheet.create({
  closeText: {
    fontSize: 26,
    fontWeight: '400'
  },
  closeButton: {
    //marginRight: 17,
    //marginBottom: 7
  },
  statusBar: {
    //elevation: 5,
    height: 48,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //marginRight: 7,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2', //AppColors.paperColor,
    justifyContent: 'space-between',
    height: 35
  },
  textInputStyle: {
    width: '95%',
    color: '#121212',
    padding: 3,
    fontSize: 17,
    fontWeight: '500'
  },
});
