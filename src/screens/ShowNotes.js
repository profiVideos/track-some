import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

import {
  MenuProvider
} from 'react-native-popup-menu';
import AppColors from '../templates/appColors';
import NoteSplash from '../images/Note-Splash.png';
import NoteDisplay from '../components/NoteDisplay';
import NoteEdit from '../components/NoteEdit';
import {
  //addNote,
  //updateNote,
  deleteNote,
  //currentNote,
  highlightNote,
  openNotesModal,
  closeNotesModal,
  setNoteSelected,
  //propertyNoteChanged,
} from '../store/actions';
import store from '../store';

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

const notesLiveResults = store.getAllNotes();     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    saveMode: state.login.saveMode,
    editNote: state.notes.editNote,
    itemList: notesLiveResults,
    thisNote: state.notes.thisNote,
    highlighted: state.notes.highlighted, 
    listUpdated: state.notes.lastUpdated,
    notesChanged: state.notes.notesChanged,
    notesModalOpen: state.notes.notesWindowOpen
  };
};

class ShowNotes extends React.PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarBackgroundColor: AppColors.accentColor,
    navBarTranslucent: false
  };

  /*
  static navigatorButtons = {
    fab: {
      collapsedId: 'share',
      collapsedIcon: { ' + ' },   //require('../../img/ic_share.png'),
      collapsedIconColor: 'red', // optional
      backgroundColor: AppColors.darkerColor //'#607D8B'
    }
  };
  */

  constructor(props) {
    super(props);
    this.onNoteItemPress = this.onNoteItemPress.bind(this);
    this.onNoteItemToggle = this.onNoteItemToggle.bind(this);
    this.onNoteItemMenuPress = this.onNoteItemMenuPress.bind(this);
  }

  componentWillMount() {
    console.log('inside show notes ...');
  }

