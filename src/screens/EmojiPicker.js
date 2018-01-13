import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import emojiData from 'emoji-datasource/emoji.json';
import Emoji from 'react-native-emoji';
import { orderBy } from 'lodash';
//import nodeEmoji from 'node-emoji';
import AppColors from '../templates/appColors';
//import EmojiItem from '../components/EmojiItem';

console.warn('Emojis are loading ... ');

// ... build a list of unique emoji categories ...
function unique(inputArray, prop) {
  return inputArray.map(item => { return item[prop]; }).filter((item, i, a) => {
    return i === a.indexOf(item);
  });
}
const emojiCats = unique(emojiData, 'category');
console.log(emojiCats);

//function isCategory(emojicon) {
//  return emojicon.category === 'Skin Tones';
//}
//const emojiSmileys = emojiData.filter(isCategory);
const eFlags = emojiData.filter((item) => item.category === 'Flags');
//const eSmileys = emojiData.filter((item) => item.category === 'Smileys & People');
console.log(eFlags);

/*
const eSmileys = emojiData.filter((transformer) => { 
  return transformer.category === 'Autobot');
autobots ==  [
  {
    name: 'Optimus Prime',
    form: 'Freightliner Truck',
    team: 'Autobot'
  },
  {
    name: 'Bumblebee',
    form: 'VW Beetle',
    team: 'Autobot'
  }
]

/*

 [
 "Symbols", 
 "Activities", 
 "Flags", 
 "Travel & Places", 
 "Food & Drink", 
 "Animals & Nature", 
 "Smileys & People", 
 "Objects", 
 "Skin Tones"
 ]


function groupOf(inputArray, prop, value) {
  return inputArray.map(item => { return item[prop]; }).filter( (prop) => {
      return prop === value;
    });
}

function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}

groupBy(arr,'type')  // Object {orange: Array[2], banana: Array[2]}
groupBy(arr,'title') // Object {First: Array[1], Second: Array[1], 
  Third: Array[1], Fourth: Array[1]}

*/

const emojiParsedData = emojiData.map(item => {
    const newObject = { 
      category: item.category, 
      image: item.image, 
      name: item.name,
      unified: item.unified,
      //emoji_code: charFromUtf16(item.unified),
      sort_order: item.sort_order,
      short_names: item.short_names,
      skin_variations: item.skin_variations };
    return newObject;
  });
const sortedEmojis = orderBy(emojiParsedData, 'sort_order');
console.log(sortedEmojis);

const listItemHeight = 70;  // ... used to calculate faster scrolls ...

export default class EmojiPicker extends PureComponent {

  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarTextColor: AppColors.mainLiteColor,
    navBarBackgroundColor: AppColors.hiliteColor,
    navBarTranslucent: false
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
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

  toggleSwitch = () => {
    this.setState({ checked: !this.state.checked });
  }
  
  renderEmojiItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.iconValue}><Emoji name={item.short_names[0]} /></Text>
      <Text style={styles.textValue}>{item.short_names[0]}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.outerContainer}>
        <FlatList
          numColumns={5}
          horizontal={false}
          data={eFlags}
          initialNumToRender={45}
          //extraData={this.state}
          //getItemLayout={this.getItemLayout}
          keyExtractor={item => item.unified}
          renderItem={this.renderEmojiItem}
          //ItemSeparatorComponent={this.itemSeparator}
        />
      </View>
    );
  }
}

/*

      <Text style={styles.textValue}>{item.short_names.slice(0, 1)} </Text>
      <Text style={styles.iconValue}><Emoji name="coffee" /></Text>
      <Text style={styles.iconValue}>{nodeEmoji.get(item.short_names.slice(0, 1))}</Text>

        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={{ fontSize: 48 }}>
          <Emoji name="point_left" />
          <Emoji name="watermelon" />
        </Text>

        <FlatList
          data={emojiData}
          //extraData={this.state}
          //keyExtractor={item => item.id}
          renderItem={this.renderEmojiItem}
          //ItemSeparatorComponent={this.itemSeparator}
        />

    <EmojiItem 
      id={item.id}
      thumbNail={item.thumb}
      Name={item.title}
      Teaser={item.headline}
      Description={item.description}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
    />

renderItem({ 
  item: Object, 
  index: number, 
  separators: { 
    highlight: Function, 
    unhighlight: Function, 
    updateProps: Function(select: string, newProps: Object) 
  } 
}) => ?React.Element

onPress={() => this.setState({checked: !this.state.checked})    
          onPress={(checked) => this.toggleSwitch(checked)} 

        <Switch 
          onValueChange={this.toggleSwitch} 
          value={this.state.toggled} 
        />

      <FlatList
        data={FunPeople}
        renderItem={({ item }) => {
          return (<Text>{item.id}) {item.title} - {item.description}</Text>);
        }}
      />

            title={item.title}
            desc={item.description}
        <FlatList
          data={FunPeople}
          renderItem={({ item, index }) => <FlatListItem item={item} index={index} />}
        />

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
    width: '20%',
    height: listItemHeight,  // ... used to calculate faster scrolls ...
    //flexDirection: 'row',
    margin: 0,
    padding: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85
  },
  iconValue: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center'
  },
  textValue: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center'
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
