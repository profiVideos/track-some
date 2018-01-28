import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Alert,
  Modal,
  Picker,
  Button,
  FlatList, 
  StyleSheet, 
  //ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import IconIon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { UniqueId } from '../components/common/UniqueId';
import MDInput from '../components/common/mdInput';
import PictureFrame from '../images/PictureFrame.png';
import ItemTags from '../images/ItemTags.png';
import ItemNotes from '../images/ItemNotes.png';
import SmileyFace from '../images/SmileyGlasses.png';
import PhotoAdd from '../images/PhotoAdd.png';
//import selectCameraImage from '../images/Source-Camera.jpg';
//import selectFolderImage from '../images/Source-Folder.jpg';
import AppColors from '../templates/appColors';
import CardItem from '../components/CardItem';
import TagEdit from '../components/TagEdit';

import { 
  addCard, 
  //updateCard,
  //currentCard,
  loadMyCards,
  saveMyCards, 
  //sortMyCards,
  itemCardChanged
} from '../store/actions';

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

const whatDoYouNeed = state => {
  return {
    catList: state.categories.itemList,
    emojiCode: state.emojis.emojiCode,     // ... current emoji selected in PickEmojis ...
    itemList: state.cards.itemList,
    thisCard: state.cards.thisCard, 
    listUpdated: state.cards.cardsDirty
  };
};

/*
const whatShouldIDo = dispatch => {
  return {
    loadCardsList: dispatch(loadMyCards())
  };
};
*/