/*
  componentWillReceiveProps(nextProps) {
    //-------------------------------------------------------------------------------------
    // ... due to the async processing we can only save when everything has been added ...
    //-------------------------------------------------------------------------------------
    //if (nextProps.notesModalOpen === false && nextProps.notesChanged === true) {
    //  if (this.props.thisNote.key !== '') {   // ... we are updating an existing card ...
    //    this.props.dispatch(updateNoteTags(this.props.thisNote.key, nextProps.thisNote.tags));
    //  }
    //} 
  }
*/

  onNoteItemPress(key) {
    console.log('The main item was pressed with this key: ', key);
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === key) {
      this.props.dispatch(highlightNote(''));
    } else this.props.dispatch(highlightNote(key));
  }

  onNoteItemToggle(key, selected) {
    this.props.dispatch(setNoteSelected(key, selected));
  }

  onNoteItemMenuPress(option, item) {
    switch (option) {
      case 'edit': {
        ToastAndroid.show('Edit Info', ToastAndroid.LONG);
        //console.log('Tags was selected for item key ', item.key);
        //this.props.dispatch(currentNote(item));
        //this.props.dispatch(openNotesModal(item.key));
        break;
      }
      case 'color': {
        //console.log('Notes was selected for item key ', item.key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
        break;
      }
      case 'priority': {
        //console.log('Notes was selected for item key ', item.key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
        break;
      }
      case 'reminder': {
        //console.log('Notes was selected for item key ', item.key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
        break;
      }
      case 'delete': {
        Alert.alert('Delete Note', 
          'You are about to remove this item.\nDo you really what to do this?',
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.props.dispatch(deleteNote(item.key)) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  closeNoteEditModal() {
    this.props.dispatch(closeNotesModal(''));
  }

  showWelcome() {
    const plusSymbol = ' +  ';
    return (
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          Your list is ready for your first note ...
        </Text>
        <Image style={styles.imageStyle} source={NoteSplash} />
        <Text style={styles.bannerText}>
          Press the <Text style={styles.boldText}>{plusSymbol}</Text>
          symbol to get started!
        </Text>
      </View>
    );
  }

  itemSeparator = () => {
    return (<View style={styles.separatorStyle} />);
  };

  showMainList() {
    return (
      <FlatList
        keyboardShouldPersistTaps='always'
        style={{ width: '100%' }}
        data={this.props.itemList}
        extraData={this.props}
        renderItem={this.renderNoteDisplay}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

/*
            <ScrollView
              contentContainerStyle={styles.scrollStyle}
              keyboardShouldPersistTaps='always'
            >
            </ScrollView>
*/

  renderNoteEditScreen() {
    //if (this.props.editNote === '') return;
    return (
      <View style={styles.popupContainer}>
        <Modal
            visible={this.props.notesModalOpen}
            transparent
            animationType={'fade'}
            onRequestClose={() => this.closeNoteEditModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalInnerContainer}>
              <NoteEdit
                //tagsList={this.props.thisNote.tags}
                //tagName={this.props.thisNote.tag}
                onTagAdd={() => this.addTag2Note()} 
                onTagChange={text => this.itemTagChanged(text)}
                onTagRemove={tag => this.itemTagRemove(tag)}
                onClosePress={() => this.closeNoteEditModal()} 
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

/*
  renderCatDescription(category) {
    const indexPos = this.findCategoryByKey(category);
    if (indexPos >= 0) {
      return `${this.props.catList[indexPos].icon} ${this.props.catList[indexPos].name}`;
    }
    return category;
  }
*/

  renderMainScreen() {
    return (this.props.itemList.length === 0 ? this.showWelcome() : this.showMainList());
  }

  renderNoteDisplay = ({ item }) => {
    return (
      <NoteDisplay
        item={item}
        marked={item.key === this.props.highlighted}
        //numTags={this.countTags(item.tags)}
        //catDesc={this.renderCatDescription(item.category)}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        hilite={item.key === this.props.highlighted ? AppColors.hiliteColor : 'white'}
        onPressItem={this.onNoteItemPress}      // ... used to highlight an item ...
        onToggleItem={this.onNoteItemToggle}    // ... turns the checked status on/off ...
        onMenuPress={this.onNoteItemMenuPress}
      />
    );
  }

  render() {
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          { this.renderMainScreen() }
          { this.renderNoteEditScreen() }
        </View>
        <TouchableHighlight 
          style={styles.addButton}
          underlayColor='#999' 
          onPress={() => { this.props.dispatch(openNotesModal('')); }} 
        >
          <Text style={{ fontSize: 36, color: 'white', paddingBottom: 3 }}>+</Text>
        </TouchableHighlight>
      </MenuProvider>
    );
  }

}

export default connect(whatDoYouNeed)(ShowNotes);

/*
          <View>
            <TouchableHighlight 
              style={styles.addButton}
              underlayColor='#ff7043' onPress={() => { console.log('pressed'); }} 
            >
                <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
            </TouchableHighlight>
          </View>          

          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={this.SampleFunction} 
            style={styles.TouchableOpacityStyle} 
          >
          <Image 
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }} 
            style={styles.FloatingButtonStyle} 
          />
          </TouchableOpacity>

Pfeffenhausen Rathaus          
Dienstag 13:30 – 16:00 Uhr
Donnerstag 13:30 – 18:00 Uhr

*/

const styles = StyleSheet.create({
  scrollStyle: {
    //width: '100%'
  },
  popupContainer: {
    flex: 1,
    //width: '100%',
    //justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    //width: '100%',
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  modalInnerContainer: {
    flex: 1,
    //width: '100%',
    //height: '100%',
    //backgroundColor: '#f8f8f8',
    //justifyContent: 'center',
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 10,
  },  
  addButton: {
    elevation: 5,
    backgroundColor: AppColors.darkerColor,
    borderColor: '#aaa',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 18,
    right: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },  
  separatorStyle: {
    backgroundColor: 'white',
    width: '12%',
    alignSelf: 'flex-end',
    height: 1.1
  },
  listContainer: {
    //elevation: 2,
    //marginBottom: 10,
    //paddingBottom: 12,
    //shadowColor: '#121212',
    //shadowOffset: { width: 1, height: 3 },
    //shadowOpacity: 0.85,
    //backgroundColor: 'yellow'
  },
  bannerContainer: {
    height: '100%',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700'
  },
  bannerText: {
    color: 'rgba(0,0,0,0.45)',
    fontSize: 18,
    padding: 20,
    textAlign: 'center'
  },
  imageStyle: {
    height: 150,
    width: 150,
    opacity: 0.35,
    resizeMode: 'contain'
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
  },
  standardText: {
    color: '#333',
    margin: 20,
    textAlign: 'center'
  }
});
