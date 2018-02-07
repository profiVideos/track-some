import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Alert,
  //Modal,
  Picker,
  StyleSheet, 
  ScrollView,
  //ToastAndroid,
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { MenuProvider } from 'react-native-popup-menu';

//import { UniqueId } from '../components/common/UniqueId';
import MDInput from '../components/common/mdInput';
import AppColors from '../templates/appColors';
import CardItem from '../components/CardItem';
//import TagEdit from '../components/TagEdit';
import RenderTags from '../components/RenderTags';

import PictureFrame from '../images/PictureFrame.png';
import ItemTags from '../images/ItemTags.png';
import ItemNotes from '../images/ItemNotes.png';
import SmileyFace from '../images/SmileyGlasses.png';
import PhotoAdd from '../images/PhotoAdd.png';

import { 
  addCard,
  //clearCard,
  addCardTag,
  addCardImage,
  openTagsModal,
  deleteCardTag,
  closeTagsModal, 
  loadCategories,
  itemCardChanged,
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
    thisCard: state.cards.thisCard,
    tagsModalOpen: state.cards.tagsWindowOpen
  };
};

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
    this.openTagsEditModal = this.openTagsEditModal.bind(this);
    this.state = {
      image: null,
      images: null,
      catList: [],
      pickerItems: [],
      getIcon4Card: false,
      //tagsModalOpen: false,
      // ... these should go in redux / options panel & config file ...
      compress: 0.25,   // ... could cause huge files if above 50% ...
      showIcon: true,
      showName: true,
      showCategory: true,
      showDesc: false,
      showTags: true,
      showRating: true,
      showListPreview: false,
    };
  }

