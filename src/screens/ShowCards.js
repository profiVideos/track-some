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
import { MenuProvider } from 'react-native-popup-menu';
import AppColors from '../templates/appColors';
import PaintSplash from '../images/Color-Splash.png';
import CardDisplay from '../components/CardDisplay';
import TagEdit from '../components/TagEdit';
import Loader from '../components/common/Loader';
import {
  clearCard,
  clearNote,
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
  closeNotesModal,
  setCardSelected,
  itemCardChanged,
  deleteCardNotes,
  searchCardsChanged,        // ... brand, spanking NEW ...
  searchNotesChanged,        // ... brand, spanking NEW ...
  propertyNoteChanged
} from '../store/actions';
import store from '../store';

/*
To Restart the currently running App;
adb shell am broadcast -a react.native.RELOAD
*/

let cardsLiveResults = store.getMatchingCards('');     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    //saveMode: state.login.saveMode,
    //emojiCode: state.emojis.emojiCode,
    cardList: (state.cards.searchFor === '' ? cardsLiveResults : 
      store.getMatchingCards(state.cards.searchFor)),
    thisCard: state.cards.thisCard,
    isLoading: state.lists.loading,
    activeList: state.lists.activeList,
    highlighted: state.cards.highlighted, 
    cardsUpdated: state.cards.lastUpdated,
    cardChanged: state.cards.cardChanged,
    cardModalOpen: state.notes.cardWindowOpen,
    tagsChanged: state.cards.tagsChanged,
    tagsModalOpen: state.cards.tagsWindowOpen,
    editTagsForItem: state.cards.editCardTags
  };
};

