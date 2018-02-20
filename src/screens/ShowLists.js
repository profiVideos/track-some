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
  Image,
  FlatList,
  StyleSheet,
  ToastAndroid, 
} from 'react-native';
import { connect } from 'react-redux';
import {
  MenuProvider
} from 'react-native-popup-menu';
import PaintSplash from '../images/Color-Splash.png';
import AppColors from '../templates/appColors';
import ListItemDisplay from '../components/ListDisplay';
import {
  clearListItem,
  openListsModal,
  closeListsModal,
  //searchCardsChanged,        // ... brand, spanking NEW ...
  //searchNotesChanged,        // ... brand, spanking NEW ...
} from '../store/actions';
import store from '../store';

import PlusIcon from '../images/PlusIcon.png';

const listsLiveResults = store.getAllLists();     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    myLists: listsLiveResults,
    saveMode: state.login.saveMode,
    thisList: state.lists.thisList,
    emojiCode: state.emojis.emojiCode,
    listsUpdated: state.lists.lastUpdated,
    //highlighted: state.lists.highlighted, 
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

  static navigatorButtons = {
    fab: {
      collapsedId: 'addList',
      collapsedIcon: PlusIcon,   //require('../../img/ic_share.png'),
      collapsedIconColor: 'white', // optional
      backgroundColor: AppColors.darkerColor
    }
  };

  constructor(props) {
    super(props);
    this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    this.closeListEditModal = this.closeListEditModal.bind(this);
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
        case 'addList': {
          this.openListEditModal();
          //ToastAndroid.show('Add List', ToastAndroid.SHORT);
          break;
        }
        default: 
          ToastAndroid.show('Default - Not Defined', ToastAndroid.SHORT);
          break;
      }  // ... switch ...
    }
  }

  doSomeFunction() {
    console.log('About to do something');
    ToastAndroid.show('Pressed Something', ToastAndroid.SHORT);
  }

  openListEditModal(list = '') {
    //ToastAndroid.show(`List: ${list}`, ToastAndroid.SHORT);
    if (list === '') this.props.dispatch(clearListItem());
    this.props.dispatch(openListsModal(list));
    this.showListEditScreen(list);
  }

  closeListEditModal() {
    this.props.dispatch(closeListsModal(''));
    this.props.navigator.dismissLightBox();
  }

  itemSeparator() {
    return (<View style={styles.separatorStyle} />);
  }

  showListEditScreen(list) {
    this.props.navigator.showLightBox({
      screen: 'tracksome.ListEdit',
      passProps: {
        id: list,
        onClosePress: this.closeListEditModal
      },
      style: {
       backgroundBlur: 'dark',
       backgroundColor: 'rgba(0,0,0,0.60)', 
      },
      adjustSoftInput: 'resize'
    });
  }

  showWelcome() {
    const plusSymbol = ' +  ';
    return (
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          photo!Drops is ready to build your first list ...
        </Text>
        <Image style={styles.imageStyle} source={PaintSplash} />
        <Text style={styles.bannerText}>
          Press the <Text style={styles.boldText}>{plusSymbol}</Text>
          icon to get started!
        </Text>
      </View>
    );
  }

  showMainList() {
    return (
      <FlatList
        //keyboardShouldPersistTaps='always'
        numColumns={2}
        horizontal={false}
        data={this.props.myLists}
        extraData={this.props.listsUpdated}
        renderItem={this.renderListItem}
        ItemSeparatorComponent={this.itemSeparator}
        contentContainerStyle={styles.listContainer}
      />
    );
  }

/*
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text>{item.desc}</Text>
      </View>
*/

  renderListItem = ({ item }) => {
    return (
      <ListItemDisplay 
        item={item}
        onTapItem={this.doSomeFunction}   // ... simulate an item press ...
        onLongPress={this.doSomeFunction}  // ... simulate a check box press ...
      />
    );
  }

  renderMainScreen() {
    return (this.props.myLists.length === 0 ? this.showWelcome() : this.showMainList());
  }

  //----------------------------------------------------
  // ... the main JSX render section for this class ...
  //----------------------------------------------------
  render() {
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          { this.renderMainScreen() }
        </View>
      </MenuProvider>
    );
  }

}

export default connect(whatDoYouNeed)(ShowLists);

const styles = StyleSheet.create({
  listContainer: {
    //flex: 1,
    //marginTop: 12,
    //marginBottom: 20,
    //width: '100%',
    alignItems: 'baseline',
    //backgroundColor: '#333',
    //justifyContent: 'center',
  },
  bannerText: {
    color: 'rgba(0,0,0,0.35)',
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    height: 200,
    width: 200,
    opacity: 0.45,
    resizeMode: 'contain'
  },
  boldText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700'
  },
  bannerContainer: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
