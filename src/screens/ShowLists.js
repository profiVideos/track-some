/*---------------------------------------------------
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 16.02.2018 - MG - modified for me
 *---------------------------------------------------*/

import React, { PureComponent } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ToastAndroid, 
} from 'react-native';
import { connect } from 'react-redux';
import AppColors from '../templates/appColors';

import {
  //addList,
  //searchCardsChanged,        // ... brand, spanking NEW ...
  //searchNotesChanged,        // ... brand, spanking NEW ...
} from '../store/actions';
//import store from '../store';

//const listsLiveResults = store.getAllLists();     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    saveMode: state.login.saveMode,
    //emojiCode: state.emojis.emojiCode,
    //mainLists: (state.lists.searchFor === '' ? 
    //  listsLiveResults : store.getAllLists(state.lists.searchFor)),
    //mainLists: listsLiveResults,
    //thisList: state.lists.thisList,
    //highlighted: state.lists.highlighted, 
    //listsUpdated: state.lists.lastUpdated,
  };
};

class ShowLists extends PureComponent<{}> {
  static navigatorStyle = {
    drawUnderNavBar: false,
    disabledButtonColor: '#333',
    screenBackgroundColor: AppColors.paperColor,
    navBarButtonColor: AppColors.hiliteColor,
    navBarTextColor: AppColors.accentColor,
    navBarBackgroundColor: AppColors.mainDarkColor,
    navBarTranslucent: false
  };

  constructor(props) {
    super(props);
    this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    this.state = {
      searchOpen: false,
      localSearchFor: '',
    };
  }

  componentWillMount() {
    console.log('inside show lists ...');
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      switch (event.id) {
        case 'menu': {
          this.props.navigator.toggleDrawer({ side: 'left', animated: true });
          break;
        }
        case 'options': {
          ToastAndroid.show('Menu Options', ToastAndroid.SHORT);
          break;
        }
        default: 
          ToastAndroid.show('Default - Not Defined', ToastAndroid.SHORT);
          break;
      }  // ... switch ...
    }
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <Text>Hello World!</Text>
      </View>
    );
  }
}
export default connect(whatDoYouNeed)(ShowLists);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
