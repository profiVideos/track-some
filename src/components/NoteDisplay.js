import React from 'react';
import { 
  View, 
  Text,
  Alert,
  Image, 
  StyleSheet, 
  Dimensions,
  TouchableNativeFeedback 
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../templates/appColors';
import NotesLink from '../images/notesLink.png';

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

class NoteDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onDeviceChange);
    this.state = {
      didSave: false,
      isVisible: false,
      infoWidth: Dimensions.get('window').width - 46
    };
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDeviceChange);
  }

  onDeviceChange = (dims) => {
    this.setState({
      infoWidth: dims.window.width - 46
    });
  };

  onNoteLinkPress = (card) => { 
    Alert.alert('Go see this card: ', card);
  }

  onTouchablePress = () => { 
    this.props.onPressItem(this.props.item.key);
  }

  onLongPressItem = () => {
    this.props.onMenuPress('edit', this.props.item);
  }

  onToggleCheck = () => { 
    this.props.onToggleItem(this.props.item.key, !this.props.item.selected);
  }

  onMenuSelect = (value, item) => { 
    this.props.onMenuPress(value, item);
  }

  renderOptionMenu = () => (
    <Menu onSelect={(value) => this.onMenuSelect(value, this.props.item)}>
      <MenuTrigger>
        <Icon size={19} name={'ellipsis-v'} style={styles.menuWrapper} color={'#212191'} />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <IconMenuOption value={'edit'} icon='✏️' text='Edit' />
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

  renderNoteLink() {
    if (this.props.item.card === '') return;
    return (
      <TouchableNativeFeedback onPress={() => this.onNoteLinkPress(this.props.item.card)}>
        <View style={styles.cardLink}>
          <Image style={styles.imageStyle} source={NotesLink} />
        </View>
      </TouchableNativeFeedback>
    );
  }

  renderFullNote() {
    const lastUpdateDate = new Date(Number(this.props.item.updatedTimestamp))
      .toLocaleString('de-DE', { hour12: false });
    return (
      <View>
        <View style={styles.infoBar}>
          <Text style={styles.dateMessage}>Updated: 
            <Text style={styles.boldedText}> {lastUpdateDate}</Text>
          </Text>
        </View>
        <View style={styles.fullNote}>
          <Text style={styles.noteBody}>{this.props.item.note}</Text>
        </View>
      </View>
    );
  }

  renderNoteTitle() {
    if (this.props.item.title === '') return;
    /**{this.props.item.list}**/
    const generalNote = (this.props.item.list === '' ? '*' : '');
    return (
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.itemTitle}>
        {generalNote}{this.props.item.title}
      </Text>
    );
  }

  renderNoteDetails() {
    if (this.props.marked) return (this.renderFullNote());
    const descLines = this.props.item.title === '' ? 2 : 1;
    return (
      <Text ellipsizeMode='tail' numberOfLines={descLines} style={styles.itemNote}>
        {this.props.item.note}
      </Text>
    );
  }

  render() {
    const infoWidth = this.state.infoWidth;
    const backColor = this.props.hilite;   // ... AppColors.hiliteColor, otherwise white ...
    return (
      <View style={styles.mainWrapper}>
        <View style={styles.outerWrapper}>
          <View style={styles.priorityView}>
            <View />
          </View>
          <View style={[styles.noteWrapper, { backgroundColor: backColor }]}>
            <TouchableNativeFeedback 
              onPress={this.onTouchablePress} 
              onLongPress={this.onLongPressItem}
            >
              <View style={[styles.infoWrapper, { width: infoWidth }]}>
                <View style={styles.titleBar}>
                  { this.renderNoteTitle() }
                  { this.renderNoteLink() }
                </View>
                { this.renderNoteDetails() }
              </View>
            </TouchableNativeFeedback>
            <View style={styles.checkWrapper}>
              <TouchableNativeFeedback>
                { this.renderOptionMenu() }
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }

}

