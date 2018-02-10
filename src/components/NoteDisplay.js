import React from 'react';
import { 
  View, 
  Text,
  Image, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
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
import VerticalLink from '../images/verticalLink.png';

const IconMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={`${props.icon}  ${props.text}`} 
  />
);

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

class NoteDisplay extends React.PureComponent {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onDeviceChange);
    this.state = {
      didSave: false,
      isVisible: false,
      infoWidth: Dimensions.get('window').width - 50
    };
  }

  componentWillMount() {
    //console.log('inside note item ...');
    //console.log('This Note Details are: ', JSON.stringify(this.props.item));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDeviceChange);
  }

  onDeviceChange = (dims) => {
    this.setState({
      infoWidth: dims.window.width - 50
    });
  };

  onTouchablePress = () => { 
    this.props.onPressItem(this.props.item.key);
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
        <Icon size={18} name={'ellipsis-v'} style={styles.menuWrapper} color={'#212191'} />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <IconMenuOption value={'edit'} icon='✏️' text='Edit' />
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

/*
    const lastUpdateDate = new Date(Number(this.props.item.updatedTimestamp))
      .toLocaleString('de-DE', { hour12: false });
        <View style={styles.dateWrapper}>
          <Text style={styles.noteDate}>{lastUpdateDate}</Text>
        </View>

  <View style={styles.imageWrapper}>
    <TouchableOpacity onPress={this.onColorChange}>
      {this.props.item.imageThumb === '' ?  
         <Text style={styles.itemIcon}>{this.props.item.icon}</Text> :
         <Text style={styles.itemIcon}>Color Swatches</Text>} 
    </TouchableOpacity>
  </View>

*/
  renderNoteTitle() {
    if (this.props.item.title === '') return;
    return (
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.itemTitle}>
        {this.props.item.title}
      </Text>
    );
  }

  render() {
    const descLines = this.props.item.title === '' ? 3 : 2;
    const infoWidth = this.state.infoWidth;
    const backColor = this.props.hilite;   // ... AppsColor.hiliteColor, otherwise white ...
    return (
      <View style={styles.outerWrapper}>
        <View style={styles.priorityView}>
          <View />
        </View>
        <View style={[styles.noteWrapper, { backgroundColor: backColor }]}>
          <TouchableNativeFeedback onPress={this.onTouchablePress}>
            <View style={[styles.infoWrapper, { width: infoWidth }]}>
              { this.renderNoteTitle() }
              <Text ellipsizeMode='tail' numberOfLines={descLines} style={styles.itemNote}>
               {this.props.item.note}
              </Text>
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
      </View>
    );
  }

}

export default NoteDisplay;

const menuOptionsStyles = {
  optionsContainer: {
    width: 105,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginLeft: 2,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priorityView: {
    width: 4,
    height: 50,
    marginTop: 3,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  noteDate: {
    fontSize: 11,
    height: 12,
    textAlign: 'center',
    color: 'white'
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
    marginTop: -3,
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
  noteWrapper: {
    elevation: 3,
    height: 64,
    paddingLeft: 3,
    paddingRight: 5,
    marginRight: 3,
    marginLeft: 2,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    padding: 7,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    //paddingTop: 3
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
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
