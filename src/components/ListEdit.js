import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Alert,
  StyleSheet, 
  ScrollView,
  //ToastAndroid,
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { TextField } from 'react-native-material-textfield';
//import TextField from 'react-native-material-textinput (PLEASE REMOVE FROM PROJECT)';
import { UniqueId } from '../components/common/UniqueId';
import AppColors from '../templates/appColors';
import PictureFrame from '../images/PictureFrame.png';
import SmileyFace from '../images/SmileyGlasses.png';
import PhotoAdd from '../images/PhotoAdd.png';
import ListEdits from '../images/ListEdit.png';

import { 
  addList,
  updateList,
  addListImage,
  propertyListChanged,
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
    emojiCode: state.emojis.emojiCode,     // ... current emoji selected in PickEmojis ...
    thisList: state.lists.thisList,
  };
};

class ListEdit extends PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    disabledButtonColor: '#333',
    screenBackgroundColor: AppColors.paperColor,
    navBarButtonColor: AppColors.hiliteColor,
    navBarTextColor: AppColors.accentColor,
    navBarBackgroundColor: AppColors.mainDarkColor,
    navBarTranslucent: false
  };

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

  constructor(props) {
    super(props);
    this.inputs = {};
    this.onSelectEmoji = this.onSelectEmoji.bind(this);
    this.state = {
      image: null,
      images: null,
      getIcon4List: false,
      // ... these should go in redux / options panel & config file ...
      compress: 0.50,   // ... could cause huge files if above 50% ...
      showIcon: true,
      showName: true,
      showDesc: true
    };
  }

  componentWillMount() {
    console.log('inside edit list ...');
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.cleanTempSpace();  // ... cleans up images in tmp directory ...
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emojiCode !== nextProps.emojiCode) {
      if (this.state.getIcon4List) {
        this.props.dispatch(propertyListChanged('icon', nextProps.emojiCode));
      }
      // ... clean up and go home ...
      this.setState({ getIcon4List: false });
      //console.log('A new Emoji Code was selected');
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case 'menu': {
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

  onSelectEmoji() {
    this.setState({ getIcon4List: true });
    this.props.navigator.showModal({
       title: 'Select an Emoji', 
      screen: 'tracksome.EmojiPicker' 
    });
  }

  getCameraImage(cropit) {
    ImagePicker.openCamera({
      width: 256,
      height: 256,
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
    this.props.dispatch(propertyListChanged('name', text));
  }

  itemDescChanged(text) {
    this.props.dispatch(propertyListChanged('desc', text));
  }

  itemImageChanged(image) {
    //console.log('New Image: ', image);
    this.props.dispatch(addListImage(image));
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

  cleanTempSpace() {
    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    }).catch(e => {
      Alert.alert(e);
    });
  }

  pickSingleImage(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 256,
      height: 256,
      mediaType: 'photo',
      cropping: cropit,
      writeTempFile: false,    // ... only works on IOS ...
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

  updateThisList() {
    // ... we have to have a list name in order to save ...
    if (this.props.thisList.name !== '') {
      if (this.props.thisList.key === '') {
        // ... we are adding a new list ...
        this.props.dispatch(addList(
          UniqueId(),
          this.props.thisList.name,
          this.props.thisList.desc,
          this.props.thisList.icon,
          this.props.thisList.iconType,
          this.props.thisList.imageThumb,
          this.props.thisList.mimeType,
          this.props.thisList.barcode
        ));
      } else {
        // ... we should update this list definition ...
        this.props.dispatch(updateList(this.props.thisList));
      }
    // ... auto close the window on an add / update ...
    this.props.onClosePress();
    }
  }

  renderImage(image, mimeType) {
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
    </View>
  );

/*
      <TextField
        style={styles.nameWidth}
        label='List Name*'
        //autoFocus
        returnKeyType='next'
        ref={input => { this.inputs.name = input; }}
        blurOnSubmit={false}
        onSubmitEditing={() => { this.inputs.desc.focus(); }}
        disableFullscreenUI
        placeholder='Please enter a short list name '
        value={this.props.thisList.name}
        onChangeText={text => this.itemNameChanged(text)}
      />

        <TextField 
          //style={styles.nameWidth}
          label='List Name*'
          //autoFocus
          returnKeyType='next'
          ref={input => { this.inputs.name = input; }}
          blurOnSubmit={false}
          //onSubmitEditing={() => { this.inputs.desc.focus(); }}
          //onSubmitEditing={() => { this.desc.focus(); }}
          disableFullscreenUI
          placeholder='Please enter a short list name '
          value={this.props.thisList.name}
          onChangeText={text => this.itemNameChanged(text)}
        />
Dense spacing
Padding above label: 8dp
Padding below label: 4dp
Padding above text input line: 8dp
Padding below text input line: 4dp

*/

  renderNameInput() {
    if (this.state.showName === false) return;
    return (
      <View style={styles.nameWidth}>
        <TextField
          //style={styles.nameInput}
          label='List Name*'
          title='Please enter a short list name.'
          lineWidth={0.75}
          labelHeight={20}
          animationDuration={375}
          inputContainerPadding={6}
          ref={input => { this.inputs.name = input; }}
          onSubmitEditing={() => { this.inputs.desc.focus(); }}
          titleTextStyle={{ fontStyle: 'italic', marginTop: -2 }}
          //enablesReturnKeyAutomatically
          //characterRestriction={32}
          returnKeyType='next'
          disableFullscreenUI
          value={this.props.thisList.name}
          onChangeText={text => this.itemNameChanged(text)}
        />      
      </View>
    );
  }

  renderDescription() {
    if (this.state.showDesc === false) return;
    return (
      <View style={styles.descWidth}>
        <TextField
          //style={styles.descInput}
          label='Description (optional)'
          title='Briefly describe what the list will contain ... '
          lineWidth={0.75}
          labelHeight={16}
          animationDuration={375}
          inputContainerPadding={6}
          multiline
          ref={input => { this.inputs.desc = input; }}
          titleTextStyle={{ fontStyle: 'italic', marginTop: -2 }}
          disableFullscreenUI
          returnKeyType='done'
          value={this.props.thisList.desc}
          onChangeText={text => this.itemDescChanged(text)}
        />
      </View>
    );
  }

  renderItemExtras() {
    // ... these four constants could be moved into a function ...
    const image = this.props.thisList.imageThumb;
    const mimeType = this.props.thisList.mimeType;
    const renderIcon = this.props.thisList.icon !== '' ?
                      (<View style={styles.wrapperIcon}> 
                         <Text style={styles.emojiThumb}>{this.props.thisList.icon}</Text>
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
          disabled={this.props.thisList.name === ''} 
          onPress={this.updateThisList.bind(this)}
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
        {this.props.thisList.imageThumb === '' ?  
           <Text style={styles.emojiIcon}>{this.props.thisList.icon}</Text> :
         this.renderImage(this.props.thisList.imageThumb, this.props.thisList.mimeType)} 
      </View>
    );
  }

  //----------------------------------------------------
  // ... the main JSX render section for this class ...
  //----------------------------------------------------
  render() {
    const title = (this.props.id === '' ? 'Add a New List' : 'Edit List');
    return (
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
        <View style={styles.listContainer}>
  
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.imageIconStyle} source={ListEdits} />
              <Text style={styles.headline}>{title}</Text>
            </View>
            <TouchableOpacity onPress={this.props.onClosePress}>
              <View style={{ alignSelf: 'flex-end' }}>
                <Icon size={20} name='times' color={AppColors.mainLiteColor} />
              </View>
            </TouchableOpacity>
          </View>
          { this.renderActionIcons() }
          <View style={styles.textContainer}>
            <View style={styles.topRow}>
              { this.renderIcon() }
              { this.renderNameInput() }
            </View>
            { this.renderDescription() }
          </View>
  
        </View>
  
        { this.renderItemExtras() }
  
      </ScrollView>
    );
  }
}

export default connect(whatDoYouNeed)(ListEdit);

/*

dropbox upload method

var myFile_Encoded = new encoding.TextEncoder().encode(JSON.stringify(myFile));
dbx.filesUpload({
  path: DBX_FILEPATH,
  contents: myFile_Encoded,
  mode: 'overwrite',
});

*/

const styles = StyleSheet.create({
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  actionBar: {
    height: 46,
    flexDirection: 'row',
    paddingTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.15)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#727272',
    justifyContent: 'space-around'
  },
  imageIconStyle: {
    height: 42,
    width: 42,
    resizeMode: 'contain'
  },
  iconsPadding: {
    alignItems: 'center', 
    padding: 5
  },
  headline: {
    color: AppColors.accentColor,
    paddingTop: 2,
    paddingLeft: 12,
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center'
  },
  headerContainer: {
    width: '100%',
    backgroundColor: AppColors.mainDarkColor,
    //borderTopLeftRadius: 8,
    //borderTopRightRadius: 8,
    padding: 12,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapperIcon: {
    //height: 50,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: 'white'
  },
  wrapperImage: {
    height: 52,
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
    marginTop: -6,
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
    height: 58,
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
    height: 50,
    width: 50,
    borderRadius: 2,
    resizeMode: 'cover'
  },
  imageStyle: {
    height: 98,
    width: 98,
    borderRadius: 4,
    resizeMode: 'cover'
  },
  previewOutline: {
    height: 100,
    width: 100,
    //padding: 3,
    alignItems: 'center', 
    borderRadius: 5,
    //marginTop: 5,
    margin: 5,
    //marginBottom: 3,
    borderColor: '#aaa',
    borderWidth: 1
  },
  emojiThumb: {
    color: 'black',
    fontSize: 36,
    textAlign: 'center',
    paddingBottom: 2
  },
  emojiIcon: {
    color: 'black',
    fontSize: 70,
    textAlign: 'center',
    paddingBottom: 2
  },
  previewText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)',
    textAlign: 'center'
  },
  textContainer: {
    width: '90%',
    paddingTop: 4,
    paddingBottom: 4,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  listContainer: {
    backgroundColor: 'white',
    paddingBottom: 8,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameWidth: {     // ... used to define the item name input width ...
    width: '65%'
  },
  descWidth: {     // ... used to define the item desc input width ...
    width: '100%'
  },
});