class BuildCard extends PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    disabledButtonColor: '#333',
    screenBackgroundColor: AppColors.paperColor,
    navBarButtonColor: AppColors.hiliteColor,
    navBarTextColor: AppColors.accentColor,
    navBarBackgroundColor: AppColors.mainDarkColor,
    navBarTranslucent: false
  };

  constructor(props) {
    super(props);
    this.onSelectEmoji = this.onSelectEmoji.bind(this);
    this.openModal = this.openModal.bind(this);
    //this.openTagsEditScreen = this.openTagsEditScreen.bind(this);
    this.state = {
      compress: 0.25,
      image: null,
      images: null,
      tagName: 'Markie',
      getIcon4Card: false,
      modalVisible: false,
      //thisCategory: '',
      pickerItems: []
    };
  }

  componentWillMount() {
    console.log('inside build cards ...');
    //this.props.dispatch(loadMyCards());
    //console.log(`removed tmp image ${image.uri} from tmp directory`);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    //console.log(this.state);
    if (nextProps.catList.length !== null) {
      this.buildPickerItems(nextProps.catList);
    }
    if (this.props.emojiCode !== nextProps.emojiCode) {
      if (this.state.getIcon4Card) {
        this.props.dispatch(itemCardChanged('icon', nextProps.emojiCode));
      }
      // ... clean up and go home ...
      this.setState({ getIcon4Card: false });
      //console.log('A new Emoji Code was selected');
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    // ... if the cards list is dirty (used) then we should save it ...
    if (nextProps.listUpdated) {
      const myCards = nextProps.itemList;
      this.props.dispatch(saveMyCards(myCards));
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      switch (event.id) {
        case 'menu': {
          console.log('pressed the menu icon');
          this.props.navigator.toggleDrawer({ side: 'left', animated: true });
          break;
        }
        case 'options': {
          //this.openModal();  // ... opens the semi-transparent category edit screen ...
          //this.optionsMenu.open();  // ... figure out how to toggle this menu with the "_" ...
          //if (this.optionsMenu._opened) this.optionsMenu.close();
          //else this.optionsMenu.open();
          console.log('pressed the options icon');
          break;
        }
        default: break;
      }  // ... switch ...
    }
  }

  onChangeSelection(selection) {
    if (selection === 'addCategory') {
      console.log('Wants to add a category!');
      this.props.navigator.showModal({
        title: 'Add a new Category',
        screen: 'tracksome.EditCategories'
      });
      //this.setState({ modalVisible: true });
      //this.setState({ thisCategory: '' });
    } else if (selection !== '') {
      this.props.dispatch(itemCardChanged('category', selection));
    }
  }

  onSelectEmoji() {
    this.setState({ getIcon4Card: true });
    this.props.navigator.showModal({
       title: 'Select an Emoji', 
      screen: 'tracksome.EmojiPicker' 
    });
  }

  itemNameChanged(text) {
    //console.log('New Text: ', text);
    this.props.dispatch(itemCardChanged('name', text));
  }

  fabClicked() {
    Alert.alert('Button Pressed');
  }

  displaySnackBarMsg(msg) {
    this.props.navigator.showSnackbar({
      text: msg,  //'This option is in development',
      actionText: 'Stay Tuned', // optional
      actionId: 'not sure about how to use this', // Mandatory if you've set actionText
      actionColor: 'white', // optional
      textColor: AppColors.accentColor, // optional
      backgroundColor: '#333', // optional
      duration: 'long' // default is `short`. Available options: short, long, indefinite
    });
  }

/*
  renderModalEditScreen = () => (
*/

  openModal() {
    console.log('About to open the Modal window ...');
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  pickSingle(cropit, circular = false) {
    console.log('About to select a photo');
    ImagePicker.openPicker({
      width: 1056,
      height: 768,
      mediaType: 'photo',
      cropping: cropit,
      //multiple: true,
      //circular: true,
      cropperCircleOverlay: circular,
      //compressImageMaxWidth: 1280,
      //compressImageMaxHeight: 720,
      compressImageQuality: this.state.compress,
      //compressVideoPreset: 'MediumQuality',
      includeExif: true,
      includeBase64: true,
      cropperToolbarColor: AppColors.mainDarkColor,
      cropperActiveWidgetColor: AppColors.mainLiteColor,
      //cropperStatusBarColor: 'transparent',
      //hideBottomControls: true,
      //showCropGuidelines: false,
      cropperToolbarTitle: 'Position Photo',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { 
          uri: image.path, 
          width: image.width, 
          height: image.height,
          size: image.size,
          mimeType: image.mime,
          created: image.modificationDate,
          base64: image.data
        },
        images: null
      });
    }).catch(e => {
      console.log(e);
      //Alert.alert(e.message ? e.message : e);
    });
  }

  addThisCard = () => {
    console.log('Inside Add This Card: ', this.props.thisCard.name);
    if (this.props.thisCard.name !== '') {
      this.props.dispatch(addCard(
        UniqueId(),
        this.props.thisCard.name,
        this.props.thisCard.desc,
        this.props.thisCard.icon,
        this.props.thisCard.rating,
        this.props.thisCard.category
      ));
    }
  }

  doSomeFunction() {
    console.log('About to do something');
    //Alert.alert('About to do something');
    /*
    this.props.navigator.setSubTitle({
      subtitle: 'Connecting...'
    });
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: true
    });
    this.props.navigator.setTitle({
      title: 'Dynamic Title'
    });
    */
  }

  buildPickerItems(items) {
    //this.state.pickerItems: '';
    const catsList = items.map((item, index) => {
      return <Picker.Item key={index} label={`${item.icon}  ${item.name}`} value={item.key} />;
    });
    //console.log('The built Object: ', catsList);
    this.setState({ pickerItems: catsList }); 
  }

  itemSeparator = () => {
    return (<View style={styles.separatorStyle} />);
  };

  findCategoryByKey(key) {
    return this.props.catList.findIndex((item) => { return item.key === key; });
  }

  renderCatDescription(category) {
    const indexPos = this.findCategoryByKey(category);
    //console.log('Found @ ', indexPos);
    if (indexPos >= 0) {
      //const desc = `${this.props.catList[indexPos].icon} ${this.props.catList[indexPos].name}`;
      //console.log(desc);
      return `${this.props.catList[indexPos].icon} ${this.props.catList[indexPos].name}`;
    }
    return category;
  }

  renderImage(image) {
    return <Image style={{ width: 308, height: 224, resizeMode: 'contain' }} source={image} />;
  }

/*
        <Text style={styles.pickerText}>Thumbnails go here</Text>
*/

  renderItemIcons() {
    return (
      <View style={styles.statusBar}>
        <View style={styles.iconsPadding}>
          <Text style={styles.emojiIcon}>{this.props.thisCard.icon}</Text>
        </View>
      </View>
    );
  }

  renderActionIcons = () => (
    <View style={styles.actionBar}>
      <TouchableNativeFeedback onPress={this.doSomeFunction}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={PictureFrame} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.onSelectEmoji}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={SmileyFace} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.doSomeFunction}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={PhotoAdd} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.doSomeFunction}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={ItemNotes} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.openModal}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={ItemTags} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

