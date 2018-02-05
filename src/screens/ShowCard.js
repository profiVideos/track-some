import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  ToastAndroid,
  //TouchableOpacity,
  TouchableHighlight,
  //TouchableWithoutFeedback,
} from 'react-native';

import {
  //Menu,
  MenuProvider,
  //MenuOptions,
  //MenuOption,
  //MenuTrigger,
} from 'react-native-popup-menu';
//import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../templates/appColors';
import PaintSplash from '../images/Color-Splash.png';
import CardItem from '../components/CardItem';
import TagEdit from '../components/TagEdit';
//import RenderTags from '../components/RenderTags';
import {
  //addCard,
  clearCard,
  addCardTag,
  //addCardImage, 
  deleteCard,
  currentCard,
  highlightCard,
  openTagsModal,
  closeTagsModal,
  setCardSelected,
  itemCardChanged,
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

const cardsLiveResults = store.getAllCards();     // ... Realm updates this in real time ...

const whatDoYouNeed = state => {
  return {
    saveMode: state.login.saveMode,
    emojiCode: state.emojis.emojiCode,
    catList: state.categories.itemList,
    itemList: cardsLiveResults,
    thisCard: state.cards.thisCard,
    highlighted: state.cards.highlighted, 
    listUpdated: state.cards.lastUpdated,
    editTagsScreen: state.cards.showTagsScreen
  };
};

class ShowCard extends React.PureComponent {
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
    this.onCardItemPress = this.onCardItemPress.bind(this);
    this.onCardItemToggle = this.onCardItemToggle.bind(this);
    this.onCardItemMenuPress = this.onCardItemMenuPress.bind(this);
    this.state = {
      //tagsModalVisible: false,
    };
  }

  componentWillMount() {
    console.log('inside show cards ...');
    //this.props.dispatch(loadMyCards());
  }

/*
  componentDidMount() {
    //console.log('Show Card Props: ', this.props);
    //Dimensions.addEventListener('change', () => {
    //  this.setState({
    //    scrWidth: Dimensions.get('window').width,
    //    scrHeight: Dimensions.get('window').height,
    //    viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
    //      ? 'portrait' : 'landscape'
    //  });
    //});
  }
*/

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
        console.log('Edit was selected for item key ', item.key);
        ToastAndroid.show('Edit that Info', ToastAndroid.LONG);
        break;
      }
      case 'tags': {
        console.log('Tags was selected for item key ', item.key);
        // ... store the current item tags into our input record for editing ...
        this.props.dispatch(currentCard(item));
        this.props.dispatch(openTagsModal(item.key));
        break;
      }
      case 'notes': {
        console.log('Notes was selected for item key ', item.key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
        break;
      }
      case 'delete': {
        Alert.alert('Delete Card', 
          'You are about to remove this item.\nIs this what you really wish to do?',
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.props.dispatch(deleteCard(item.key)) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  findCategoryByKey(key) {
    return this.props.catList.findIndex((item) => { return item.key === key; });
  }

  countTags(tags) {
    return tags.length;
  }

  closeTagsEditModal() {
    //ToastAndroid.show(`Going to close that Modal: ${this.props.item.key}`, ToastAndroid.SHORT);
    if (this.props.thisCard.tag !== '') {
      this.addTag2Card();   // ... user closed without hitting the plus '+' button ...
    }
    // ... update these tag(s) to the database ...
    //this.props.dispatch(updateCardTags(this.props.thisCard.tags));
    this.props.dispatch(clearCard());          // ... clear the current input record ...
    this.props.dispatch(closeTagsModal(''));
  }

  itemTagChanged(text) {
    //console.log('New Tag Value: ', text);
    this.props.dispatch(itemCardChanged('tag', text));
  }

  itemTagRemove(tag) {
    console.log('MASTER: About to remove tag: ', tag);
    ToastAndroid.show('Need to remove that Tag', ToastAndroid.LONG);
  }

  processTag(tag) {
    console.log('This tag is = ', tag);
    // ... don't add empty tags please ...
    // ... if not already in the list for this card - add it ...
    this.props.dispatch(addCardTag(tag));
    // ... also consider adding this tag to the master tags list ...
    // ... naturally after checking for duplicates ...
  }

  addTag2Card() {
    //console.log('Inside Add Tag 2 Card: ', this.props.thisCard.tag);
    if (this.props.thisCard.tag !== '') {
      const tagParts = this.props.thisCard.tag.split(',');  // ... in case commas entered ...
      tagParts.map(tag => this.processTag(tag.trim()));
    }
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
          symbol or you can choose Build Card below to get started!
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
        data={this.props.itemList}
        extraData={this.props}
        renderItem={this.renderCardItem}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

  renderTagEditScreen() {
    if (this.props.editTagsScreen === '') return;
    //ToastAndroid.show(`Need to get that key: ${this.props.item.key}`, ToastAndroid.SHORT);
    return (
      <View style={styles.popupContainer}>
        <Modal
            visible={this.props.editTagsScreen !== ''}
            transparent
            animationType={'fade'}
            onRequestClose={() => this.closeTagsEditModal()}
        >
          <View style={styles.modalContainer}>
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
    return (this.props.itemList.length === 0 ? this.showWelcome() : this.showMainList());
  }

  renderCardItem = ({ item }) => {
    return (
      <CardItem
        item={item}
        marked={item.key === this.props.highlighted}
        //editTags={item.key === this.props.editTagsScreen}
        numTags={this.countTags(item.tags)}
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
          onPress={() => { console.log('pressed'); }} 
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
  popupContainer: {
    //flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  modalInnerContainer: {
    width: '90%',
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
    borderColor: AppColors.mainDarkColor,
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
    //flex: 1,
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
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    //marginBottom: 10,
    //paddingBottom: 12,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    //backgroundColor: 'red'
  },
  standardText: {
    color: '#333',
    margin: 20,
    textAlign: 'center'
  }
});
