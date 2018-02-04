import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  ToastAndroid,
  //ScrollView,
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
import {
  deleteCard,
  //loadMyCards,
  highlightCard,        // ... NEW ...
  setCardSelected
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
    emojiName: state.emojis.emojiName,
    catList: state.categories.itemList,
    itemList: cardsLiveResults,
    highlighted: state.cards.highlighted, 
    listUpdated: state.cards.lastUpdated
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
    this.onCardToggle = this.onCardToggle.bind(this);
    this.onCardItemPress = this.onCardItemPress.bind(this);
    this.onMenuOptionSelection = this.onMenuOptionSelection.bind(this);
    this.state = {
      Touchable: false
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

/*
        <ScrollView style={{ color: '#999' }} keyboardShouldPersistTaps='always'>
        </ScrollView>
*/

  onCardItemPress(key) {
    console.log('The main item was pressed with this key: ', key);
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === key) {
      this.props.dispatch(highlightCard(''));
    } else this.props.dispatch(highlightCard(key));
  }

  onCardToggle(key, selected) {
    this.props.dispatch(setCardSelected(key, selected));
  }

  onMenuOptionSelection(value, key) {
    switch (value) {
      case 'edit': {
        console.log('Edit was selected for item key ', key);
        ToastAndroid.show('Edit that Info', ToastAndroid.LONG);
        break;
      }
      case 'tags': {
        console.log('Tags was selected for item key ', key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.LONG);
        break;
      }
      case 'notes': {
        console.log('Notes was selected for item key ', key);
        ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
        break;
      }
      case 'delete': {
        Alert.alert('Delete Card', 
          'You are about to remove this item.\nIs this what you really wish to do?',
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.props.dispatch(deleteCard(key)) }]);
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
/*
      <View style={styles.listContainer}>
      </View>
*/

  itemSeparator = () => {
    return (<View style={styles.separatorStyle} />);
  };

  showMainList() {
    return (
      <FlatList
        data={this.props.itemList}
        extraData={this.props}
        renderItem={this.renderCardItem}
        ItemSeparatorComponent={this.itemSeparator}
      />
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
        id={item.key}
        icon={item.icon}
        name={item.name}
        desc={item.desc}
        image={item.imageThumb}
        mimeType={item.mimeType}
        rating={item.rating}
        selected={item.selected}
        marked={item.key === this.props.highlighted}
        numTags={this.countTags(item.tags)}
        catDesc={this.renderCatDescription(item.category)}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        hilite={item.key === this.props.highlighted ? AppColors.hiliteColor : 'white'}
        onDoMenuItem={this.onMenuOptionSelection}
        onPressItem={this.onCardItemPress}   // ... used to highlight an item (radio control)...
        onToggleItem={this.onCardToggle}
      />
    );
  }

  render() {
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          { this.renderMainScreen() }
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


*/

const styles = StyleSheet.create({
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
