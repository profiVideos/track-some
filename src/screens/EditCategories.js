import React, { Component } from 'react';
import { 
  Text, 
  View,
  Alert,
  Image,
  FlatList,
  Platform,
  Dimensions, 
  //ScrollView,
  //Animated,
  StyleSheet,
  TouchableNativeFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import HappyGuy from '../images/1f603.png';

//import EmojiPicker from 'react-native-simple-emoji-picker';  ... 1) broken ...
//import Emoticons from 'react-native-emoticons';  ... 2) also broken ...
//import EmojiPicker from 'react-native-emoji-picker';   // ... 3) also broken ProcTypes ...
import AppColors from '../templates/appColors';
import MDInput from '../components/common/mdInput';
import MDButton from '../components/common/mdButton';
import { UniqueId } from '../components/common/UniqueId';
import CategoryItem from '../components/CategoryItem';
import { 
  addCategory,
  saveCategories,
  loadCategories
} from '../store/actions';

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
}
*/

const mapStateToProps = state => {
  return {
    itemList: state.categories.itemList,
    emojiCode: state.emojis.emojiCode,     // ... current emoji selected in PickEmojis ...
    currentCat: state.categories.catCurrent,
    listUpdated: state.categories.catsDirty
  };
};

class EditCategories extends Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarTextColor: AppColors.mainLiteColor,
    navBarBackgroundColor: AppColors.hiliteColor,
    navBarTranslucent: false
  }

  constructor(props) {
    super(props);
    this.onEmojiSelect = this.onEmojiSelect.bind(this);    
    //console.log('Edit Categories Props: ', this.props);
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    /*
    Dimensions.addEventListener('change', () => {
      this.setState({
        scrWidth: Dimensions.get('window').width,
        scrHeight: Dimensions.get('window').height,
        viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
          ? 'portrait' : 'landscape'
      });
    });
    */
  }

  state = {
    toggled: false,
    hasloaded: false,
    itemsCount: 0,
    itemName: '',
    itemDesc: '',
    //itemIcon: '',
    //removeAnim: new Animated.Value(1),
    //categoriesAnim: new Animated.Value(0),
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

  componentWillMount() {
    this.props.dispatch(loadCategories());
  }

  componentWillReceiveProps(nextProps) {
    // ... if the categories list is dirty (used) then we should save it ...
    if (nextProps.listUpdated) {
      const myCategories = nextProps.itemList;
      this.props.dispatch(saveCategories(myCategories));
    }
  }

/*
  componentSomethingorOther() {
    this.props.navigator.setTabBadge({
      badge: this.state.itemsCount,
      badgeColor: '#121212'  // ... doesn't seem to be working ...
    });
    //console.log(`Toggled is: ${this.state.toggled}`);
  }
*/

  onEmojiSelect() {
    this.props.navigator.showModal({
       title: 'Select an Emoji', 
      screen: 'tracksome.EmojiPicker' 
    });
  }

  onCatItemPress() {
    console.log('A category item was pressed.');
  }

/*
  toggleDescription = () => {
    this.setState({ toggled: !this.state.toggled });
  }
*/

  itemNameChanged(text) {
    // ... update the redux store with the current value ...
    // ... don't save anything or set the dirty flag ...
    this.setState({ itemName: text });
  }

  itemDescChanged(text) {
    // ... update the redux store with the current value ...
    // ... don't save anything or set the dirty flag ...
    this.setState({ itemDesc: text });
  }

  itemIconChanged(icon) {
    // ... update the redux store with the current value ...
    // ... don't save anything or set the dirty flag ...
    this.setState({ itemIcon: icon });
  }

  itemSelectedHandler = key => {
    Alert.alert(`A list item was selected with ${JSON.stringify(key)}`);
    /*
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    */
  };

  addThisItem = () => {
    this.props.dispatch(addCategory(
      UniqueId(), 
      this.state.itemName, 
      '', 
      this.props.emojiCode));
    this.setState({ itemsCount: this.state.itemsCount + 1 });
  }

  itemSeparator = () => {
    return (<View style={{ height: 1, width: '100%', backgroundColor: '#d2d2d2' }} />);
  };

/*
icons on the image server;
https://res.cloudinary.com/profivideos/icons/apple-64/1f4a3.png

Used for other module - but here it is.
react-native-image-resizer
*/

  renderCategoryItem = ({ item }) => (
    <CategoryItem 
      id={item.key}
      icon={item.icon}
      name={item.name}
      description={item.desc}
      onPressItem={this.onCatItemPress}
    />
  );

/*
  renderMoreFields() {
    if (this.state.toggled) {
      return (
        <View style={{ marginTop: 5 }}>
          <MDInput 
            label='Description (optional)'
            placeholder='An optional category description ... '
            value={this.state.itemDesc}
            onChangeText={text => this.itemDescChanged(text)}
          />
        </View>
      );
    }
  }
            <MDButton
              iconSize={36} iconColor='white' iconName='event-note' 
              textLabel='Description'
              onPress={this.toggleDescription} 
            />
            {this.renderMoreFields()}fa-plus-circle

<Icon name='insert-emoticon' size={40} color={AppColors.hiliteColor} />            
      <Text style={styles.iconPreview}>{this.props.emojiCode}</Text>
*/

  render() {
    const showIconOrEmoji = (this.props.emojiCode === '' ?
      <Image style={styles.imageStyle} source={HappyGuy} /> :
      <Text style={styles.iconPreview}>{this.props.emojiCode}</Text>
    );
    //console.log(this.props.itemList);
    //const backColor = this.props.selected ? '#fff8b2' : 'white';
    //const buttonType = (Platform.OS === 'android' ? 0 : 64);
    return (
        <View style={styles.outerContainer}>
          <View style={styles.statusBar}>
            <TouchableNativeFeedback onPress={this.onEmojiSelect}>
              <View 
                style={{ 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                justifyContent: 'center' }}
              >
                { showIconOrEmoji }
                <Icon 
                  size={30}
                  name='plus' 
                  style={styles.overlayPlus} 
                  color={'white'} 
                />            
              </View>
            </TouchableNativeFeedback>
            <View style={styles.inputContainer}>
              <MDInput
                label='Category Name'
                dense
                placeholder='A short category name ... '
                // ... these values should be under redux control ...
                value={this.state.itemName}
                onChangeText={text => this.itemNameChanged(text)}
              />
            </View>
            <MDButton
              iconSize={50} iconColor='#333' iconName='add' 
              onPress={this.addThisItem} 
            />
          </View>
          <FlatList
            data={this.props.itemList}
            renderItem={this.renderCategoryItem}
            ItemSeparatorComponent={this.itemSeparator}
          />            
        </View>
    );
  }

/*
              <Button transparent onPress={this.addThisItem}>
                <Icon ios='ios-add' android='md-add' style={{ fontSize: 56 }} />
              </Button>            

            <MDInput
              label='Icon (optional)'
              placeholder='A nice Icon for this category? '
              value={this.state.itemIcon}
              onChangeText={icon => this.itemIconChanged(icon)}
            />
          <Button
            style={styles.button}
            title="Add this Category"
            onPress={this.addThisItem}
          />

    // this.props.navigator.switchToTab({tabIndex: 0});
    //this.props.navigator.setSubTitle({
    //  subtitle: ''
    //});
            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />
            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />

            <FlatList
              data={superHeros}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.name}`}
                />
              )}
            />            

            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />

              onItemSelected={this.itemSelectedHandler}

            <FlatList
              data={this.props.itemList}
              renderItem={({ item }) => this.renderItem(item)}
            />

 {item.catName}
            <Text>{this.props.itemList.catName}</Text>
          <CategoryList
            categories={this.props.itemList}
            onItemSelected={this.itemSelectedHandler}
          />
<FlatList
      style={styles.listContainer}
      data={props.categories}
      renderItem={(info) => (
        <CategoryItem
          categoryName={info.categories.catName}
          categoryIcon={info.categories.catIcon}
          onItemPressed={() => props.onItemSelected(info.categories.catId)}
        />
      )}
    />
*/

}

