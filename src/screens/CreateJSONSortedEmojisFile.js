import React, { PureComponent } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import emojiData from 'emoji-datasource';
import { orderBy } from 'lodash';
import AppColors from '../templates/appColors';
import EmojiTabBar from './EmojiTabBar';
import EmojiItem from '../components/EmojiItem';

console.warn('Emojis are loading ... ');
const charFromCode = utf16 => String.fromCodePoint(...utf16.split('-').map(u => `0x${u}`));
const GUID = function (append) {   // ... nice function to create a unique id ...
    let d = new Date().getTime();
    const uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
        const r = (d + (Math.random() * 16)) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    return append ? `${uuid}-${append}` : uuid;
};

// ... build our own stripped down version of the emoji database ...
const emojiParsedData = emojiData.map(item => {
    const newObject = { 
      cat: item.category, 
      emoji: charFromCode(item.unified),
      sort: item.sort_order,
      name: item.short_name };
    return newObject;
  });
const sortedEmojis = orderBy(emojiParsedData, 'sort');
console.log(JSON.stringify(sortedEmojis));

// ... now build a translation function to shorten category names ...
// ... optionally remove the image name ...
// ... still need to deal with the skin variations properly ...
// ... also deal with the 'alt' names for searching ...

/* ... use the map function for this ...
var reformattedArray = kvArray.map(function(obj) { 
  var rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});
*/

//console.log(sortedEmojis);
//const eFlags = sortedEmojis.filter((item) => item.category === 'Flags');
//const eSmileys = sortedEmojis.filter((item) => item.category === 'Smileys & People');
//console.log(eFlags);

// ... build a list of unique emoji categories ...
// ... only need to do this until we story the values in Redux / JSON data ...
// ... or when there is a new emoji group - could happen in May of each year ...
/*

      img: item.image, 
      uni: item.unified,

function unique(inputArray, prop) {
  return inputArray.map(item => { return item[prop]; }).filter((item, i, a) => {
    return i === a.indexOf(item);
  });
}
*/
//const emojiCats = unique(sortedEmojis, 'category');
const emojiCats = [
  'My Favorite Emojis',
  'Smileys & People',
  'Animals & Nature', 
  'Food & Drink', 
  'Activities', 
  'Travel & Places', 
  'Objects', 
  'Symbols', 
  'Flags'
];
//console.log(emojiCats);

/*
[ ... sort order as per whapsapp ...
9) 'REC', "Recently Used"
8) 'SMI', "Smileys & People"
6) 'ANI', "Animals & Nature", 
1) 'FOO', "Food & Drink", 
2) 'ACT', "Activities", 
0) 'TRV', "Travel & Places", 
7) 'OBJ', "Objects", 
4) 'SYM', "Symbols", 
3) 'FLG', "Flags", 
5) 'SKN', "Skin Tones", ... not used (why is this an extra category?) ...
]
*/

const listItemHeight = 62;  // ... used to calculate faster scrolls ...

export default class EmojiPicker extends PureComponent {

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
      canEdit: false,
      emojiCode: '',
      emojiName: '',
      emojisClicked: '',
      myEmojis: []
    };
  }

  componentDidMount() {
    //console.log(`Switch is: ${this.state.checked}`);
    //console.log(this.state);
  }

  componentWillUpdate() {
    console.log('About to update');
  }

  componentDidUpdate() {
    //console.log(`Switch is: ${this.state.checked}`);
    //console.log(this.state);
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'close') { // this is the same id field from the static navigatorButtons
        this.toggleTabs();
      }
      if (event.id === 'add') {
        Alert.alert('NavBar', 'Add button pressed');
      }
    }
  }

  onPressItem = (unified, shortName, emojiCode) => {
    this.setState({ emojisClicked: `${emojiCode} ${this.state.emojisClicked}` });
    this.setState({ emojiCode, emojiName: shortName });
    // ... see if we should update theusage count or add a new emoji ...

    // ... add this item to the user's emoji list (redux it later) ...
    this.setState(prevState => ({
      myEmojis: [...prevState.myEmojis, { unified, shortName, emojiCode, numUsed: 0 }]
    }));
  };

