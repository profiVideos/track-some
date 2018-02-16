import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  Keyboard,
  FlatList,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

import {
  MenuProvider
} from 'react-native-popup-menu';
import AppColors from '../templates/appColors';
import PaintSplash from '../images/Color-Splash.png';
import CardDisplay from '../components/CardDisplay';
import TagEdit from '../components/TagEdit';
//import RenderTags from '../components/RenderTags';
import {
  //addCard,
  clearCard,
  addCardTag,
  deleteCard,
  currentCard,
  deleteCardTag,
  highlightCard,
  openTagsModal,
  updateCardTags,
  closeTagsModal,
  openNotesModal,
  openCardsModal,             // ... VERY, VERY NEW ...
  closeCardsModal,            // ... also very, very NEW ...
  setCardSelected,
  itemCardChanged,
  searchCardsChanged,        // ... brand, spanking NEW ...
  searchNotesChanged,        // ... brand, spanking NEW ...
  propertyNoteChanged
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
To Restart the currently running App;
adb shell am broadcast -a react.native.RELOAD
*/

const cardsLiveResults = store.getAllCards();     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    //saveMode: state.login.saveMode,
    //emojiCode: state.emojis.emojiCode,
    catList: state.categories.itemList,
    cardList: (state.cards.searchFor === '' ? 
      cardsLiveResults : store.getAllCards(state.cards.searchFor)),
    thisCard: state.cards.thisCard,
    highlighted: state.cards.highlighted, 
    cardsUpdated: state.cards.lastUpdated,
    cardChanged: state.cards.cardChanged,
    cardModalOpen: state.notes.cardWindowOpen,
    tagsChanged: state.cards.tagsChanged,
    tagsModalOpen: state.cards.tagsWindowOpen,
    editTagsForItem: state.cards.editCardTags
  };
};