/*
      <TouchableNativeFeedback onPress={this.openTagsEditScreen}>

*/


  renderImageStats(image) {
    //const rightNow = new Date().toLocaleString('de-DE', { hour12: false });
    const fileDate = new Date(Number(image.created)).toLocaleString('de-DE', { hour12: false });
    return (
      <View style={styles.container}>
        <Text>Path: {image.uri}</Text> 
        <Text style={styles.text}>Pixels: {image.width} x {image.height}</Text> 
        <Text style={styles.text}>Compressed @ {this.state.compress * 100}%</Text> 
        <Text style={styles.text}>Size: {image.size} bytes</Text> 
        <Text style={styles.text}>Type: {image.mimeType}</Text> 
        <Text style={styles.text}>File Created: {fileDate}</Text> 
      </View>);
  }

  renderCardItem = ({ item }) => {
    return (
      <CardItem 
        id={item.key}
        icon={item.icon}
        name={item.name}
        desc={item.desc}
        catDesc={this.renderCatDescription(item.category)}
        checkIcon={item.selected ? 'check-square-o' : 'square-o'}
        selected={item.selected}
        onPressItem={this.onCardItemPress}
        onToggleItem={this.onCardItemToggle}
      />
    );
  }

  renderTagEditScreen() {
    return (
    <View style={styles.container}>
      <Modal
          visible={this.state.modalVisible}
          transparent
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <TagEdit
              tagName={this.state.tagName} 
              onClosePress={() => this.closeModal()} 
            />
          </View>
        </View>
      </Modal>
    </View>
    );
  }

/*
            <Button onPress={() => this.closeModal()} title="Close modal" />
            <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
                onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                <View style={styles.pickerElements}>
                  <Text>ICON</Text>
                  <Text style={styles.pickerText}>Markus Griebling</Text>
                  <Text style={{ position: 'absolute', marginLeft: '92%' }}>ARR</Text>
                </View>

                <TouchableNativeFeedback onPress={this.addThisCard.bind(this)}>
*/

  render() {
    //if (this.state.myCategories.length > 0) {
    //  console.log(this.state.myCategories);
    //  const newValue = this.state.myCategories[0].name;
    //  console.log('new Value: ', newValue);
    //}
    //const newValue = this.state.myCategories.length > 0 ? this.state.myCategories[0].name : null;
    return (
        <View style={styles.outerContainer}>

          <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
              <View style={styles.topRowStyle}>
                <MDInput
                  style={styles.inputStyle}
                  label='Item Name'
                  placeholder='Please enter a name for this item ... '
                  value={this.props.thisCard.name}
                  onChangeText={text => this.itemNameChanged(text)}
                />
                <TouchableOpacity 
                  disabled={this.props.thisCard.name === ''} 
                  onPress={this.addThisCard.bind(this)}
                >
                  <View style={{ alignItems: 'center', padding: 5 }}>
                    <Icon size={42} name='plus' color={AppColors.darkerColor} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerStyle}>
                <View style={styles.pickerWrapper}>
                  <Text style={styles.labelText}>Category</Text>
                  <Picker 
                    style={styles.pickerElements}
                    selectedValue={this.props.thisCard.category}
                    onValueChange={(value) => this.onChangeSelection(value)}
                  >
                    <Picker.Item label="Please choose a category ..." value="" />
                    { this.state.pickerItems }
                    <Picker.Item label="+ Add a new category" value="addCategory" />
                  </Picker>              
                </View>
              </View>
            </View>
          </View>

          { this.renderTagEditScreen() }

          <View style={styles.tagsBar}>
            <Text style={styles.tagsText}>Tags go here</Text>
          </View>
          { this.renderItemIcons() }
          { this.renderActionIcons() }

        </View>
    );
  }

}

export default connect(whatDoYouNeed)(BuildCard);

/*
          <FlatList
            data={this.props.itemList}
            renderItem={this.renderCardItem}
            ItemSeparatorComponent={this.itemSeparator}
          />            

, resizeMode: 'contain'

          { this.renderModalEditScreen() }

  renderModalEditScreen = () => (
    <View style={styles.container}>
    <Modal
      style={styles.container}
      visible={this.state.modalVisible}
      transparent
      animationType={'slide'}
      onRequestClose={() => this.closeModal()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <EditCategories />
          <Button onPress={() => this.closeModal()} title="Close modal" />
        </View>
      </View>
    </Modal>
    </View>
  );
          <View style={styles.cardContainer}>
            <View style={styles.buttonRow}>
              <View style={styles.columnContainer}>         
                <TouchableNativeFeedback onPress={() => this.doSomeFunction()}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={selectCameraImage} />
                    <Text style={styles.buttonText}>Create a Photo</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.columnContainer}>         
                <TouchableNativeFeedback onPress={() => this.doSomeFunction()}>
                  <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={selectFolderImage} />
                    <Text style={styles.buttonText}>Choose an Image</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>

//      <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.doSomeFunction} style={styles.photoContainer}>
          <View style={styles.cardContainer}>         
            <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure 
            than actual design.
            </Text>
          </View>  
*/