/*
      tags: [
        'Squirting',
        'Blowjob',
        'Sweet Gash',
        'Ass Fuck',
        'Cum Swapping',
        'Doggy Style',
        'Cow Girl',
        'Deepthroat',
        'Big Boobs',
        'Shaved Pussy',
        'Massive Cock'
      ]
*/

  componentWillMount() {
    console.log('inside build cards ...');
    this.cleanTempSpace();  // ... cleans up images in tmp directory ...
    if (this.props.catlist === undefined) {
      this.props.dispatch(loadCategories());
    }
    //const categoryResults = store.categoryList();
    //const categories = store.getAllCategories();
    //console.log('Categories: ', categoryResults, ' Length = ', categoryResults.length);
    //if (categoryResults.length > 0) {
    //  this.buildPickerItems(categoryResults);
    //}
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    //console.log(this.state);
    //const categoryResults = store.categoryList();
    //if (categoryResults.length > 0) {
    //  this.buildPickerItems(categoryResults);
    //}
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
    // ... this disappears once we move this module over to Realm ...
    //if (nextProps.listUpdated) {
    //  const myCards = nextProps.itemList;
    //  this.props.dispatch(saveMyCards(myCards));
    //  this.displaySnackBarMsg('Your details have been saved.', 'Great Job');
    //}
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case 'menu': {
          console.log('pressed the menu icon');
          this.props.navigator.toggleDrawer({ side: 'left', animated: true });
          break;
        }
        case 'options': {
          console.log('pressed the options icon');
          break;
        }
        default: break;
      }
    }
  }

  onChangeSelection(selection) {
    if (selection === 'addCategory') {
      //console.log('Wants to add a category!');
      this.props.navigator.showModal({
        title: 'Add a new Category',
        screen: 'tracksome.EditCategories'
      });
    } else /*if (selection !== '') */ {
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

  getCameraImage(cropit) {
    ImagePicker.openCamera({
      width: 1056,
      height: 768,
      cropping: cropit,
      compressImageQuality: this.state.compress,
      includeExif: true,
      includeBase64: true,
      cropperToolbarColor: AppColors.mainDarkColor,
      cropperActiveWidgetColor: AppColors.mainLiteColor,
      cropperToolbarTitle: 'Position Photo',
    }).then(image => {
      console.log('received image', image);
      this.itemImageChanged(image);
    }).catch(e => {
      console.log(e);
      //Alert.alert(e.message ? e.message : e);
    });
  }

  itemNameChanged(text) {
    this.props.dispatch(itemCardChanged('name', text));
  }

  itemDescChanged(text) {
    this.props.dispatch(itemCardChanged('desc', text));
  }

  itemImageChanged(image) {
    //console.log('New Image: ', image);
    this.props.dispatch(addCardImage(image));
  }

  itemTagRemove(tag) {
    this.props.dispatch(deleteCardTag(tag));
  }

  displaySnackBarMsg(msg, action) {
    this.props.navigator.showSnackbar({
      text: msg,  //'This option is in development',
      actionText: action, // optional
      actionId: 'rollback',  // ... ActionId within the Navigator Events ...
      actionColor: 'white', // optional
      textColor: AppColors.accentColor, // optional
      backgroundColor: '#333', // optional
      duration: 'long' // default is `short`. Available options: short, long, indefinite
    });
  }

  openTagsEditModal() {
    this.props.dispatch(openTagsModal(this.props.thisCard.key));
  }

  closeTagsEditModal() {
    if (this.props.thisCard.tag !== '') {
      this.addTag2Card();   // ... user closed without hitting the plus '+' button ...
    }
    this.props.dispatch(closeTagsModal(''));
  }

  cleanTempSpace() {
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    }).catch(e => {
      Alert.alert(e);
    });
  }

  pickSingleImage(cropit, circular = false) {
    //console.log('About to select a photo');
    ImagePicker.openPicker({
      width: 1056,
      height: 768,
      mediaType: 'photo',
      cropping: cropit,
      writeTempFile: false,    // ... only works on IOS ...
      //multiple: true,
      //circular: true,
      cropperCircleOverlay: circular,
      //compressImageMaxWidth: 1280,
      //compressImageMaxHeight: 720,
      compressImageQuality: this.state.compress,
      //compressVideoPreset: 'MediumQuality',
      includeExif: false, //true,
      includeBase64: true,
      cropperToolbarColor: AppColors.mainDarkColor,
      cropperActiveWidgetColor: AppColors.mainLiteColor,
      //cropperStatusBarColor: 'transparent',
      //hideBottomControls: true,
      //showCropGuidelines: false,
      cropperToolbarTitle: 'Position Photo',
    }).then(image => {
      //console.log('received image', image);
      this.itemImageChanged(image);
    }).catch(e => {
      console.log(e);
      //Alert.alert(e.message ? e.message : e);
    });
  }

  itemTagChanged(text) {
    //console.log('New Tag Value: ', text);
    this.props.dispatch(itemCardChanged('tag', text));
  }

  processTag(tag) {
    console.log('This tag is = ', tag);
    // ... don't add empty tags please ...
    // ... if not already in the list for this card - add it ...
    this.props.dispatch(addCardTag(tag));
    // ... also consider adding this tag to the master tags list ...
    // ... naturally after checking for duplicates ...
  }

  addTag2Card() {
    //console.log('Inside Add Tag 2 Card: ', this.props.thisCard.tag);
    if (this.props.thisCard.tag !== '') {
      const tagParts = this.props.thisCard.tag.split(',');  // ... in case commas entered ...
      tagParts.map(tag => this.processTag(tag.trim()));
    }
  }

  addThisCard() {
    //console.log('Inside Add This Card: ', this.props.thisCard.name);
    if (this.props.thisCard.name !== '') {
      this.props.dispatch(addCard(
        this.props.thisCard.list,
        this.props.thisCard.name,
        this.props.thisCard.desc,
        this.props.thisCard.icon,
        this.props.thisCard.iconType,
        this.props.thisCard.rating,
        this.props.thisCard.category,
        this.props.thisCard.imageThumb,
        this.props.thisCard.mimeType,
        this.props.thisCard.barcode,
        this.props.thisCard.tags,
        this.props.thisCard.notes
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
    const catsList = items.map((item, index) => {
      return <Picker.Item key={index} label={`${item.icon}  ${item.name}`} value={item.key} />;
    });
    this.setState({ pickerItems: catsList }); 
  }

  findCategoryByKey(key) {
    return this.props.catList.findIndex((item) => { return item.key === key; });
  }

  countTags(tags) {
    return tags.length;
  }

  buildCatDescription(category) {
    const indexPos = this.findCategoryByKey(category);
    if (indexPos >= 0) {
      return `${this.props.catList[indexPos].icon} ${this.props.catList[indexPos].name}`;
    }
    return category;
  }

  renderImage(image, mimeType) {
    //return <Image style={styles.imageStyle} source={image} />;
    return (
      <Image 
        style={styles.imageStyle} 
        source={{ uri: `data:${mimeType};base64,${image}` }} 
      />
    );
  }

  renderActionIcons = () => (
    <View style={styles.actionBar}>
      <TouchableNativeFeedback onPress={() => this.pickSingleImage(true)}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={PictureFrame} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.onSelectEmoji}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={SmileyFace} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => this.getCameraImage(true)}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={PhotoAdd} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.doSomeFunction}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={ItemNotes} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={this.openTagsEditModal}>
        <View style={styles.iconsPadding}>
          <Image style={styles.imageIconStyle} source={ItemTags} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );

  renderNameInput() {
    if (this.state.showName === false) return;
    return (
      <MDInput
        style={styles.nameWidth}
        label='Item Name*'
        placeholder='Please enter a name for this item ... '
        value={this.props.thisCard.name}
        onChangeText={text => this.itemNameChanged(text)}
      />
    );
  }

  renderDescription() {
    if (this.state.showDesc === false) return;
    return (
      <View style={styles.editFieldStyle}>
        <MDInput
          style={styles.inputStyle}
          label='Description (optional)'
          placeholder='Briefly describe this item ... '
          value={this.props.thisCard.desc}
          onChangeText={text => this.itemDescChanged(text)}
        />
      </View>
    );
  }

  renderCategory() {
    if (this.state.showCategory === false) return;
    return (
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
    );
  }

  renderTags() {
    if (this.state.showTags === false) return;
    return (
      <View style={styles.tagsBar}>
        <RenderTags 
          myTags={this.props.thisCard.tags} 
          onPressTag={tag => this.itemTagRemove(tag)} 
        />
      </View>
    );
  }
        
  renderPreview() {
    if (this.state.showListPreview === false) return;
    return (
      <MenuProvider>
      <View style={styles.previewCard}>
        <Text style={styles.cardPreviewText} >Your New Card - List Preview</Text>
        <CardItem 
          id={this.props.thisCard.key}
          icon={this.props.thisCard.icon}
          name={this.props.thisCard.name}
          desc={this.props.thisCard.desc}
          image={this.props.thisCard.imageThumb}
          mimeType={this.props.thisCard.mimeType}
          rating={this.props.thisCard.rating}
          selected={false}
          marked={false}
          numTags={this.countTags(this.props.thisCard.tags)}
          catDesc={this.buildCatDescription(this.props.thisCard.category)}
          checkIcon={this.props.thisCard.selected ? 'check-square-o' : 'square-o'}
          hilite={'white'}
          onPressMenu={this.doSomeFunction}
          onPressItem={this.doSomeFunction}   // ... simulate an item press ...
          onToggleItem={this.doSomeFunction}  // ... simulate a check box press ...
        />
      </View>
      </MenuProvider>
    );
  }