/*
const mapDispatchToProps = dispatch => {
  return {
    onAddCategory: (categoryId, categoryName, categoryDesc, categoryIcon) =>
      dispatch(addCategory(categoryId, categoryName, categoryDesc, categoryIcon)),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};

  historyBar: {
    height: 32,
    //paddingBottom: 2,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#d5d5d5'
  },

*/

export default connect(mapStateToProps)(EditCategories);

const styles = StyleSheet.create({
  inputContainer: {
    width: '65%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingTop: 4,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 44
  },
  overlayPlus: {
    elevation: 2,
    marginTop: -36,
    //paddingRight: 5,
    marginBottom: 3
  },
  iconPreview: {
    color: 'black',
    fontSize: 34,
    textAlign: 'center',
    padding: 5
  },
  imageStyle: {
    height: 46,
    width: 46,
    margin: 5,
    paddingBottom: 3,
    //borderRadius: 5,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    resizeMode: 'contain'
  },
  statusBar: {
    height: 54, //48,
    flexDirection: 'row',
    padding: (Platform.OS === 'android' ? 2 : 2),
    alignItems: 'center',
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-around'
  },
/*  
  rowInputBar: {
    width: '100%',
    flexDirection: 'row',
    padding: (Platform.OS === 'android' ? 5 : 5),
    alignItems: 'center',
    //margin: 3,
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-around'
  },
*/

  outerContainer: {
    flex: 1,
    //padding: 5,
    //borderRadius: 2,
    backgroundColor: AppColors.paperColor
  }
});

/*
            <MDInput
              label='Icon (optional)'
              placeholder='How about a nice Icon for this category? '
              value={this.state.controls.itemIcon.value}
              onChangeText={icon => this.itemIconChanged(icon)}
            />

          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />

      <View style={this.state.itemsLoaded ? null : styles.buttonContainer}>
        {content}
      </View>

*/