const styles = StyleSheet.create({
  emojiIcon: {
    color: 'black',
    fontSize: 38,
    textAlign: 'center',
    paddingBottom: 1
  },  
  iconsPadding: {
    alignItems: 'center', 
    padding: 5
  },
  topRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageIconStyle: {
    height: 52,
    width: 52,
    resizeMode: 'contain'
  },
  actionBar: {
    height: 58,
    flexDirection: 'row',
    //paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    alignItems: 'center',
    backgroundColor: AppColors.paperColor,  // ... light grey ...
    justifyContent: 'space-around'
  },
  tagsBar: {
    height: 30,
    flexDirection: 'row',
    //paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    alignItems: 'center',
    backgroundColor: AppColors.paperColor,  // ... light grey ...
    justifyContent: 'space-around'
  },
  tagsText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)',
    //alignSelf: 'flex-start'
  },
  statusBar: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
    justifyContent: 'space-around'
  },
  pickerElements: {
    marginLeft: -8,
    color: 'blue',
    height: 22
  },
  labelText: {
    fontSize: 11,
    color: AppColors.mainLiteColor
  },
  pickerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, .5)',
    //alignSelf: 'flex-start'
  },
  pickerStyle: {
    borderColor: '#c3c3c3',
    borderBottomWidth: 0.75,
    paddingBottom: 5
  },
  container: {
    //flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  innerContainer: {
    width: '90%',
    //alignSelf: 'center',
    //backgroundColor: 'white',
    //borderRadius: 12
  },
  outerContainer: {
    flex: 1,
    borderRadius: 2,
    //backgroundColor: 'blue',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2
  },
  separatorStyle: {
    backgroundColor: 'white',
    width: '12%',
    alignSelf: 'flex-end',
    height: 1
  },
  textContainer: {
    width: '90%',
    paddingTop: 4,
    paddingBottom: 10,
    //backgroundColor: 'transparent',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    alignSelf: 'center',
    elevation: 2,
  },
  cardContainer: {
    //width: '90%',
    //padding: 7,
    backgroundColor: 'white',
    paddingBottom: 12,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
    //alignItems: 'center'
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 200,
    borderRadius: 5,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    resizeMode: 'contain'
  },
  inputStyle: {   // ... used to define the item name input width ...
    width: '85%'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 17,
    marginTop: -45,
    marginBottom: 25,
    fontWeight: '600',
    elevation: 2,
    color: '#858585'
  },
  columnContainer: {
    width: '50%',
    //backgroundColor: 'grey',
    alignItems: 'center'
  },
  imageContainer: {
    width: '100%',
    padding: 3,
    //backgroundColor: 'red',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    alignItems: 'center'
  },
  boldText: {   // ... not used ...
    color: 'black',
    fontWeight: '700',
  }
});

/*
    margin: 0,
    padding: 0,

            <Button
              icon={{ name: 'code' }}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 3, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Save Card' 
            />

    flex: 1,
const { overlapContainer, avatarContainer, avatar} = styles;

    return (
        <View style={overlapContainer}>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-3.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-7.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-3.jpg' }} />
          </View>

          <View style={avatarContainer}>
            <Image style={avatar} source={{ uri: 'http://lorempixel.com/output/cats-q-c-100-100-7.jpg' }} />
          </View>

        </View>
    );
  }
}

const styles = {
  overlapContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    marginTop: 50,
    marginRight: 50
  },
  avatarContainer: {
    borderRadius: 33,
    height: 66,
    width: 66,
    marginLeft: -15,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'white'
  },
  avatar: {
    borderRadius: 30,
    height: 60,
    width: 60
  }
}

          <Image resizeMode='cover' source={selectSourceImage}/>
            style={styles.image} resizeMode='contain'
          image={selectSourceImage}
          imageStyle={{ height: 260 }}
          imageProps={{ resizeMode: 'contain' }}
          <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
          <ScrollView>
            <View style={styles.container}>
              {this.state.image ? this.renderImage(this.state.image) : null}
              {this.state.image ? this.renderImageStats(this.state.image) : null}
            </View>
          </ScrollView>
*/