/*
    this.setState((state) => {
      // ... copy the map rather than modifying state ...
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // ... toggle item ...
      return { selected };
    });
*/

  getItemLayout = (data, index) => (  // ... so flatlist can scroll faster ...
    { length: listItemHeight, offset: listItemHeight * index, index }
  );

  setEditFlag = (allowEdits) => {
    //console.log(`setEditFlag value: ${allowEdits}`);
    this.setState({ canEdit: allowEdits });
  };

  toggleSwitch = () => {
    this.setState({ checked: !this.state.checked });
  }
  
  toggleTabs = () => {
    const to = this.tabBarState === 'shown' ? 'hidden' : 'shown';
    this.props.navigator.toggleTabs({
      to,
      animated: true
    });
    this.tabBarState = to;
  };

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

  renderEmojiItem = ({ item }) => {
    return (
      <EmojiItem 
        emojiId={item.unified}
        emojiString={item.emojiCode}
        emojiName={item.shortName}
        itemHeight={listItemHeight}
        onPressItem={this.onPressItem}
        //selected={!!this.state.selected.get(item.id)}
      />
    );
  }

  renderHeader = () => {
      if (!this.state.loading) return null;
      return (
        <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: '#CED0CE' }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
  }

  render() {
    const backColor = this.state.emojiCode === '' ? 'transparent' : 'white';
    return (
      <View style={styles.outerContainer}>

        <View style={styles.statusBar}>
          <View style={styles.historyBar} >
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.textHistory}>
              {this.state.emojisClicked}
            </Text>
          </View>
          <View style={[styles.iconPaper, { backgroundColor: backColor }]}>
            <Text style={styles.iconPreview} >
              {this.state.emojiCode}
            </Text>
          </View>
          <View>
            <Icon name='md-checkmark-circle-outline' size={38} color={AppColors.paperColor} />
          </View>
        </View>

        <ScrollableTabView
          style={{ backgroundColor: '#f2f2f2' }}
          initialPage={0}
          //tabBarPosition='overlayTop'
          renderTabBar={() => <EmojiTabBar tabGroupTitle={emojiCats} canEdit={this.setEditFlag} />}
        >
          <ScrollView tabLabel="stopwatch" style={styles.tabView}>
            {this.showEmojis(this.state.myEmojis)}
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
      </View>
    );
  }
}

