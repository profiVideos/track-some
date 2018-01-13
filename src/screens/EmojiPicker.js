import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import 'babel-polyfill';  // ... needed for String.fromCodePoint for Emojis ...
import ScrollableTabView from 'react-native-scrollable-tab-view';

//import Icon from 'react-native-vector-icons/Ionicons';

import emojiData from 'emoji-datasource';
import { orderBy } from 'lodash';
import AppColors from '../templates/appColors';
import EmojiTabBar from './EmojiTabBar';

console.warn('Emojis are loading ... ');
const charFromCode = utf16 => String.fromCodePoint(...utf16.split('-').map(u => `0x${u}`));

// ... build our own stripped down version of the emoji database ...
const emojiParsedData = emojiData.map(item => {
    const newObject = { 
      category: item.category, 
      image: item.image, 
      name: item.name,
      unified: item.unified,
      emoji_code: charFromCode(item.unified),
      sort_order: item.sort_order,
      short_names: item.short_names,
      skin_variations: item.skin_variations };
    return newObject;
  });
const sortedEmojis = orderBy(emojiParsedData, 'sort_order');
//console.log(sortedEmojis);
//const eFlags = sortedEmojis.filter((item) => item.category === 'Flags');
//const eSmileys = sortedEmojis.filter((item) => item.category === 'Smileys & People');
//console.log(eFlags);

// ... build a list of unique emoji categories ...
// ... only need to do this until we story the values in Redux / JSON data ...
// ... or when there is a new emoji group - could happen in May of each year ...
/*
function unique(inputArray, prop) {
  return inputArray.map(item => { return item[prop]; }).filter((item, i, a) => {
    return i === a.indexOf(item);
  });
}
*/
//const emojiCats = unique(sortedEmojis, 'category');
const emojiCats = [
  'Recently Selected',
  'Smileys & People',
  'Animals & Nature', 
  'Food & Drink', 
  'Activities', 
  'Travel & Places', 
  'Objects', 
  'Symbols', 
  'Flags'
];
console.log(emojiCats);

/*
[ ... sort order as per whapsapp ...
9) "Recently Used"
8) "Smileys & People"
6) "Animals & Nature", 
1) "Food & Drink", 
2) "Activities", 
0) "Travel & Places", 
7) "Objects", 
4) "Symbols", 
3) "Flags", 
5) "Skin Tones", ... not used (why is this an extra category?) ...
]
*/

const listItemHeight = 62;  // ... used to calculate faster scrolls ...

export default class EmojiPicker extends Component {

  static navigatorStyle = {
    tabBarHidden: true,   // ... we need space for the emojis ...
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarTextColor: AppColors.mainLiteColor,
    navBarBackgroundColor: AppColors.hiliteColor,
    navBarTranslucent: false
  }

  constructor(props) {
    super(props);
    this.tabBarState = 'hidden';
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      checked: false,
      loading: false,
      //emojiGroups: EMOJI_GROUPS.slice(0, 1),  // ... extract first array element ...
      selected: (new Map(): Map<string, boolean>)
    };
  }

  componentDidMount() {
    //console.log(`Switch is: ${this.state.checked}`);
    console.log(this.state);
  }

  componentDidUpdate() {
    //console.log(`Switch is: ${this.state.checked}`);
    //console.log(this.state);
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'close') { // this is the same id field from the static navigatorButtons
        this.toggleTabs();
      }
      if (event.id === 'add') {
        Alert.alert('NavBar', 'Add button pressed');
      }
    }
  }

  onPressItem = (id: string) => {
    // ... updater functions are preferred for transactional updates ...
    //console.log(`onPressItem id: ${id}`);
    this.setState((state) => {
      // ... copy the map rather than modifying state ...
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // ... toggle item ...
      return { selected };
    });
  };

  getItemLayout = (data, index) => (  // ... so flatlist can scroll faster ...
    { length: listItemHeight, offset: listItemHeight * index, index }
  );

  toggleTabs = () => {
    const to = this.tabBarState === 'shown' ? 'hidden' : 'shown';
    this.props.navigator.toggleTabs({
      to,
      animated: true
    });
    this.tabBarState = to;
  };

