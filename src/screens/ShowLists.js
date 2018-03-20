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
  Alert,
  Image,
  NetInfo,
  FlatList,
  StyleSheet,
  Dimensions,
  ToastAndroid, 
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  MenuProvider
} from 'react-native-popup-menu';
import PaintSplash from '../images/Color-Splash.png';
import AppColors from '../templates/appColors';
import ListItemDisplay from '../components/ListDisplay';
import {
  deleteList,
  currentList,
  clearListItem,
  setActiveList,
  openListsModal,
  closeListsModal,
  connectionState,
  //searchCardsChanged,        // ... brand, spanking NEW ...
  //searchNotesChanged,        // ... brand, spanking NEW ...
  requestCloudUserData
} from '../store/actions';
import store from '../store';

import PlusIcon from '../images/PlusIcon.png';

//const dropsConfig = store.getAppConfig();
const listsLiveResults = store.getAllLists();     // ... Realm updates this in real time ...
const itemWidth = 170;  // ... add this to state - used to calculate column spacing ...

const whatDoYouNeed = state => {
  return {
    myLists: listsLiveResults,
    //appConfig: dropsConfig,
    login: state.login,     // ... the whole login state - firebase user info in user ...
    saveMode: state.login.saveMode,
    thisList: state.lists.thisList,
    activeList: state.lists.activeList,
    emojiCode: state.emojis.emojiCode,
    listsUpdated: state.lists.lastUpdated,
    highlighted: state.lists.highlighted, 
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
    //navBarSubtitleColor: AppColors.paperColor,
    //navBarSubtitleFontFamily: 'font-name', // subtitle font, 'sans-serif-thin' for example
    //navBarSubtitleFontSize: 13,    
    //navBarTitleTextCentered: true,
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
    this.onMenuPress = this.onMenuPress.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    this.closeListEditModal = this.closeListEditModal.bind(this);
    this.state = {
      didSave: false,
      searchOpen: false,
      localSearchFor: '',
      scrnWidth: Dimensions.get('window').width
    };
  }

  componentWillMount() {
    //console.log('inside show lists ...');
    //ToastAndroid.show(`inside loginUser: ${user}`, ToastAndroid.LONG);
    this.props.dispatch(connectionState(NetInfo.isConnected));
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if ((this.props.login.connected) && (this.props.login.user !== null)) {
      // ... we should be checking if device is out of sync with cloud data ...
      requestCloudUserData(this.props.login.user, this.props.dispatch); 
    }
    if (this.props.login.user !== null) {
      // ... see if the email was verified ...
      //ToastAndroid.show(`Email Verified: ${this.props.login.user.emailVerified}`, 
      //  ToastAndroid.SHORT);
      if (this.props.login.user.emailVerified === false) {
        Alert.alert('Email Verification', 
          `Please verify your Email address by responding to the email that was sent to you when you signed up for this app!\n
Once verified, please logout and then login again to ensure the changes to your profile take effect.\n          
After successful verification, this message will no longer display.`,
          [{ text: 'Resend Email', onPress: () => this.resendEmail() },
           { text: 'Got It' }]);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.highlighted !== '' || nextProps.highlighted !== '') {
      const scrTitle = (nextProps.activeList.name === '' ? 
        'Choose a Story' : nextProps.activeList.name);
      this.props.navigator.setTitle({ title: scrTitle });
    }
  }

  onLayout() {
    this.setState({
      scrnWidth: Dimensions.get('window').width
    });
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
          break;
        }
        default: 
          ToastAndroid.show('Default - Not Defined', ToastAndroid.SHORT);
          break;
      }  // ... switch ...
    }
  }

  onItemPress(item) {
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === item.key) {
      this.props.dispatch(setActiveList('', ''));
    } else {
      this.props.dispatch(setActiveList(item.key, item.name));
      // ... MG - 22.02.2018 - make the following an option ...
      this.props.navigator.switchToTab({ tabIndex: 1 });
    }
  }

  onMenuPress(option, item) {
    switch (option) {
      case 'edit': {
        //ToastAndroid.show(`Stuff: ${myStore}`, ToastAndroid.LONG);
        this.props.dispatch(currentList(item));
        this.openListEditModal(item); 
        break;
      }
      case 'delete': {
        Alert.alert('Delete a Story', 
          `You are about to delete this story.
All of the drops, notes and associated settings of this story will also be removed!\n
Do you really want to do this?`,
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.doListRemoval(item) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  showResult(result) {
    ToastAndroid.show(`Inside Timer Props: ${result}`, ToastAndroid.LONG);
  }

  resendEmail() {
    const emailUser = firebase.auth().currentUser;
    emailUser.sendEmailVerification();
    ToastAndroid.show(`Email sent to: ${emailUser.email}`, ToastAndroid.LONG);
  }

  doListRemoval(item) {
    // ... if list was deleted - update in Redux ...
    if (this.props.highlighted === item.key) {
      this.props.dispatch(setActiveList('', ''));
    }
    this.props.dispatch(deleteList(item.key));
  }

  doSomeFunction() {
    console.log('About to do something');
    ToastAndroid.show('Pressed Something', ToastAndroid.SHORT);
  }

  openListEditModal(list = '') {
    //ToastAndroid.show(`List: ${list}`, ToastAndroid.SHORT);
    if (list === '') this.props.dispatch(clearListItem());
    this.props.dispatch(openListsModal(list.key));
    this.showListEditScreen(list);
  }

  closeListEditModal() {
    if (this.props.highlighted !== '' && this.props.highlighted === this.props.thisList.key) {
      // ... if selected list name was changed - update in Redux ...
      if (this.props.activeList.name !== this.props.thisList.name) {
        this.props.dispatch(setActiveList(this.props.thisList.key, this.props.thisList.name));
      }
    }
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
          photoDrops is ready to create your first story ...
        </Text>
        <Image style={styles.imageStyle} source={PaintSplash} />
        <Text style={styles.bannerText}>
          Press the <Text style={styles.boldText}>{plusSymbol}</Text>
          button to get started!
        </Text>
      </View>
    );
  }

  showMainList() {
    return (
      <FlatList
        //keyboardShouldPersistTaps='always'
        numColumns={Math.floor(this.state.scrnWidth / itemWidth)}
        horizontal={false}
        data={this.props.myLists}
        extraData={this.props.listsUpdated}
        renderItem={this.renderListItem}
        key={this.state.scrnWidth}        
        ItemSeparatorComponent={this.itemSeparator}
        contentContainerStyle={styles.listContainer}
      />
    );
  }

  renderListItem = ({ item }) => {
    return (
      <ListItemDisplay 
        item={item}
        hilite={item.key === this.props.highlighted ? AppColors.hiliteColor : 'white'}
        onMenuPress={this.onMenuPress}   // ... do the selected menu item ...
        onItemPress={this.onItemPress}   // ... highlight this item - set list as active ...
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
        <View style={styles.outerContainer} onLayout={this.onLayout.bind(this)}>
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
    alignItems: 'center',
    //backgroundColor: '#333',
    //justifyContent: 'center',
  },
  bannerText: {
    color: 'rgba(0,0,0,0.45)',
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