export default NoteDisplay;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    //width: '33.333333333333%'
  },
  noteBody: {
    color: 'black'
  },
  imageStyle: {
    height: 14,
    width: 14,
    //opacity: 0.65,
    resizeMode: 'contain'
  },
  cardLink: {
    //marginHorizontal: 3,
    alignSelf: 'flex-end'
    //width: '7%',
    //paddingVertical: 3,
    //paddingHorizontal: 5,
    //borderRadius: 20,
    //borderWidth: 1,
    //borderColor: '#aaa'
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: AppColors.mainDarkColor
  },
  fullNote: {
    paddingVertical: 5,
    //paddingTop: 6,
    //paddingBottom: 8,
  },
  fullView: {
    marginLeft: 16,
    marginRight: 28,
    elevation: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  outerWrapper: {
    //width: '33.33333333%',
    //maxWidth: 70,
    //height: 100,
    marginBottom: 3,
    marginLeft: 2,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noteWrapper: {
    //width: '33.3333333%',
    //maxWidth: 70,
    elevation: 3,
    //height: 65,
    //paddingLeft: 3,
    //paddingRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 6,
    paddingBottom: 8,
    marginRight: 3,
    marginLeft: 2,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priorityView: {
    width: 4,
    //height: 36,
    marginTop: 3,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  dateMessage: {
    fontSize: 11,
    //paddingHorizontal: 3,
    //textAlign: 'center',
    color: '#777',
  },
  boldedText: {
    fontSize: 11,
    //paddingHorizontal: 3,
    marginHorizontal: 5,
    fontWeight: '500',
    //textAlign: 'center',
    //color: 'white',
  },
  menuTitle: {
    fontWeight: '500', 
    color: AppColors.darkerColor,
    paddingBottom: 3,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  itemNote: {
    fontSize: 13,
    //marginTop: -3,
  },
  extraInfo: {
    fontSize: 11,
    paddingBottom: 3,
  },
  badgeTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
  infoWrapper: {
    paddingLeft: 7,
  },
  checkWrapper: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuWrapper: {
    padding: 5,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    paddingTop: 3
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemTitle: {
    width: '95%',
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: -3
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

My Ideal User:
- anyone :-)
- but seriously - is male / female / other who loves to catalog things.
- they take notes on everything are well organized (or try want to be ) and are
  excited about new technologies.
- they love to socialize and are on many social network sites
- they love to share photos and stuff they are working on
- ideally belong in the younger crowd (20-32) but could also be a senior who has much
  time on his/her hands to pursue their hobbies - stamp / coin collecting
- maybe a gardener who would like to catalogue his flowers and make some notes
- ideally with a wish to share this with others via QRCode, NFC, Social Networks, Email, etc.
- share on Instagram and other photo sharing sites.
- could also be a fish lover who has never thought of cataloguing his / her fish
- anyone who thinks things should be catalogued;
  (synonyms: classify, categorize, systematize, index, list, archive, 
   make an inventory of, inventory, record, itemize, etc.)

Questions:
Is: An office employee who
Tends to be: A 30-40 year old male
Values: Simplicity, being thorough
Needs my app because it will: Help them catalogue things and organize belongings & wants
Might ask these questions about my app:  Do I need an App for that?  
Will it drain my battery quickly?  Will this complicate my workflow?
 (just a sample set of questions)
---------------------------------------------------------------------------------------

Example Languages supported by ColorNote;
Languages Supported: Arabic, Chinese, English, French, German, Hebrew, Italian, 
                     Japanese, Korean, Portuguese, Russian, Spanish

---------------------------------------------------------------------------------------

        <IconMenuOption value={'color'} icon='🏷️' text='Color' />
        <IconMenuOption value={'priority'} icon='🗒️' text='Priority' />
        <IconMenuOption value={'reminder'} icon='🗒️' text='Reminder' />

*/