/*  
  toggleTabs = () => {
    this.setState({ tabsShown: !this.state.tabsShown });
  };
*/

  toggleSwitch = () => {
    this.setState({ checked: !this.state.checked });
  }
  
  showEmojis = (emojiGroup) => (
    <FlatList
        numColumns={7}
        horizontal={false}
        data={emojiGroup}
        initialNumToRender={35}
        extraData={this.state}
        getItemLayout={this.getItemLayout}
        keyExtractor={item => item.unified}
        renderItem={this.renderEmojiItem}
        ListHeaderComponent={this.renderHeader}
    />
  );

  renderEmojiItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.iconValue}>{item.emoji_code}</Text>
      <Text style={styles.textValue}>{item.short_names[0]}</Text>
    </View>
  );

  renderHeader = () => {
      if (!this.state.loading) return null;
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE'
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollableTabView
          style={{ backgroundColor: '#f2f2f2' }}
          initialPage={0}
          //tabBarPosition='overlayTop'
          renderTabBar={() => <EmojiTabBar tabGroupTitle={emojiCats} />}
        >
          <ScrollView tabLabel="stopwatch" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Your Favourite Collection of Emojis</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="happy" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Smileys & People'))}
          </ScrollView>
          <ScrollView tabLabel="paw" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Animals & Nature'))}
          </ScrollView>
          <ScrollView tabLabel="pizza" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Food & Drink'))}
          </ScrollView>
          <ScrollView tabLabel="tennisball" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Activities'))}
          </ScrollView>
          <ScrollView tabLabel="plane" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Travel & Places'))}
          </ScrollView>
          <ScrollView tabLabel="bulb" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Objects'))}
          </ScrollView>
          <ScrollView tabLabel="star" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Symbols'))}
          </ScrollView>
          <ScrollView tabLabel="flag" style={styles.tabView}>
            {this.showEmojis(sortedEmojis.filter((item) => item.category === 'Flags'))}
          </ScrollView>
        </ScrollableTabView>
        <View style={styles.statusBar}>
          <View style={styles.historyBar} >
            <Text>Markus was here!</Text>
          </View>            
        </View>      
      </View>
    );
  }
}

/*

            {this.showEmojiList(sortedEmojis.filter((item) => item.category === 'flag'))}
sortedEmojis.filter((item) => item.category === thisGroup)

9) "Recently Used" - Clock
8) "Smileys & People" - Smiley
6) "Animals & Nature", - Teddy Bear
1) "Food & Drink", - Coffee Cup
2) "Activities", - Soccer Ball
0) "Travel & Places", Car from Front
7) "Objects", - Lightbulb
4) "Symbols", - Number Sign # on Key
3) "Flags", - Flag Symbol
5) "Skin Tones", ... not used (why is this an extra category?) ...

  
      <Text style={styles.textValue}>{item.short_names.slice(0, 1)} </Text>

    <EmojiItem 
      id={item.id}
      thumbNail={item.thumb}
      Name={item.title}
      Teaser={item.headline}
      Description={item.description}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
    />

onPress={() => this.setState({checked: !this.state.checked})    
          onPress={(checked) => this.toggleSwitch(checked)} 

  state = {
    toggled: false,
    dataObj: [{ id: 10 }, { id: 20 }]
    //scrWidth: Dimensions.get('window').width,
    //scrHeight: Dimensions.get('window').height,
    //viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

*/

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: AppColors.paperColor
  },
  container: {
    elevation: 1,
    borderRadius: 2,
    width: '14.28571428571429%',
    height: listItemHeight,  // ... used to calculate faster scrolls ...
    margin: 0,
    padding: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  statusBar: {
    height: 40,
    flexDirection: 'row',
    padding: (Platform.OS === 'android' ? 3 : 3),
    alignItems: 'center',
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
    justifyContent: 'space-around'
  },
  historyBar: {
    height: 26,
    padding: 3,
    borderRadius: 15,
    width: '70%',
    backgroundColor: AppColors.paperColor
  },
  iconValue: {
    color: 'black',
    fontSize: 36,
    textAlign: 'center'
  },
  textValue: {
    color: 'black',
    fontSize: 9,
    textAlign: 'center'
  },
  tabView: {
    flex: 1,
    padding: 0,
    backgroundColor: AppColors.paperColor
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.25)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },  
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center'
  },  
  textInput: {
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

/*-------------------------------------------------------------------------
/* ... 11.1.2018 - other notes on EmojiList handling ...
/*-------------------------------------------------------------------------

*/
