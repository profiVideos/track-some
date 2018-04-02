import React from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text,
  Alert,
  Image,
  FlatList,
  //ScrollView,
  StyleSheet, 
  Dimensions,
  //ToastAndroid,
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { Tab, Tabs } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageTabBar from './ImageTabBar';
import AppColors from '../templates/appColors';
import RenderTags from '../components/RenderTags';
import NoteDisplay from '../components/NoteDisplay';
import {
  getCard,
  deleteNote,
  currentNote,
  highlightNote,
  setRenderNotes,
  deleteCardNote,
  setNoteSelected,
} from '../store/actions';
import store from '../store';

const IconMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={`${props.icon}  ${props.text}`} 
  />
);

const menuOptionsStyles = {
  optionsContainer: {
    width: 120,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const whatDoYouNeed = state => {
  return {
    saveMode: state.login.saveMode,
    thisNote: state.notes.thisNote,
    activeList: state.lists.activeList,
    hideNotes: state.notes.renderNotes,
    highlighted: state.notes.highlighted,
    notesUpdated: state.notes.lastUpdated,
  };
};

class CardDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.onNoteItemPress = this.onNoteItemPress.bind(this);
    this.onNoteItemToggle = this.onNoteItemToggle.bind(this);
    this.onNoteItemMenuPress = this.onNoteItemMenuPress.bind(this);
    Dimensions.addEventListener('change', this.onDeviceChange);
    this.state = {
      didSave: false,
      isVisible: false,
      infoWidth: Dimensions.get('window').width - 115  //112
    };
  }

  componentWillMount() {
    console.log('inside card item ...');
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDeviceChange);
  }

  onDeviceChange = (dims) => {
    this.setState({
      infoWidth: dims.window.width - 115  //112
    });
  };

  onTouchablePress = () => { 
    this.props.onPressItem(this.props.item.key);
  }

  onLongPressItem = () => {
    this.props.onMenuPress('edit', this.props.item);
  }

  onToggleCheck = () => { 
    this.props.onToggleItem(this.props.item.key, !this.props.item.selected);
  }

  onNotesToggle = () => { 
    this.props.dispatch(setRenderNotes(!this.props.hideNotes));
  }

  onMenuSelect = (value, item) => { 
    this.props.onMenuPress(value, item);
  }