class ShowCard extends React.PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarBackgroundColor: AppColors.accentColor,
    navBarTranslucent: false
  };

  /* ... brain dead navigation FAB (needs image or it doesn't work) ...
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
    this.onCardItemPress = this.onCardItemPress.bind(this);
    this.onCardItemToggle = this.onCardItemToggle.bind(this);
    this.onCardItemMenuPress = this.onCardItemMenuPress.bind(this);
    this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    this.closeBuildCardModal = this.closeBuildCardModal.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.onSearchFocusChange = this.onSearchFocusChange.bind(this);
    this.state = {
      searchOpen: false,
      localSearchFor: '',
    };
  }

  componentWillMount() {
    console.log('inside show cards ...');
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

/*
  ToastAndroid.show(`We have new tags to save = ${JSON.stringify(nextProps.thisCard.tags)}`, 
    ToastAndroid.LONG);
*/

  componentWillReceiveProps(nextProps) {
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    //-------------------------------------------------------------------------------------
    // ... due to the async processing we can only save when everything has been added ...
    // ... if main if is true - the tags Modal window has now closed - save & clean up ...
    //-------------------------------------------------------------------------------------
    if (this.props.tagsModalOpen && nextProps.tagsModalOpen === false) {
      if (nextProps.tagsChanged === true && this.props.thisCard.key !== '') {   
        this.props.dispatch(updateCardTags(this.props.thisCard.key, nextProps.thisCard.tags));
      }
      //this.props.dispatch(clearCard());
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      switch (event.id) {
        case 'menu': {
          this.props.navigator.toggleDrawer({ side: 'left', animated: true });
          break;
        }
        case 'search': {
          if (this.state.searchOpen === false) {
            this.showSearchBar();
          } else this.hideSearchBar(); 
          this.setState({ searchOpen: !this.state.searchOpen });
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

  onCardItemPress(key) {
    console.log('The main item was pressed with this key: ', key);
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === key) {
      this.props.dispatch(highlightCard(''));
    } else this.props.dispatch(highlightCard(key));
  }

  onCardItemToggle(key, selected) {
    this.props.dispatch(setCardSelected(key, selected));
  }

  onCardItemMenuPress(option, item) {
    switch (option) {
      case 'edit': {
        //console.log('Edit was selected for item key ', item.key);
        ToastAndroid.show('Edit that Info', ToastAndroid.LONG);
        break;
      }
      case 'tags': {
        this.props.dispatch(currentCard(item));
        this.props.dispatch(openTagsModal(item.key));
        break;
      }
      case 'note': {
        this.props.dispatch(currentCard(item));
        this.props.dispatch(openNotesModal(item.key));
        this.props.dispatch(propertyNoteChanged('card', item.key));  // ... link note with card ...
        break;
      }
      case 'delete': {
        Alert.alert('Delete Card', 
          'You are about to remove this item.\nDo you really what to do this?',
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.props.dispatch(deleteCard(item.key)) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  onSearchChanged(text) {
    console.log('search changed: ', text);
    this.props.dispatch(searchCardsChanged(text));
    this.setState({ localSearchFor: text });
  }

  onSearchFocusChange() {
    Keyboard.dismiss();  // ... does not seem to work ...
    ToastAndroid.show('Cards: Focus Lost', ToastAndroid.SHORT);
    // ... ensure the keyboard is closed ...
    // ... make sure we stop the other searches from looking for new matches ...
    this.props.dispatch(searchNotesChanged(''));
  }

  doNothing() {
    console.log('Be Lazy ...');
  }

  showSearchBar() {
    this.props.dispatch(searchCardsChanged(this.state.localSearchFor));
    this.props.navigator.setStyle({
      navBarCustomView: 'tracksome.SearchBar',
      navBarComponentAlignment: 'fill',
      navBarCustomViewInitialProps: { 
        thisSearch: this.state.localSearchFor,
        searchLostFocus: this.onSearchFocusChange,
        searchTextChanged: this.onSearchChanged 
      }
    });
  }

  hideSearchBar() {
    this.props.dispatch(searchCardsChanged(''));   // ... so we use the live results again ...
    this.props.navigator.setStyle({ navBarCustomView: '' });
  }

  findCategoryByKey(key) {
    return this.props.catList.findIndex((item) => { return item.key === key; });
  }

  countItems(items) {
    return items.length;
  }

  closeTagsEditModal() {
    if (this.props.thisCard.tag !== '') {
      this.addTag2Card();   // ... user closed without hitting the plus '+' button ...
    }
    this.props.dispatch(closeTagsModal(''));
  }

/*
  closeNoteEditModal() {
    this.props.dispatch(closeNotesModal(''));
  }
*/

  itemTagChanged(text) {
    this.props.dispatch(itemCardChanged('tag', text));
  }

  itemTagRemove(tag) {
    this.props.dispatch(deleteCardTag(tag));
  }

  processTag(tag) {
    console.log('This tag is = ', tag);
    //ToastAndroid.show(`This tag is ${tag}`, ToastAndroid.SHORT);
    // ... don't add empty tags please ...
    // ... if not already in the list for this card - add it ...
    this.props.dispatch(addCardTag(tag));
    // ... also consider adding this tag to the master tags list ...
    // ... naturally after checking for duplicates ...
  }

  addTag2Card() {
    //console.log('Inside Add Tag 2 Card: ', this.props.thisCard.tag);
    //ToastAndroid.show(`Inside Add Tag 2 Card ${this.props.thisCard.tag}`, ToastAndroid.SHORT);
    if (this.props.thisCard.tag !== '') {
      const tagParts = this.props.thisCard.tag.split(',');  // ... in case commas entered ...
      tagParts.map(tag => this.processTag(tag.trim()));
    }
  }

  openBuildCardModal(card = '') {
    ToastAndroid.show(`Card: ${card}`, ToastAndroid.SHORT);
    if (card === '') this.props.dispatch(clearCard());
    this.props.dispatch(openCardsModal(card));
    this.showBuildCardScreen(card);
  }

  closeBuildCardModal() {
    this.props.dispatch(closeCardsModal(''));
    this.props.navigator.dismissLightBox();
  }

  showBuildCardScreen(card) {
    this.props.navigator.showLightBox({
      screen: 'tracksome.BuildCard',
      passProps: {
        id: card,
        onClosePress: this.closeBuildCardModal
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
          Your track!some list is ready for your first card ...
        </Text>
        <Image style={styles.imageStyle} source={PaintSplash} />
        <Text style={styles.bannerText}>
          Press the <Text style={styles.boldText}>{plusSymbol}</Text>
          icon or you can choose Build Card to get started!
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
        //style={{ width: '100%' }}
        data={this.props.cardList}
        extraData={this.props.cardsUpdated}
        renderItem={this.renderCardItem}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

/*
*/

  renderTagEditScreen() {
    if (this.props.tagsModalOpen === false) return;
    return (
      <View style={styles.popupContainer}>
        <Modal
            visible={this.props.tagsModalOpen}
            transparent
            animationType={'fade'}
            onRequestClose={() => this.closeTagsEditModal()}
        >
          <View style={styles.modalContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollStyle}
              keyboardShouldPersistTaps='always'
            >
              <View style={styles.modalInnerContainer}>
                <TagEdit
                  tagsList={this.props.thisCard.tags}
                  tagName={this.props.thisCard.tag}
                  photo={this.props.thisCard.imageThumb}
                  mimeType={this.props.thisCard.mimeType}
                  onTagAdd={() => this.addTag2Card()} 
                  onTagChange={text => this.itemTagChanged(text)}
                  onTagRemove={tag => this.itemTagRemove(tag)}
                  onClosePress={() => this.closeTagsEditModal()} 
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

  renderCatDescription(category) {
    const indexPos = this.findCategoryByKey(category);
    if (indexPos >= 0) {
      return `${this.props.catList[indexPos].icon} ${this.props.catList[indexPos].name}`;
    }
    return category;
  }

  renderMainScreen() {
    return (this.props.cardList.length === 0 ? this.showWelcome() : this.showMainList());
  }

  renderCardItem = ({ item }) => {
    return (
      <CardDisplay
        item={item}
        marked={item.key === this.props.highlighted}
        numTags={this.countItems(JSON.parse(item.tags))}
        numNotes={this.countItems(item.notes)}
        catDesc={this.renderCatDescription(item.category)}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        hilite={item.key === this.props.highlighted ? AppColors.hiliteColor : 'white'}
        onPressItem={this.onCardItemPress}      // ... used to highlight an item ...
        onToggleItem={this.onCardItemToggle}    // ... turns the checked status on/off ...
        onMenuPress={this.onCardItemMenuPress}
      />
    );
  }

/*
          { this.renderBuildCardScreen() }
*/

  render() {
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          { this.renderMainScreen() }
          { this.renderTagEditScreen() }
        </View>
        <TouchableHighlight 
          style={styles.addButton}
          underlayColor='#999' 
          onPress={() => { this.openBuildCardModal(); }} 
        >
          <Text style={{ fontSize: 36, color: 'white', paddingBottom: 3 }}>+</Text>
        </TouchableHighlight>
      </MenuProvider>
    );
  }

}

export default connect(whatDoYouNeed)(ShowCard);

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
    width: '100%'
  },
  popupContainer: {
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  modalInnerContainer: {
    width: '90%',
    justifyContent: 'center',
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
    right: 24,
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
    color: 'rgba(0,0,0,0.35)',
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    height: 200,
    width: 200,
    opacity: 0.25,
    resizeMode: 'contain'
  },
  outerContainer: {
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