/*
  renderTagEditScreen() {
    return (
    <View style={styles.popupContainer}>
      <Modal
          visible={this.props.tagsModalOpen}
          transparent
          animationType={'fade'}
          onRequestClose={() => this.closeTagsEditModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <TagEdit
              tagsList={this.props.thisCard.tags}
              tagName={this.props.thisCard.tag}
              photo={this.props.thisCard.imageThumb}
              mimeType={this.props.thisCard.mimeType}
              onTagAdd={() => this.addTag2Card()} 
              onTagChange={text => this.itemTagChanged(text)}
              onTagRemove={tag => this.itemTagRemove(tag)}
              onClosePress={() => this.closeTagsEditModal()} 
            />
          </View>
        </View>
      </Modal>
    </View>
    );
  }
*/

/*
    const renderImage = Object.keys(this.props.thisCard.image).length === 0 && 
                        this.props.thisCard.image.constructor === Object ?  
                      <Text style={styles.previewText}>Preview Here!</Text> :
                      (<View style={styles.wrapperImage}> 
                         <Image style={styles.imageThumb} source={this.props.thisCard.image} />
                       </View>);
*/

  renderItemExtras() {
    // ... these two constants could be moved into a function ...
    const image = this.props.thisCard.imageThumb;
    const mimeType = this.props.thisCard.mimeType;
    const renderIcon = this.props.thisCard.icon !== '' ?
                      (<View style={styles.wrapperIcon}> 
                         <Text style={styles.emojiThumb}>{this.props.thisCard.icon}</Text>
                       </View>) : <View />;
    const renderImage = image === '' ?  
                       <Text style={styles.previewText}>Preview Here!</Text> :
                      (<View style={styles.wrapperImage}> 
                         <Image 
                           style={styles.imageThumb} 
                           source={{ uri: `data:${mimeType};base64,${image}` }} 
                         />
                       </View>);
    return (
      <View style={styles.mainPanel}>
        <View style={styles.statusBar}>
          { renderIcon }
          { renderImage }
        </View>
        <TouchableOpacity 
          disabled={this.props.thisCard.name === ''} 
          onPress={this.addThisCard.bind(this)}
          style={styles.masterButton}
        >
          <View style={styles.innerButton}>
            <Icon size={40} name='plus' color={'white'} />
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderIcon() {
    if (this.state.showIcon === false) return;
    return (
      <View style={styles.previewOutline}>
        {this.props.thisCard.imageThumb === '' ?  
           <Text style={styles.emojiIcon}>{this.props.thisCard.icon}</Text> :
         this.renderImage(this.props.thisCard.imageThumb, this.props.thisCard.mimeType)} 
      </View>
    );
  }

  //----------------------------------------------------
  // ... the main JSX render section for this class ...
  //----------------------------------------------------
  render() {
    return (
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
            <View style={styles.topRowStyle}>
              { this.renderIcon() }
              { this.renderNameInput() }
            </View>
            { this.renderCategory() }
            { this.renderDescription() }
          </View>
          { this.renderTags() }
        </View>
        { this.renderItemExtras() }
        { this.renderActionIcons() }
        { this.renderPreview() }
      </ScrollView>
    );
  }
}

export default connect(whatDoYouNeed)(BuildCard);

/*

WE NEED TO COMBINE THESE TWO FUNCTIONS INTO AN IMPORT MODULE
IN BUILD CARD AND SHOW CARDS

        { this.renderTagEditScreen() }

dropbox upload method

var myFile_Encoded = new encoding.TextEncoder().encode(JSON.stringify(myFile));
dbx.filesUpload({
  path: DBX_FILEPATH,
  contents: myFile_Encoded,
  mode: 'overwrite',
});

*/

const styles = StyleSheet.create({
  cardPreviewText: {
    color: AppColors.accentColor,
    fontSize: 15,
    padding: 7,
    textAlign: 'center',
    backgroundColor: AppColors.mainDarkColor
  },
  previewCard: {
    marginTop: 6,
    marginBottom: 6
  },
  wrapperIcon: {
    height: 46,
    paddingBottom: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 3,
    marginRight: 12,
    borderColor: '#888',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  wrapperImage: {
    height: 44,
    borderRadius: 3,
    borderColor: '#888',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  mainPanel: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  innerButton: {
    paddingTop: 3,
    alignItems: 'center'
  },
  masterButton: {
    elevation: 3,
    width: 68,
    height: 68,
    marginTop: -12,
    marginLeft: -100,
    justifyContent: 'center',
    borderRadius: 34,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  buttonText: {
    color: AppColors.hiliteColor,
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: -6,
  },
  statusBar: {
    width: '100%',
    height: 50,
    marginTop: -4,
    marginLeft: -11,
    flexDirection: 'row',
    padding: 2,
    alignItems: 'center',
    backgroundColor: AppColors.accentColor,  // ... light orange ...
    justifyContent: 'center'
  },
  // ... the main icon / photo ...
  imageThumb: {
    height: 44,
    width: 60,
    borderRadius: 3,
    resizeMode: 'cover'
  },
  imageStyle: {
    height: 60,
    width: 80,
    borderRadius: 3,
    resizeMode: 'cover'
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
  emojiThumb: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 3
  },
  emojiIcon: {
    color: 'black',
    fontSize: 42,
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
    height: 62,
    flexDirection: 'row',
    marginTop: -4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    alignItems: 'center',
    backgroundColor: AppColors.paperColor,  // ... light grey ...
    justifyContent: 'space-around'
  },
  tagsBar: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: 'wrap',    
    width: '100%',
    alignItems: 'center'
  },
  previewText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)',
    textAlign: 'center'
  },
  pickerElements: {
    marginLeft: -8,
    color: AppColors.darkerColor,
    height: 22
  },
  labelText: {
    fontSize: 11,
    color: AppColors.mainLiteColor
  },
  pickerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, .5)',
  },
  editFieldStyle: {   // ... not really used ...
    paddingBottom: 0,
    //backgroundColor: 'blue'
  },
  pickerStyle: {
    borderColor: '#c3c3c3',
    borderBottomWidth: 0.75,
    paddingBottom: 5
  },
  popupContainer: {
    //flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  modalInnerContainer: {
    width: '90%',
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
    backgroundColor: 'white',
    paddingBottom: 12,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageNotUsedStyle: {
    height: 200,
    borderRadius: 5,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    resizeMode: 'contain'
  },
  nameWidth: {     // ... used to define the item name input width ...
    width: '72%'
  },
  inputStyle: {   // ... used to define the item desc input width ...
    width: '100%'
  },
  buttonNotUsedText: {
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
    alignItems: 'center'
  },
  imageContainer: {
    width: '100%',
    padding: 3,
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
            <Button title="Get an Image to Crop" onPress={() => this.pickSingle(true)} />
                onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                <View style={styles.pickerElements}>
                  <Text>ICON</Text>
                  <Text style={styles.pickerText}>Markus Griebling</Text>
                  <Text style={{ position: 'absolute', marginLeft: '92%' }}>ARR</Text>
                </View>

                <TouchableNativeFeedback onPress={this.addThisCard.bind(this)}>

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

*/
