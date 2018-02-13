import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import AppColors from '../templates/appColors';

        //getImageSource('md-more', 30),         // ... the options button ...

export default class OptionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOptionMenu = () => (
    <MenuProvider>
      <Menu onSelect={value => this.onMenuOptionSelect(value)}>
        <MenuTrigger>
          <View style={{ width: 20, alignItems: 'center' }}>
            <Icon name='md-more' size={30} color={AppColors.darkerColor} />
          </View>
        </MenuTrigger>
        <MenuOptions customStyles={menuOptionsStyles}>
          <MenuOption value={0} disabled>
            <Text style={styles.menuTitle}>Category Options</Text>
          </MenuOption>
          <MenuOption value={'deleteAll'} icon='🗑️' text='Delete All Selected' />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  )

  render() {
    return (
      <View style={styles.statusBar}>
      { this.renderOptionMenu() }
      </View>
    );
  }
}

/*
        <View style={styles.closeButton}>
          <Text style={styles.closeText}>x</Text>
        </View>
*/

const menuOptionsStyles = {
  optionsContainer: {
    width: 205,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const styles = StyleSheet.create({
  closeText: {
    fontSize: 26,
    fontWeight: '400'
  },
  closeButton: {
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginRight: 17,
    marginBottom: 5
  },
  statusBar: {
    //overflow: 'hidden',
    //flex: 1,
    elevation: 5,
    height: 48,
    //marginTop: 4,
    width: 230,
    //marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey', //AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //marginRight: 7,
    backgroundColor: '#f2f2f2', //AppColors.paperColor,
    justifyContent: 'center',
    height: 34
  },
  textInputStyle: {
    color: '#121212',
    padding: 3,
    fontSize: 17,
    fontWeight: '500'
  },
});