/*

const DOUBLE_PRESS_DELAY = 300;

// ...

**
 * Double Press recognition
 * @param  {Event} e
 *
handleImagePress(e) {
  const now = new Date().getTime();

  console.log(e);

  if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
    delete this.lastImagePress;
    this.handleImageDoublePress(e);
  }
  else {
    this.lastImagePress = now;
  }
}

handleImageDoublePress(e) {
  console.log('double press activated!');
}

// ...

<TouchableWithoutFeedback onPress={this.handleImagePress}>
  <Image style={styles.verseArtwork} source={verse.artwork} />
</TouchableWithoutFeedback>

RewriteEngine On
RewriteCond %{SERVER_PORT} 80 
RewriteRule ^(.*)$ https://%{SERVER_NAME}/$1 [R=301,L] 
</IfModule>

Here is how you encode normal text to base64 in Node.js:

//Buffer() requires a number, array or string as the first parameter, 
and an optional encoding type as the second parameter. 
// Default is utf8, possible encoding types are ascii, utf8, ucs2, base64, binary, and hex
var b = new Buffer('JavaScript');
// If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
// We can make it convert to other formats by passing the encoding type to toString().
var s = b.toString('base64');
And here is how you decode base64 encoded strings:

var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
var s = b.toString();

Another alternative, and probably the preferred alternative, is to use NativeModules. 
The Medium article shows how. It requires creating a native module.

NativeModules.ReadImageData.readImage(path, (base64Image) => {
  // Do something here.
});

  onShareButton = (item, notes) => {
    this.props.showShareSheet(item, notes);
  }
*/

  onNoteDelete(note) {
    // ... if attached to a card - remove the note link from card and update card ...
    if (note.card !== '') {
      //ToastAndroid.show(`Update Card: ${note.card}`, ToastAndroid.SHORT);
      // ... get notes into the current card object and remove note link ...
      this.props.dispatch(getCard(note.card));
      this.props.dispatch(deleteCardNote(note.key));
      // ... update of card will happen in WillReceiveProps ...
    }
    // ... remove the note itself and if attached to a list - decrement list notes counter ...
    //ToastAndroid.show(`Delete Note & List Link: ${note.list}`, ToastAndroid.SHORT);
    this.props.dispatch(deleteNote(note.key, note.list));
  }

  onNoteItemMenuPress(option, note) {
    switch (option) {
      case 'edit': {
        this.props.dispatch(currentNote(note));
        this.props.openNoteEditModal(note, this.props.item); 
        break;
      }
      case 'delete': {
        Alert.alert('Delete Note', 
          'You are about to remove this note.\nDo you really want to do this?',
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.onNoteDelete(note) }]);
        break;
      }
      default: break;
    }  // ... switch ...
  }

  onNoteItemPress(key) {
    // ... if item was already selected - and user presses again - deselect ...
    if (this.props.highlighted === key) {
      this.props.dispatch(highlightNote(''));
    } else this.props.dispatch(highlightNote(key));
  }

  onNoteItemToggle(key, selected) {
    this.props.dispatch(setNoteSelected(key, selected));
  }

  itemTagRemove() {
    //this.props.dispatch(deleteCardTag(tag));
  }

  itemSeparator = () => {
    return (<View style={{ marginTop: 1 }} />);
  };

  buildNotesString(notes) {
    if (this.props.hideNotes) return;
    const noteString = notes.map((item) => {
      return (
        <View>
          <Text style={styles.shareName}>{`${item.title}`}</Text>
          <Text style={styles.shareDesc}>{`${item.note}`}</Text>
        </View>
      );
    });
    return noteString;
  }

  renderNoteDisplay = ({ item }) => {
    const noteColor = (item.color !== '' ? item.color : '#f8f8f8');
    return (
      <NoteDisplay
        item={item}
        paperColor={noteColor}
        marked={item.key === this.props.highlighted}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        hilite={item.key === this.props.highlighted ? noteColor : noteColor} 
        onPressItem={this.onNoteItemPress}      // ... used to highlight an item ...
        onToggleItem={this.onNoteItemToggle}    // ... turns the checked status on/off ...
        onMenuPress={this.onNoteItemMenuPress}
      />
    );
  }

  renderCardNotes() {
    const cardNotesResults = store.getCardNotes(this.props.item.key);
    return (
      <FlatList
        style={{ marginTop: 2, backgroundColor: AppColors.paperColor }}
        data={cardNotesResults}
        extraData={this.props.notesUpdated}
        renderItem={this.renderNoteDisplay}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }

  renderFullCard() {
    return (
      <Tabs renderTabBar={() => <ImageTabBar />}>
        <Tab heading="Tab1" style={styles.tabView}>
          <View style={styles.responsiveContainer}>
            <Image 
             style={styles.fullWidthImage}
             //style={styles.responsiveImg} 
             source={{ uri: 
              `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
            />
          </View>
        </Tab>
        <Tab heading="Tab2" style={styles.tabView}>
          { this.renderInfoPanel() }
        </Tab>
        <Tab heading="Tab3" style={styles.tabView}>
          { this.renderCardNotes() }
        </Tab>
        <Tab heading="Tab4" style={styles.tabView}>
          { this.renderShareOptions() }
        </Tab>
      </Tabs>
    );
  }

  renderMyTags() {
    if (this.props.marked === false) return;
    return (
      <View style={styles.tagsBar}>
        <RenderTags
          noRemove
          myTags={JSON.parse(this.props.item.tags)} 
          onPressTag={tag => this.itemTagRemove(tag)} 
        />
      </View>
    );
  }

  renderOptionMenu = () => (
    <Menu onSelect={(value) => this.onMenuSelect(value, this.props.item)}>
      <MenuTrigger>
        <Icon size={18} name={'ellipsis-v'} style={styles.menuWrapper} color={'#212191'} />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <IconMenuOption value={'edit'} icon='✏️' text='Edit' />
        <IconMenuOption value={'tags'} icon='🏷️' text='Tags' />
        <IconMenuOption value={'note'} icon='📝' text='Add Note' />
        <IconMenuOption value={'share'} icon='💨' text='Share' />
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

  renderAllNotes(cardId) {
    if (this.props.marked === false) return;
    const cardNotes = store.getCardNotes(cardId);
    //ToastAndroid.show(`Inside Render All Notes: ${JSON.stringify(cardNotes)}`, ToastAndroid.LONG);
    if (Object.keys(cardNotes).length === 0) return;
    return (
      <View>
        { this.buildNotesString(cardNotes) }
        <TouchableOpacity onPress={this.onNotesToggle}>
          <View style={styles.shareRowStyle}>
            <Icon 
              size={20}
              name={this.props.hideNotes ? 'check-square-o' : 'square-o'} 
              style={{ width: 24, paddingTop: 2 }} 
              color={'#c2c2c2'} 
            />            
            <Text style={{ color: 'white' }}>Hide Notes on Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderShareOptions() {
    if (this.props.marked === false) return;
    return (
      <View style={styles.shareContainer}>
        <Text style={styles.shareTitle}>Share this photoDrop!</Text>
        <View style={styles.previewSize}>
          <Image 
            style={styles.shareImage}
            source={{ 
              uri: `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
          />
        </View>
        <Text style={styles.shareName}>{this.props.item.name}</Text>
        <Text style={styles.shareDesc}>{this.props.item.desc}</Text>
        { this.renderAllNotes(this.props.item.key) }
        <TouchableNativeFeedback onPress={this.props.showShareSheet}>
          <View style={styles.warmButton}>
            <Text style={styles.warmText}>OK, Share It</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  renderInfoPanel() {
    if (this.props.marked === false) return;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>

          <View style={styles.rowStyle}>
            <View style={styles.previewOutline}>
              <Text style={styles.emojiIcon}>{this.props.item.icon}</Text>
            </View>
            <View>
              <Text>Rating goes here!</Text>
              <Text style={styles.extraInfo} >{this.props.catDesc}</Text>
            </View>
          </View>

          <Text style={[styles.itemName, { paddingTop: 7 }]}>{this.props.item.name}</Text>
          <Text style={[styles.subHeading, { marginTop: 0 }]}>{this.props.item.desc}</Text>
          { this.renderMyTags() }

        </View>
      </View>
    );
  }

  render() {
    const infoWidth = this.state.infoWidth;
    const backColor = this.props.hilite;   // ... AppColors.hiliteColor, otherwise white ...
    const renderFull = this.props.marked ? this.renderFullCard() : <View />;
    const tagsBadge = (this.props.numTags === 0) ? <View /> :
      (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.extraInfo}>Tags:</Text>
         <Text style={styles.numTextStyle}>{this.props.numTags}</Text>
       </View>);
    const notesBadge = (this.props.numNotes === 0) ? <View /> :
      (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.extraInfo}>Notes:</Text>
         <Text style={styles.numTextStyle}>{this.props.numNotes}</Text>
       </View>);
    const itemDesc = (this.props.item.desc === '') ? <View /> :
      (<Text ellipsizeMode='tail' numberOfLines={1} style={styles.subHeading}>
         {this.props.item.desc}
       </Text>);
    const categoryDesc = (this.props.catDesc === '') ? <View /> :
      <Text style={styles.extraInfo} >{`${this.props.catDesc}  `}</Text>;

    return (
      <View>
        <View style={[styles.outerWrapper, { backgroundColor: backColor }]}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={this.onIconChange}>
              {this.props.item.iconType === 'PHO' ?  
                <Image 
                  style={styles.imageStyle} 
                  source={{ uri: 
                    `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
                /> : 
                <Text style={styles.itemIcon}>{this.props.item.icon}</Text>
              }
            </TouchableOpacity>
          </View>
          <TouchableNativeFeedback 
            onPress={this.onTouchablePress}
            onLongPress={this.onLongPressItem}
          >
            <View style={[styles.infoWrapper, { width: infoWidth }]}>
              <Text 
                ellipsizeMode='tail' 
                numberOfLines={1} 
                style={styles.itemName}
              >
                {this.props.item.name}
              </Text>
              {itemDesc}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {categoryDesc}
                {tagsBadge}
                {notesBadge}
              </View>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.checkWrapper}>
            <TouchableNativeFeedback>
              { this.renderOptionMenu() }
            </TouchableNativeFeedback>
            <TouchableOpacity onPress={this.onToggleCheck}>
              <Icon 
                size={20}
                name={this.props.checkIcon} 
                style={styles.checkStyle} 
                color={'#212121'} 
              />            
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fullView}>
          { renderFull }
        </View>
      </View>
    );
  }
}

export default connect(whatDoYouNeed)(CardDisplay);

const styles = StyleSheet.create({
  previewSize: {
    //height: '45%',
    width: '50%',
    aspectRatio: (1056 / 768),
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 3,
    borderColor: '#ccc',
    borderWidth: 1.15
  },
  shareImage: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    resizeMode: 'contain',    
  },
  shareName: {
    fontSize: 17,
    fontWeight: '500',
    paddingTop: 7,
    paddingBottom: 1,
    marginHorizontal: 10,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.70)'
  },
  shareDesc: {
    fontSize: 14,
    marginHorizontal: 12,
    textAlign: 'center',
    color: '#aaa'
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: '500',
    //paddingTop: 7,
    paddingBottom: 7,
    opacity: 0.70,
    color: AppColors.accentColor
  },
  shareRowStyle: {
    width: '100%',
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warmButton: {
    elevation: 2,
    paddingVertical: 8,
    //paddingBottom: 6,       // ... just looks better ...
    paddingHorizontal: 25,
    borderRadius: 5,
    margin: 10,              // ... so we can see shadow ...
    //marginHorizontal: 7,
    backgroundColor: AppColors.mainDarkColor
  },
  warmText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.hiliteColor
  },
  tagsBar: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 7,
    flexWrap: 'wrap',    
    width: '100%',
    alignItems: 'center'
  },
  emojiIcon: {
    color: 'black',
    fontSize: 42,
    textAlign: 'center',
    paddingBottom: 1
  },
  previewOutline: {
    height: 62,
    width: 82,
    //padding: 3,
    alignItems: 'center', 
    borderRadius: 5,
    marginTop: 5,
    marginRight: 8,
    marginBottom: 3,
    borderColor: '#aaa',
    borderWidth: 1
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    //justifyContent: 'space-between'
  },
  textContainer: {
    width: '90%',
    paddingTop: 4,
    paddingBottom: 10,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    alignSelf: 'center',
    elevation: 2,
  },
  cardContainer: {
    //flex: 1,
    //height: 345,
    //width: '100%',
    backgroundColor: 'white',
    paddingBottom: 12,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  fullView: {
    //flex: 1,
    //backgroundColor: '#000'
  },
  responsiveContainer: {
    width: '100%',
    aspectRatio: (1056 / 768),
  },
  fullWidthImage: {
    height: '100%',
    width: '100%',
    //maxWidth: 1056,
    //maxHeight: 768,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    resizeMode: 'contain',    
  },
  notesView: {
    backgroundColor: AppColors.paperColor, 
  },
  tabView: {
    backgroundColor: '#525252', 
  },
  menuTitle: {
    fontWeight: '500', 
    color: AppColors.darkerColor,
    paddingBottom: 3,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  subHeading: {
    fontSize: 13,
    marginTop: -3,
  },
  extraInfo: {
    fontSize: 11,
    paddingBottom: 3,
  },
  imageStyle: {
    height: 60,
    width: 80,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    resizeMode: 'cover'
  },
  numTextStyle: {
    color: '#777',
    fontSize: 10,
    fontWeight: '500',
    marginHorizontal: 4,
    paddingBottom: 2,
  },
  tagsBadge: {
    backgroundColor: 'rgba(30,30,200,0.45)',
    marginLeft: 3,
    marginRight: 4,
    width: 14,
    height: 14,
    borderRadius: 14,
    marginBottom: 3,
  },
  notesBadge: {
    backgroundColor: 'rgba(200,200,30,0.45)',
    marginLeft: 3,
    marginRight: 4,
    width: 14,
    height: 14,
    borderRadius: 14,
    marginBottom: 3,
  },
  outerWrapper: {
    //width: '100%',
    //height: 60,
    paddingRight: 16,
    //elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'blue',
    justifyContent: 'space-between'
  },
  imageWrapper: {
    width: 80,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    //borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b9b9b9',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    paddingLeft: 7,
    //width: {state.infoWidth},  //'82%', //'70%',
  },
  checkWrapper: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuWrapper: {
    padding: 7,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    //paddingTop: 3
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  itemIcon: {
    height: 60,
    width: 80,
    textAlign: 'center',
    fontSize: 42,
    color: 'black'
  }
});

/*

Potential Customers: (sharing lists & list items is key to growing customer base)

Need to appeal to customers sense of pride & joy to share what they have whether it's
art, books, stamps, coins, photos, children,

- Shopping List
- Art / Photo / Stamp / Record / Coin Collectors
- Real Estate Agents - cataloging houses for sale
- Insurance Adjusters (field agents)
- Photographers - create an album of client shoots (share via App)
- Inventory Control (high value items)
- Beekeepers - photo journal of your hives
- Record Keeping (w/Photo) of Anything
- 

---------------------------------------------------------------------------------------

    componentWillMount() {
      Image.getSize(this.props.uri, (width, height) => {
        if (this.props.width && !this.props.height) {
            this.setState({width: this.props.width, height: height * (this.props.width / width)});
        } else if (!this.props.width && this.props.height) {
            this.setState({width: width * (this.props.height / height), height: this.props.height});
        } else {
            this.setState({width: width, height: height});
        }
      });
    }

    render() {
      return (
        <Image 
          source={this.state.source} 
          style={{height: this.state.height, width: this.state.width}}
        />
      );
    }

OR

… // inside render()
<View style={styles.responsiveContainer}>
  <Image source={require('../assets/img/logo.png')} style={styles.responsiveImg} />
</View>

… // styles
const styles = StyleSheet.create {
  responsiveContainer: {
    flex: 1,
    // arbitrary width that shall not be exceeded
    width: '60%',
    // demonstrate the dimensions of the container
    backgroundColor: '#00f',
  },
  responsiveImg: {
    // Image dimensions are known: 600, 330
    aspectRatio: (600 / 330),
    // Make sure the image stretches and shrinks
    width: '100%',
    height: '100%',
    // Make sure the image doesn't exceed it's original size
    // If you want it to exceed it's original size, then
    // don't use maxWidth / maxHeight or set their 
    // value to null
    maxWidth: 600,
    maxHeight: 330,
    // center horizontally
    marginLeft: 'auto',
    marginRight: 'auto',
    // make sure, the image is resized properly:
    resizeMode: 'contain',
    // demonstrate the dimensions of the image
    backgroundColor: '#ff0',
  },
}

*/
