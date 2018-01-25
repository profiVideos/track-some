import React, { PureComponent } from 'react';
import { 
  Text, 
  View,
  Alert,
  Image,
  Modal,
  Button,
  FlatList,
  Platform,
  TextInput,
  Dimensions,
  //Animated,
  StyleSheet,
  TouchableNativeFeedback 
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import HappyGuy from '../images/1f603.png';

//import EmojiPicker from 'react-native-simple-emoji-picker';  ... 1) broken ...
//import Emoticons from 'react-native-emoticons';  ... 2) also broken ...
//import EmojiPicker from 'react-native-emoji-picker';   // ... 3) also broken ProcTypes ...
import AppColors from '../templates/appColors';
//import MDInput from '../components/common/mdInput';
import MDButton from '../components/common/mdButton';
import { UniqueId } from '../components/common/UniqueId';
import CategoryItem from '../components/CategoryItem';
import { 
  addCategory,
  updateCategory,
  saveCategories,
  loadCategories,
  sortCategories,
  itemTextChanged,
  deleteCategories
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

class EditCategories extends PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: 'white',   // ...AppColors.paperColor,
    navBarTextColor: AppColors.mainLiteColor,
    navBarBackgroundColor: AppColors.hiliteColor,
    navBarTranslucent: false
  }

  constructor(props) {
    super(props);
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.onSelectEmoji = this.onSelectEmoji.bind(this);
    this.onCatItemPress = this.onCatItemPress.bind(this);
    this.onCatItemToggle = this.onCatItemToggle.bind(this);
  }

  state = {
    toggled: false,
    hasloaded: false,
    itemsCount: 0,
    modalVisible: false,    
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
    //console.log(nextProps);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    // ... if the categories list is dirty (used) then we should save it ...
    if (nextProps.listUpdated) {
      const myCategories = nextProps.itemList;
      this.props.dispatch(saveCategories(myCategories));
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      switch (event.id) {
        case 'menu': {
          this.props.navigator.toggleDrawer({ side: 'left', animated: true });
          break;
        }
        case 'options': {
          //this.openModal();  // ... opens the semi-transparent category edit screen ...
          this.optionsMenu.open();  // ... figure out how to toggle this menu with the "_" ...
          //if (this.optionsMenu._opened) this.optionsMenu.close();
          //else this.optionsMenu.open();
          //console.log(this.optionsMenu);
          break;
        }
        default: break;
      }  // ... switch ...
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

  onSelectEmoji() {
    this.props.navigator.showModal({
       title: 'Select an Emoji', 
      screen: 'tracksome.EmojiPicker' 
    });
  }

  onCatItemPress(key, name, desc, icon, selected) {
    // ... update this item in the categories list ...
    console.log('An item was pressed.', key, ' Name: ', name);
    // ... open a popup window to allow this item to be changed ...
    //this.props.dispatch(updateCategory(key, name, desc, icon, selected));
  }

  onCatItemToggle(key, name, desc, icon, selected) {
    this.props.dispatch(updateCategory(key, name, desc, icon, selected));
  }

//             { cancelable: false });

  onMenuOptionSelect = (value) => {
    switch (value) {
      case 'sortCats': {
        // ... sort the categories by name ...
        this.props.dispatch(sortCategories());
        break;
      }
      case 'deleteCats': {
        // ... first count how many items will be affected ...
        const numSelected = this.countSelectedItems();
        if (numSelected > 0) {
          Alert.alert('Delete Selected Categories', 
            `You are about to remove ${numSelected} categories.\nIs this what you wish to do?`,
            [{ text: 'Cancel', style: 'cancel' },
             { text: 'OK', onPress: () => this.props.dispatch(deleteCategories()) }]);
        } else {
          Alert.alert('Delete Selected Categories', 
          'There were no categories selected for removal!');
        }        
        break;
      }
      default: break;
    }  // ... switch ...
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  menuReference = (menuId) => {
    this.optionsMenu = menuId;
  }

  countSelectedItems() {
    return this.props.itemList.filter(item => item.selected === true).length;
  }

  itemNameChanged(text) {
    this.props.dispatch(itemTextChanged('name', text));
  }

  itemDescChanged(text) {
    this.props.dispatch(itemTextChanged('desc', text));
  }

  itemIconChanged(icon) {
    // ... update the redux store with the current value ...
    // ... don't save anything or set the dirty flag ...
    this.setState({ itemIcon: icon });
  }

  addThisItem = () => {
    if (this.props.currentCat.name !== '') {
      this.props.dispatch(addCategory(
        UniqueId(),
        this.props.currentCat.name,
        this.props.currentCat.desc,
        this.props.emojiCode));
      this.setState({ itemsCount: this.state.itemsCount + 1 });
    }
  }

  itemSeparator = () => {
    return (<View style={styles.separatorStyle} />);
  };

/*

icons on the image server;
https://res.cloudinary.com/profivideos/icons/apple-64/1f4a3.png

Used for other module - but here it is.
react-native-image-resizer

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

      <Button
          onPress={() => this.openModal()}
          title="Open modal"
      />

*/

  renderCategoryItem = ({ item }) => (
    <CategoryItem 
      id={item.key}
      icon={item.icon}
      name={item.name}
      desc={item.desc}
      checkIcon={item.selected ? 'check-square-o' : 'square-o'}
      selected={item.selected}
      onPressItem={this.onCatItemPress}
      onToggleItem={this.onCatItemToggle}
    />
  );

  renderModalEditScreen = () => (
    <View style={styles.container}>
      <Modal
          visible={this.state.modalVisible}
          transparent
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text>This is content inside of modal component</Text>
            <Button
                onPress={() => this.closeModal()}
                title="Close modal"
            />
          </View>
        </View>
      </Modal>
    </View>
  );

  renderOptionMenu = () => (
    //if (!this.state.canEdit) return null;
    //console.log('inside render option menu!');
    //      <Menu onSelect={value => this.onMenuOptionSelect(value)} ref={this.menuReference}>
    //      <Menu onSelect={value => this.onMenuOptionSelect(value)} ref={this.menuReference}>
    //return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Menu onSelect={value => this.onMenuOptionSelect(value)} ref={this.menuReference}>
            <MenuTrigger>
              <View style={styles.menuTrigger} />
            </MenuTrigger>
            <MenuOptions customStyles={menuOptionsStyles}>
              <MenuOption value={0} disabled>
                <Text style={styles.menuTitle}>Category Options</Text>
              </MenuOption>
              <MenuOption value={'sortCats'} text='Sort by Category Name' />
              <MenuOption value={'deleteCats'} text='Delete All Selected' />
            </MenuOptions>
          </Menu>
        </View>
  //    );
  )

/*
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
      <MenuProvider>
        { this.renderOptionMenu() }
        <View style={styles.outerContainer}>
          { this.renderModalEditScreen() }
          <View style={styles.statusBar}>
            <TouchableNativeFeedback onPress={this.onSelectEmoji}>
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
              <TextInput
                style={styles.textInputStyle}
                autoCorrect={false}
                disableFullscreenUI
                underlineColorAndroid={'transparent'}
                placeholder={'A short category name ... '}
                value={this.props.currentCat.name}
                onChangeText={(text) => this.itemNameChanged(text)}
              />
            </View>
            <MDButton
              iconSize={50} iconColor='#333' iconName='add' 
              onPress={this.addThisItem.bind(this)} 
            />
          </View>
          <FlatList
            data={this.props.itemList}
            renderItem={this.renderCategoryItem}
            ItemSeparatorComponent={this.itemSeparator}
          />            
        </View>
      </MenuProvider>
    );
  }
}

export default connect(mapStateToProps)(EditCategories);

const menuOptionsStyles = {
  optionsContainer: {
    //backgroundColor: 'green',
    //padding: 5,
    width: 175
  },
  /*
  optionsWrapper: {
    backgroundColor: 'red',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  */
  optionText: {
    color: 'blue',
  },
};

const styles = StyleSheet.create({

  container: {
    //flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white'
  },

  inputContainer: {
    width: '65%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    //paddingTop: 4,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 40
  },
  menuTrigger: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  separatorStyle: {
    //flex: 1,
    backgroundColor: 'white',
    width: '12%',
    alignSelf: 'flex-end',
    height: 1
  },
  textInputStyle: {
    color: '#121212',
    padding: 3,
    fontSize: 18,
    fontWeight: '300'
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
    elevation: 3,
    height: 50, //48,
    flexDirection: 'row',
    //marginBottom: 3,
    padding: (Platform.OS === 'android' ? 3 : 3),
    alignItems: 'center',
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-around',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
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
