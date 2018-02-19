import React from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet, 
  Dimensions,
  //ScrollView,
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

/*
Cast: Cathy Heaven, Barbara Bieber, Ashley Woods, Jennifer James
Genres: All Sex, Big Boobs
*/

class CardDisplay extends React.Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onDeviceChange);
    //this.renderMyTags = this.renderMyTags.bind(this);
    this.state = {
      didSave: false,
      isVisible: false,
      infoWidth: Dimensions.get('window').width - 115  //112
    };
  }

  componentWillMount() {
    console.log('inside card item ...');
    //console.log('number of tags = ', this.props.numTags);
    //console.log('number of notes = ', this.props.numNotes);
    //console.log('This Card Details are: ', this.props.item);
    //console.log('This Card Details are: ', JSON.stringify(this.props.item));
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

  onToggleCheck = () => { 
    this.props.onToggleItem(this.props.item.key, !this.props.item.selected);
  }

  onMenuSelect = (value, item) => { 
    this.props.onMenuPress(value, item);
  }

  itemTagRemove() {
    //this.props.dispatch(deleteCardTag(tag));
  }

/*
      <View style={styles.fullCard}>
import PictureFrame from '../images/PictureFrameBare.png';
import ItemInfo from '../images/ItemInfo.png';
import ItemNote from       

        <View tabLabel="PictureFrame" style={styles.tabView}>
        <View tabLabel="ItemInfo" style={styles.tabView}>
        <View tabLabel="ItemNote" style={styles.tabView}>

      <ScrollableTabView
        style={{ backgroundColor: AppColors.paperColor, height: 345 }}
        initialPage={0}
        //tabBarPosition='overlayTop'
        renderTabBar={() => <ImageTabBar optionMenu={this.renderOptionMenu} />}
      >
        <ScrollView style={{ height: 200 }} contentContainerStyle={{ height: 200 }}>
          <View style={styles.responsiveContainer}>
            <Image 
             style={styles.fullWidthImage}
             //style={styles.responsiveImg} 
             source={{ uri: 
              `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
            />
          </View>
        </ScrollView>
        <ScrollView>
          { this.renderInfoPanel() }
        </ScrollView>
        <ScrollView>
          <Text>And the notes go here</Text>
        </ScrollView>
      </ScrollableTabView>
      <View style={{ flex: 1, backgroundColor: AppColors.paperColor }}>
      </View>

*/

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
          <Text>And the notes go here</Text>
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
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

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

/*

         <Text style={styles.tagsTextStyle}>{this.props.numTags}</Text>
         <View style={styles.tagsBadge}>
         <View style={styles.notesBadge}>

*/

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
              {this.props.item.imageThumb === '' ?  
                 <Text style={styles.itemIcon}>{this.props.item.icon}</Text> :
               <Image 
                 style={styles.imageStyle} 
                 source={{ uri: 
                  `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
               />} 
            </TouchableOpacity>
          </View>
          <TouchableNativeFeedback onPress={this.onTouchablePress}>
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
/*
            <View>
              { this.renderRating() }
              { this.renderCategory() }
            </View>
*/

}

export default CardDisplay;

const styles = StyleSheet.create({
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
  tabView: {
    backgroundColor: '#727272', 
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
