import React, { PureComponent } from 'react';
import { 
  Text, 
  View,
  Alert,
  Image,
  //Modal,
  //Button,
  FlatList,
  //Platform,
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
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import HappyGuy from '../images/1f603.png';

//import EmojiPicker from 'react-native-simple-emoji-picker';  ... 1) broken ...
//import Emoticons from 'react-native-emoticons';  ... 2) also broken ...
//import EmojiPicker from 'react-native-emoji-picker';   // ... 3) also broken ProcTypes ...
import AppColors from '../templates/appColors';
//import MDInput from '../components/common/mdInput';
import MDButton from '../components/common/mdButton';
//import { UniqueId } from '../components/common/UniqueId';
import CategoryItem from '../components/CategoryItem';
import { 
  addCategory,
  updateCategory,
  loadCategories,
  itemTextChanged,
  deleteCategories
} from '../store/actions';

//import store from '../store';
//import { reducerCategories } from '../store/reducers';

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

//const categoryLiveResults = store.getAllCategories();  // ... Realm updates this in real time ...

const mapStateToProps = state => {
  return {
    //itemList: categoryLiveResults,
    itemList: state.categories.itemList,        // ... state.categories.itemList,
    emojiCode: state.emojis.emojiCode,          // ... current emoji selected in PickEmojis ...
    currentCat: state.categories.catCurrent,
    listUpdated: state.categories.lastUpdated   // ... tells FlatList we have updated Realm data ...
  };
};

const IconMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={`${props.icon}  ${props.text}`} 
  />
);

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
    modalVisible: false,
    myList: [],
    //removeAnim: new Animated.Value(1),
    //categoriesAnim: new Animated.Value(0),
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

  componentWillMount() {
    console.log('inside edit categories ...');
    this.props.dispatch(loadCategories());
  }

  componentWillReceiveProps(nextProps) {
    //------------------------------------------------------
    // ... do this purely for debugging purposes so we ...
    // ... can see the data being returned from Realm ...
    //------------------------------------------------------
    if (this.props.listUpdated !== nextProps.listUpdated) {
      console.log('New Categories: ', JSON.stringify(nextProps.itemList));
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
    console.log('An item was pressed.', key, ' Name: ', name, selected);
    // ... open a popup window to allow this item to be changed ...
    //this.props.dispatch(updateCategory(key, name, desc, icon, selected));
  }

  onCatItemToggle(key, name, desc, icon, selected) {
    this.props.dispatch(updateCategory(key, name, desc, icon, selected));
  }

  onMenuOptionSelect = (value) => {
    switch (value) {
      case 'somethingNew': {
        // ... sort the categories by name ...
        break;
      }
      case 'deleteAll': {
        // ... first count how many items will be affected ...
        const numSelected = this.countSelectedItems();
        if (numSelected > 0) {
          Alert.alert('Delete Selected Categories', 
            `You are about to remove ${numSelected} categories.\nIs this what you wish to do?`,
            [{ text: 'Cancel', style: 'cancel' },
             { text: 'OK', onPress: () => this.props.dispatch(deleteCategories()) }]);
            //{ cancelable: false });
        } else {
          Alert.alert('Delete Selected Categories', 
          'There were no categories selected for removal!');
        }        
        break;
      }
      default: break;
    }  // ... switch ...
  }
/*
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
*/
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
        this.props.currentCat.name,
        this.props.currentCat.desc,
        this.props.emojiCode)
      );
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
/*
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
*/
  renderOptionMenu = () => (
    <Menu onSelect={value => this.onMenuOptionSelect(value)} ref={this.menuReference}>
      <MenuTrigger>
        <View style={{ width: 20, alignItems: 'center' }}>
          <IconIon name='md-more' size={24} color={AppColors.darkerColor} />
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <MenuOption value={0} disabled>
          <Text style={styles.menuTitle}>Category Options</Text>
        </MenuOption>
        <IconMenuOption value={'deleteAll'} icon='🗑️' text='Delete All Selected' />
      </MenuOptions>
    </Menu>
  )

  render() {
    const showIconOrEmoji = (this.props.emojiCode === '' ?
      <Image style={styles.imageStyle} source={HappyGuy} /> :
      <Text style={styles.iconPreview}>{this.props.emojiCode}</Text>
    );
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          <View style={styles.statusBar}>
            <TouchableNativeFeedback onPress={this.onSelectEmoji}>
              <View 
                style={{ 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                justifyContent: 'center' }}
              >
                { showIconOrEmoji }
                <IconFa 
                  size={28}
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
              iconSize={48} iconColor='#333' iconName='add' 
              onPress={this.addThisItem.bind(this)} 
            />
            <View style={styles.menuTrigger}>
              { this.renderOptionMenu() }
            </View>
          </View>
          <FlatList
            data={this.props.itemList}
            extraData={this.props.listUpdated}
            keyExtractor={(item) => item.key}
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
    width: 175,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 36
  },
  menuTrigger: {
    padding: 3
  },
  menuTitle: {
    fontWeight: '500', 
    color: AppColors.accentColor,
    paddingBottom: 3,
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.75
  },
  separatorStyle: {
    backgroundColor: 'white',
    width: '12%',
    alignSelf: 'flex-end',
    height: 1
  },
  textInputStyle: {
    color: '#121212',
    padding: 3,
    fontSize: 16,
    fontWeight: '300'
  },  
  overlayPlus: {
    elevation: 2,
    marginTop: -24,
  },
  iconPreview: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 4,
  },
  imageStyle: {
    height: 40,
    width: 40,
    marginTop: 10,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    resizeMode: 'contain'
  },
  statusBar: {
    elevation: 3,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-around',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  outerContainer: {
    flex: 1,
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
