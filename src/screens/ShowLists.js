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
  ScrollView,
  StyleSheet,
  ToastAndroid, 
} from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//import RenderTags from '../components/RenderTags';
import ImageTabBar from '../components/ImageTabBar';
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
    thisCard: state.cards.thisCard,
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

  renderInfoPanel() {
    //if (this.props.marked === false) return;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>

          <View style={styles.rowStyle}>
            <View style={styles.previewOutline}>
              <Text style={styles.emojiIcon}>
               Emoji {/*this.props.item.icon*/}
              </Text>
            </View>
            <View>
              <Text>Rating goes here!</Text>
              <Text style={styles.extraInfo} >Category{/*this.props.catDesc*/}</Text>
            </View>
          </View>

          <Text style={[styles.itemName, { paddingTop: 7 }]}>Name{/*this.props.item.name*/}</Text>
          <Text style={[styles.subHeading, { marginTop: 0 }]}>Desc{/*this.props.item.desc*/}</Text>
          { /*this.renderMyTags()*/ }

        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollableTabView
          style={{ flex: 1, backgroundColor: AppColors.paperColor /*, height: 345*/ }}
          initialPage={0}
          //tabBarPosition='overlayTop'
          renderTabBar={() => <ImageTabBar optionMenu={this.renderOptionMenu} />}
        >
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Text>Hello World!</Text>
          </ScrollView>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            { this.renderInfoPanel() }
          </ScrollView>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Text>Goodbye World!</Text>
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}
export default connect(whatDoYouNeed)(ShowLists);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