class ShowCards extends React.PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarBackgroundColor: AppColors.accentColor,
    navBarTranslucent: false
  };

  constructor(props) {
    super(props);
    this.onCardItemPress = this.onCardItemPress.bind(this);
    this.onCardItemToggle = this.onCardItemToggle.bind(this);
    this.onCardItemMenuPress = this.onCardItemMenuPress.bind(this);
    this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    this.closeBuildCardModal = this.closeBuildCardModal.bind(this);
    this.openNoteEditModal = this.openNoteEditModal.bind(this);
    this.closeNoteEditModal = this.closeNoteEditModal.bind(this);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.onSearchFocusChange = this.onSearchFocusChange.bind(this);
    this.state = {
      loading: false,
      searchOpen: false,
      localSearchFor: '',
    };
  }

  componentWillMount() {
    console.log('inside show cards ...');
    //this.setState({ loading: true });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

/*
  ToastAndroid.show(`We have new tags to save = ${JSON.stringify(nextProps.thisCard.tags)}`, 
    ToastAndroid.LONG);
*/

  componentWillReceiveProps(nextProps) {
    //-------------------------------------------------------------------------------------
    // ... due to the async processing we can only save when everything has been added ...
    // ... if main if is true - the tags Modal window has now closed - save & clean up ...
    //-------------------------------------------------------------------------------------
    if (this.props.tagsModalOpen && nextProps.tagsModalOpen === false) {
      if (nextProps.tagsChanged === true && this.props.thisCard.key !== '') {   
        this.props.dispatch(updateCardTags(this.props.thisCard.key, nextProps.thisCard.tags));
      }
    }
    //-------------------------------------------------------------------------------
    // ... make sure we are aware of a list change so we can get the right cards ...
    //-------------------------------------------------------------------------------
    if (this.props.activeList.key !== nextProps.activeList.key) {
      this.setState({ loading: true });
      const scrTitle = (nextProps.activeList.name === '' ? 
        'Show Drops' : nextProps.activeList.name);
      this.props.navigator.setTitle({ title: scrTitle });
      cardsLiveResults = store.getMatchingCards(nextProps.activeList.key);
      // ... this next line is VERY IMPORTANT - otherwise the flatlist would never update ...
      this.props.dispatch(itemCardChanged('list', nextProps.activeList.key));
    }
  }

  onNavigatorEvent(event) {
    //if (event.id === 'willAppear') this.setState({ loading: true });
    if (event.id === 'didAppear') this.setState({ loading: false });
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
    //console.log('The main item was pressed with this key: ', key);
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === key) {
      this.props.dispatch(highlightCard(''));
    } else this.props.dispatch(highlightCard(key));
  }

  onCardItemToggle(key, selected) {
    this.props.dispatch(setCardSelected(key, selected));
  }

  onDeleteCardAndNotes(cardKey, listKey) {
    this.props.dispatch(deleteCardNotes(cardKey, listKey));
    this.props.dispatch(deleteCard(cardKey, listKey));
  }

  onCardItemMenuPress(option, card) {
    switch (option) {
      case 'edit': {
        this.props.dispatch(currentCard(card));
        this.openBuildCardModal(card.key);
        break;
      }
      case 'tags': {
        this.props.dispatch(currentCard(card));
        this.props.dispatch(openTagsModal(card.key));
        break;
      }
      case 'note': {
        // ... here we are adding a new note to this card ...
        this.props.dispatch(currentCard(card));
        this.openNoteEditModal('', card);  // ... need card record to display photo ...
        break;
      }
      case 'delete': {
        // ... make this message more severe and also delete all notes & tags ...
        Alert.alert('Delete Drop', 
          `You are about to permanently remove this drop.\n
You will also be deleting all tags and notes associated with this drop!  
Do you really what to do this?`,
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.onDeleteCardAndNotes(card.key, card.list) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  onCardsRefresh() {
    ToastAndroid.show('Drops: Refresh', ToastAndroid.SHORT);
  }

  onSearchChanged(text) {
    this.props.dispatch(searchCardsChanged(text));
    this.setState({ localSearchFor: text });
  }

  onSearchFocusChange() {
    Keyboard.dismiss();  // ... does not seem to work ...
    ToastAndroid.show('Drops: Focus Lost', ToastAndroid.SHORT);
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

  countItems(items) {
    return items.length;  // ... to circumvent a weird prop passing bug ...
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
    //console.log('This tag is = ', tag);
    //ToastAndroid.show(`This tag is ${tag}`, ToastAndroid.SHORT);
    // ... don't add empty tags please ...
    // ... if not already in the list for this card - add it ...
    this.props.dispatch(addCardTag(tag));
    // ... also consider adding this tag to the master tags list ...
    // ... future enhancement - naturally after checking for duplicates ...
  }

  addTag2Card() {
    //console.log('Inside Add Tag 2 Card: ', this.props.thisCard.tag);
    //ToastAndroid.show(`Inside Add Tag 2 Card ${this.props.thisCard.tag}`, ToastAndroid.SHORT);
    if (this.props.thisCard.tag !== '') {
      const tagParts = this.props.thisCard.tag.split(',');  // ... in case commas entered ...
      tagParts.map(tag => this.processTag(tag.trim()));
    }
  }

  showNoteEditScreen(note = '', card) {
    //ToastAndroid.show(`Inside Show Note Screen: ${note.key}`, ToastAndroid.SHORT);
    this.props.navigator.showLightBox({
      screen: 'tracksome.NoteEdit',
      passProps: {
        id: (note.key === undefined ? '' : note.key),
        photo: (card === undefined ? '' : card.imageThumb),
        mimeType: (card === undefined ? '' : card.mimeType),
        onClosePress: this.closeNoteEditModal
      },
      style: {
        backgroundBlur: 'none',  // dark
        backgroundColor: 'rgba(0,0,0,0.60)',
        //tapBackgroundToDismiss: true 
      },
      //adjustSoftInput: 'resize'
    });
  }

  openNoteEditModal(note = '', card) {
    //ToastAndroid.show(`Open Note: ${note.key}`, ToastAndroid.SHORT);
    if (note.key === '' || note.key === undefined) {
      this.props.dispatch(clearNote());
    } 
    this.props.dispatch(openNotesModal(note.key));
    // ... link a new note with the current card ...
    if (note.card === '' || note.card === undefined) {
      this.props.dispatch(propertyNoteChanged('card', card.key));
    }
    //ToastAndroid.show(`Open Note: ${note.key}`, ToastAndroid.SHORT);
    //ToastAndroid.show(`Link to Card: ${card.key}`, ToastAndroid.SHORT);
    this.showNoteEditScreen(note, card);
  }

  closeNoteEditModal() {
    this.props.dispatch(closeNotesModal(''));
    this.props.navigator.dismissLightBox();
  }

  openBuildCardModal(card = '') {
    //ToastAndroid.show(`Card: ${card}`, ToastAndroid.SHORT);
    if (this.props.activeList.key === '') {
      Alert.alert('Create Drop', 
        `Please select / create a story in order to add drops to your story.\n
The whole idea is to tell your story with a collection of individual photoDrops!`,
          [{ text: 'Got It' }]);
      this.props.navigator.switchToTab({ tabIndex: 0 });
    } else {
      if (card === '') this.props.dispatch(clearCard());
      this.props.dispatch(openCardsModal(card));
      this.showBuildCardScreen(card);
    }
  }

  closeBuildCardModal() {
    this.props.dispatch(closeCardsModal(''));
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
    //this.props.navigator.dismissLightBox();
  }

  showBuildCardScreen(card) {
    this.props.navigator.showModal({
      screen: 'tracksome.BuildCard',
      passProps: {
        id: card,
        onClosePress: this.closeBuildCardModal,
        openNoteEditModal: this.openNoteEditModal
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
          Your photoDrops story is ready for your first drop ...
        </Text>
        <Image style={styles.imageStyle} source={PaintSplash} />
        <Text style={styles.bannerText}>
          Press the <Text style={styles.boldText}>{plusSymbol}</Text>
          button to get started!
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
        data={this.props.cardList}
        //refreshing={this.state.loading}   ... haven't figured out how these work yet ...
        //onRefresh={this.onCardsRefresh}   ... MG - 27.02.2018 ...
        extraData={this.props.cardsUpdated}
        renderItem={this.renderCardItem}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

  //---------------------------------------------------------
  // ... this should go the way of the dodo bird soon! ...
  // ... make it like the note edit or build card screen ...
  //---------------------------------------------------------
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

  renderMainScreen() {
    // ... if no active list (from user defaults record) - ask user to select a list ...
    if (this.props.activeList.key === '') {
      this.props.navigator.switchToTab({ tabIndex: 0 });
    }
    if (this.state.loading) return <Loader size='large' />;
    return (this.props.cardList.length === 0 ? this.showWelcome() : this.showMainList());
  }

  renderCardItem = ({ item }) => {
    return (
      <CardDisplay
        item={item}
        marked={item.key === this.props.highlighted}
        numTags={this.countItems(JSON.parse(item.tags))}
        numNotes={this.countItems(item.notes)}
        catDesc={item.category}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        hilite={item.key === this.props.highlighted ? AppColors.hiliteColor : 'white'}
        onPressItem={this.onCardItemPress}      // ... used to highlight an item ...
        onToggleItem={this.onCardItemToggle}    // ... turns the checked status on/off ...
        onMenuPress={this.onCardItemMenuPress}
        openNoteEditModal={this.openNoteEditModal}
      />
    );
  }

  //-------------------------------------------------------------------------------
  // ... replace this "fake" FAB Button with the Navigation FAB button (SOON!) ...
  //-------------------------------------------------------------------------------
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

export default connect(whatDoYouNeed)(ShowCards);

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
  scrollStyle: {  // ... this actually works when you have many tags ...
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
    textAlign: 'center'
  },
  imageStyle: {
    height: 200,
    width: 200,
    opacity: 0.45,
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