/*

              {(this.state.emojiCode === '' ? null : this.state.emojiCode)}
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
  statusBar: {
    height: 42,
    flexDirection: 'row',
    padding: (Platform.OS === 'android' ? 3 : 3),
    alignItems: 'center',
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
    justifyContent: 'space-around'
  },
  historyBar: {
    height: 26,
    paddingBottom: 2,
    borderRadius: 15,
    width: '65%',
    backgroundColor: '#d5d5d5'
  },
  textHistory: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8
  },
  tabView: {
    flex: 1,
    padding: 0,
    backgroundColor: AppColors.paperColor
  },
  iconPaper: {
    paddingBottom: 1,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 3,
    backgroundColor: 'transparent'
  },
  iconPreview: {
    color: 'black',
    fontSize: 31,
    textAlign: 'center',
    paddingBottom: 1
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

-----------------------------------------------------------------------------------
 SIMPLE STATE HANDLING EXAMPLE
-----------------------------------------------------------------------------------

 state = {
    todos: ['Click to remove', 'Learn React Native', 'Write Code', 'Ship App'],
  }

  onAddTodo = (text) => {
    const {todos} = this.state
    this.setState({
      todos: [text, ...todos],
    })
  }

  onFindTodo = (text) => {
    const {todos} = this.state
    // ... try to find this one in the list ...
    // ... if found - return the item & true ...
    // ... otherwise return null & false ...
  }
  
  onUpdateTodo = (index, text) => {
    const {todos} = this.state
    // ... first find the one to update ...
    // ... if found then update - else we add it ...
    // ... copy all stuff up to the current item ...
    // ... insert in the updated item ...
    // ... copy all items after the inserted update ...
    // ... return the result ...
    this.setState({
      todos: [text, ...todos],
    })
  }

  onRemoveTodo = (index) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter((todo, i) => i !== index),
    })
  }

-----------------------------------------------------------------------------------
 LOCAL STORAGE EXAMPLE ( looks like it is using AsyncStorage )
-----------------------------------------------------------------------------------

https://github.com/itinance/react-native-fs
"Native filesystem access for react-native"
NOTE: ( Markus says unless you want to build a download file plugin or something
- you probably don't need this low level plugin - hooks into the native file system )

-----------------------------------------------------------------------------------

// our array
var movies = ["Reservoir Dogs", "Pulp Fiction", "Jackie Brown", 
"Kill Bill", "Death Proof", "Inglourious Basterds"];
 
// storing our array as a string
localStorage.setItem("quentinTarantino", JSON.stringify(movies));
 
// retrieving our data and converting it back into an array
var retrievedData = localStorage.getItem("quentinTarantino");
var movies2 = JSON.parse(retrievedData);
 
//making sure it still is an array
alert(movies2.length);

-----------------------------------------------------------------------------------
 ASYNCSTORAGE EXAMPLE
-----------------------------------------------------------------------------------

https://github.com/jasonmerino/react-native-simple-store - this is a library on top
of AsyncStorage that may be interesting to save our offline work. It's described as
"A minimalistic wrapper around React Native's AsyncStorage." 

--- OR ---

Redux Persist has this NASTY bug in dealing with database changes (i.e. when the structure 
of the state changes) That's why they created the "redux-persist-migrate" module.  
There is also "redux-persist-transform-compress"
and "redux-persist-transform-filter" - need to investigate for more info

-----------------------------------------------------------------------------------

https://facebook.github.io/react-native/docs/asyncstorage.html

Example:

let UID123_object = {
  name: 'Chris',
  age: 30,
  traits: {hair: 'brown', eyes: 'brown'},
};
// You only need to define what will be added or updated
let UID123_delta = {
  age: 31,
  traits: {eyes: 'blue', shoe_size: 10},
};

AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
  AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
    AsyncStorage.getItem('UID123', (err, result) => {
      console.log(result);
    });
  });
});

// Console log result:
// => {'name':'Chris','age':31,'traits':
//    {'shoe_size':10,'hair':'brown','eyes':'blue'}}

-----------------------------------------------------------------------------------

import React, { Component } from 'react'
import { AppRegistry, View, Text, AsyncStorage, StyleSheet } from 'react-native'

import Input from './Input'
const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'

class App extends Component {
  state = {name: 'World'}

  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY)
      if (name !== null) {
        this.setState({name})
      }
    } catch (e) {
      console.error('Failed to load name.')
    }
  }

  save = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name)
      this.setState({name})
    } catch (e) {
      console.error('Failed to save name.')
    }
  }

  render() {
    const {name} = this.state

    return (
      <View>
        <Input
          placeholder={'Type your name, hit enter, and refresh!'}
          onSubmitEditing={this.save}
        />
        <Text style={styles.text}>
          Hello {name}!
        </Text>
      </View>
    )
  }
}

-----------------------------------------------------------------------------------
 REDUX PERSIST (Local Storage) EXAMPLE
-----------------------------------------------------------------------------------

http://www.reactnativeexpress.com/redux_persist

-----------------------------------------------------------------------------------
 REDUX FULL (Cloud Storage) EXAMPLE
-----------------------------------------------------------------------------------

http://www.reactnativeexpress.com/react_redux

Example File: (emojisRedux.js)

// The types of actions that you can dispatch to modify the state of the store
export const emojis = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item) => {
    return {type: emojis.ADD, payload: item}
  },
  remove: (index) => {
    return {type: emojis.REMOVE, payload: index}
  }
}

// Initial state of the store
const initialState = {
  todos: ['Click to remove', 'Learn React Native', 'Write Code', 'Ship App'],
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const {todos} = state
  const {type, payload} = action

  switch (type) {
    case emojis.ADD: {
      return {
        ...state,
        todos: [payload, ...todos],
      }
    }
    case emojis.REMOVE: {
      return {
        ...state,
        todos: todos.filter((todo, i) => i !== payload),
      }
    }
  }

  return state
}

-----------------------------------------------------------------------------------

You can serialize any object with any types inside to json-string with "JSON.stringify" 
and save with AsyncStorage. Loading should be easy too - load as string, deserialize 
with "JSON.parse" to object instance with any types inside.

-----------------------------------------------------------------------------------

https://medium.com/the-react-native-log/a-mini-course-on-react-native-flexbox-2832a1ccc6

Use PixelRatio to make a perfect circle when using border radius.

-----------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Arial',

    ...Platform.select({ 
      ios: { color: '#333' },
      android: { color: '#ccc' },
    }),


  },
});

-----------------------------------------------------------------------------------

*/
