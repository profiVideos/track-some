import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  StyleSheet,
  //ScrollView,
  //ToastAndroid,
  TouchableOpacity,
  //TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { UniqueId } from '../components/common/UniqueId';
import AppColors from '../templates/appColors';
import ItemNotes from '../images/ItemNote.png';
import ColorPalette from '../images/ColorPalette.png';
import PictureFrame from '../images/PictureFrameBare.png';
import RenderColors from './RenderColors';
import {
  addNote,
  clearNote,
  updateNote,
  addCardNote,
  updateCardNotes,
  toggleColorPicker,
  togglePhotoViewer,
  propertyNoteChanged
} from '../store/actions';

//const itemHeight = 65;  // ... used to calculate faster scrolls ...

/*
To Restart the currently running App;
adb shell am broadcast -a react.native.RELOAD
*/
/*
const optionStyles = (color) => {
  optionWrapper: {
    backgroundColor: 'pink',
    margin: 5,
  }
};
*/

const whatDoYouNeed = state => {
  return {
    thisNote: state.notes.thisNote,
    thisCard: state.cards.thisCard,
    activeList: state.lists.activeList,
    somethingChanged: state.notes.editChange,
    colorPicker: state.notes.colorPicker,
    photoViewer: state.notes.photoViewer,
    notesModalOpen: state.notes.notesWindowOpen,
    cardNoteLinksChanged: state.cards.notesChanged,
  };
};

class NoteEdit extends PureComponent {
  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarBackgroundColor: AppColors.accentColor,
    contextualMenuStatusBarColor: '#0092d1',
    contextualMenuBackgroundColor: '#00adf5',
    contextualMenuButtonsColor: '#ffffff',
    navBarTranslucent: false
  };

  constructor(props) {
    super(props);
    //this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.state = { 
      didSave: false,
      textValue: '',
      colors: [
        '#f8f8f8',
        '#feff9c',
        '#c2fec1',
        '#f6d2b4',
        '#7afcff',
        '#c4e5f2',
        '#ff7eb9',
        '#e4f555',
        '#a5f448',
        '#f8b042',
        '#8dd0f0',
        '#fb49af'
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    //-------------------------------------------------------------------------------------
    // ... due to the async processing we can only save when everything has been added ...
    // ... if main if is true - the tags Modal window has now closed - save & clean up ...
    //-------------------------------------------------------------------------------------
    if (this.props.notesModalOpen && nextProps.notesModalOpen === false) {
      if (nextProps.cardNoteLinksChanged === true && this.props.thisCard.key !== '') {   
        this.props.dispatch(updateCardNotes(this.props.thisCard.key, nextProps.thisCard.notes));
      }
      this.props.dispatch(clearNote());  // ... removes the card link from note record ...
    }
  }

  onColorChange(color) {
    this.props.dispatch(propertyNoteChanged('color', color));
  }

  onTitleChange(text) {
    this.props.dispatch(propertyNoteChanged('title', text));
  }

  onNoteChange(text) {
    this.props.dispatch(propertyNoteChanged('note', text));
  }

  onClosePress(card) {
    //ToastAndroid.show(`Close Note with Card: ${card}`, ToastAndroid.SHORT);
    if (this.props.thisNote.note !== '') {
      // ... user closed without hitting the plus '+' button first (can happen!) ...
      this.addNote2Card(card, true);  // ... true = we are finished ...
    }
    this.props.onClosePress();
  }

  pressedButton(whichOne) {
    switch (whichOne) {
      case 'color': {
        this.props.dispatch(toggleColorPicker(this.props.colorPicker));
        break;
      }
      case 'photo': {
        this.props.dispatch(togglePhotoViewer(this.props.photoViewer));
        break;
      }
      default: break;
    }  // ... switch ...
  }

  addOrUpdateNote(card, canClose) {
    console.log(canClose);
    //ToastAndroid.show(`Add/Update Note with Card: ${card}`, ToastAndroid.SHORT);
    if (this.props.somethingChanged) {
      if (this.props.thisNote.key === '') {
        const newNoteKey = UniqueId();
        this.props.dispatch(addNote(
          newNoteKey,
          this.props.activeList.key,  // ... link this note to our active list ...
          this.props.thisNote.card,
          this.props.thisNote.icon, 
          this.props.thisNote.title, 
          this.props.thisNote.note, 
          this.props.thisNote.color, 
          this.props.thisNote.priority, 
          this.props.thisNote.reminder
        ));
        // ... if we are editing an existing card, we need ...
        // ... to update the card with this new note link ...
        if (card !== '') {
          this.props.dispatch(addCardNote(newNoteKey));
        }
      } else {
        // ... update this note ...
        this.props.dispatch(updateNote(this.props.thisNote));
        // ... the no note key is being added or deleted from the card so all's good ...
      }
    }
    // ... close the window if the user requested it ...
    if (canClose) {
      this.props.onClosePress();
    }
  }

  addNote2Card(card, canClose) {
    if (this.props.thisNote.note !== '') {
      if (this.props.thisNote.title === '') {
        Alert.alert('Adding Note', 
          `You are about to add a note without a title.
Do you really want to do this?\n
If you DO NOT wish to use note titles, please turn them off in the options panel.`,
          [{ text: 'Cancel', style: 'cancel' },
           { text: 'OK', onPress: () => this.addOrUpdateNote(card, canClose) }]);
      } else {
        // ... just save the note ...
        this.addOrUpdateNote(card, canClose);
      }
    }
  }

  renderColorSwatches() {
    if (this.props.colorPicker === false) return;
    return (
      <View style={styles.colorBar}>
        <RenderColors 
          myColors={this.state.colors}
          activeColor={this.props.thisNote.color !== '' ? this.props.thisNote.color : '#f8f8f8'}
          onPressColor={color => this.onColorChange(color)} 
        />
      </View>
    );
  }

  renderPhotoViewer() {
    if (this.props.photoViewer === false) return;
    if (this.props.photo === '' || this.props.photo === undefined) return;
    return (
      <View style={styles.photoContainer}>
        <Image 
         style={styles.photoStyle} 
         source={{ uri: `data:${this.props.mimeType};base64,${this.props.photo}` }} 
        /> 
      </View>
    );
  }

  renderPhotoButton(photo) {
    if (photo === '' || photo === undefined) return;
    return (
      <TouchableNativeFeedback onPress={() => this.pressedButton('photo')}>
        <Image style={styles.imageIconStyle} source={PictureFrame} />
      </TouchableNativeFeedback>
    );
  }

  renderOptionButtons() {
    return (
      <View style={styles.optionsBar}>
        <TouchableNativeFeedback onPress={() => this.pressedButton('color')}>
          <Image style={styles.imageIconStyle} source={ColorPalette} />
        </TouchableNativeFeedback>
        { this.renderPhotoButton(this.props.photo) }
      </View>
    );
  }

  renderAddButton(noteKey) {
    if (noteKey !== '') return;   // ... no need to show '+' button when updating note ...
    return (
      <TouchableOpacity 
        //disabled={this.props.thisNote.title === ''} 
        onPress={() => this.addNote2Card(this.props.thisNote.card, false)} 
      >
        <View style={{ alignItems: 'center' }}>
          <Icon size={28} name='plus' color={AppColors.darkerColor} />
        </View>
      </TouchableOpacity>
    );
  }

/*
            <Text style={styles.whiteText}>{this.props.mimeType}</Text>
        <ScrollView
          contentContainerStyle={styles.scrollStyle}
          keyboardShouldPersistTaps='always'
        >
        </ScrollView>
*/

  render() {
    const title = (this.props.id === '' ? 'Add a New Note' : 'Edit a Note');
    const noteColor = (this.props.thisNote.color !== '' ? this.props.thisNote.color : '#f8f8f8');
    //console.log('Has Photo: ', this.props.mimeType);
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.imageIconStyle} source={ItemNotes} />
              <Text style={styles.headline}>{title}</Text>
            </View>
            <TouchableOpacity onPress={this.props.onClosePress}>
              <View style={{ alignSelf: 'flex-end' }}>
                <Icon size={20} name='times' color={AppColors.mainLiteColor} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.statusBar}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInputStyle}
                autoFocus
                returnKeyType='next'
                ref={input => { this.inputs.title = input; }}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.inputs.note.focus(); }}
                disableFullscreenUI
                underlineColorAndroid={'transparent'}
                placeholder={'Note Title ... '}
                value={this.props.thisNote.title}
                onChangeText={text => this.onTitleChange(text)}
              />
            </View>
            { this.renderAddButton(this.props.id) }
            <TouchableNativeFeedback 
              onPress={() => this.addNote2Card(this.props.thisNote.card, true)}
            >
              <View style={styles.buttonFinish}> 
                <IonIcon 
                  name='md-checkmark-circle-outline' 
                  size={34} 
                  color={AppColors.paperColor} 
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          { this.renderOptionButtons() }
          { this.renderColorSwatches() }
          { this.renderPhotoViewer() }
          <View style={[styles.noteContainer, { backgroundColor: noteColor }]}>
            <TextInput
              style={styles.noteInputStyle}
              multiline
              //numberOfLines={3}
              //placeholderTextColor='#aaa'
              returnKeyType='done'
              ref={input => { this.inputs.note = input; }}
              underlineColorAndroid={'transparent'}
              //onBlur={() => { this.textInputDone(this.props.note); }}
              blurOnSubmit={false}
              textBreakStrategy={'highQuality'}
              disableFullscreenUI
              placeholder={'Write something amazing ... '}
              value={this.props.thisNote.note}
              onChangeText={text => this.onNoteChange(text)}
            />
          </View>
        </View>
      </View>
    );
  }

}

export default connect(whatDoYouNeed)(NoteEdit);

/*
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

export default class App extends Component {

  state = {
      text: '',
      textYPosition: 0,
      textHeight: 0
  };

  updateScrollPosition(width, height){
    let yPositionDifference = (height - this.state.textHeight)
    let newYPosition = this.state.textYPosition + yPositionDifference
    this.scroll.scrollTo({x: 0, y: newYPosition, animated: false})
    this.setState({textHeight: height})
  }

  handleScroll(scrollEvent){
    let textYPosition = scrollEvent.nativeEvent.contentOffset.y
    this.setState({textYPosition})
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior = "position"
        keyboardVerticalOffset= {80}
        keyboardDismissMode = "on-drag"
      >
        <View
        style ={{height:500, backgroundColor: "blue"}}
        />
        <ScrollView
          ref={(scroll) => {this.scroll = scroll;}}
          onContentSizeChange = {(width, height) => this.updateScrollPosition(width, height)}
          style = {{height:80}}
          scrollEventThrottle = {1}
          onScroll = {nativeEvent => this.handleScroll(nativeEvent)}
        >
            <TextInput
              blurOnSubmit = {false}
              multiline = {true}
              style={styles.text}
              underlineColorAndroid = "transparent"
              onChangeText={text => this.setState({ text })}
              placeholder={"Start Typing..."}
            />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

*/

/*

IMPORTANT TRICK: 
<View style={[styles.noteContainer, { backgroundColor: `${this.props.noteColor}` }]}>

  renderConversations() {
    let conversationContent = this.state.conversationArray.map((convObj, i) => {
      return <View key={i} 
      style={[globalStyle.conversationContainer,globalStyle.shadow,convObj.directionClass]}>
        <Text style= {[globalStyle.conversationText,convObj.directionTextClass]}>
        { convObj.text }</Text>
        <View style= {globalStyle.actionButtonsContainer}>
          { this.renderActionButtons(convObj.actionButtons) }
        </View>
      </View>                            
    })
    return conversationContent;
  }
*/

const styles = StyleSheet.create({
  scrollStyle: {
    //flex: 1
    //marginTop: 40,
  },
  photoStyle: {
    width: '80%',
    height: 150,
    borderRadius: 7,
    resizeMode: 'contain'
  },  
  photoContainer: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },  
  whiteText: {
    color: 'white'
  },
  colorBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: 'rgba(0,0,0,0.45)',
    backgroundColor: AppColors.paperColor
  },
  colorChooser: {
    color: 'black',
    fontSize: 24,
  },
  optionsBar: {
    height: 36,
    flexDirection: 'row',
    paddingTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    backgroundColor: '#727272'  //AppColors.paperColor
  },
  noteContainer: {
    backgroundColor: '#f8f8f8',
  },
  noteInputStyle: {
    //height: 400,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 30,
    color: 'black',
    fontSize: 15,
    textAlignVertical: 'top'    
  },
  buttonFinish: {
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: AppColors.darkerColor
  },
  textInputStyle: {
    color: '#121212',
    padding: 3,
    fontSize: 16,
    fontWeight: '600'
  },
  imageIconStyle: {
    height: 34,
    width: 34,
    marginHorizontal: 6,
    resizeMode: 'contain'
  },
  statusBar: {
    elevation: 3,
    height: 43,
    paddingTop: 1,
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
    marginTop: 16,
    //borderRadius: 8,
  },
  innerContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'transparent',  // ... medium orange ...
    //justifyContent: 'center',
  },
  inputContainer: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //marginRight: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 32
  },
  headline: {
    color: AppColors.accentColor,
    paddingTop: 2,
    paddingLeft: 12,
    fontSize: 18,
    fontWeight: '500'
  },
  headerContainer: {
    width: '100%',
    backgroundColor: AppColors.mainDarkColor,
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

/*

const menuOptionsStyles = {
  optionsContainer: {
    width: 85,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const ColorMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={props.text}
    customStyles={{ 
      optionWrapper: { 
        backgroundColor: `${props.fillColor}`, 
        margin: 1, 
        height: 20 
      } 
    }}
  />
);

  selectNoteColor() {
    return (
      <Menu onSelect={(value) => this.props.onColorChange(value)}>
        <MenuTrigger>
          <Text style={styles.colorChooser}>🎨</Text>
        </MenuTrigger>
        <MenuOptions customStyles={menuOptionsStyles}>
          <ColorMenuOption value={'#f8f8f8'} text=' ' fillColor={'#f8f8f8'} />
          <ColorMenuOption value={'#feff9c'} text=' ' fillColor={'#feff9c'} />
          <ColorMenuOption value={'#c2fec1'} text=' ' fillColor={'#c2fec1'} />
          <ColorMenuOption value={'#f6d2b4'} text=' ' fillColor={'#f6d2b4'} />
          <ColorMenuOption value={'#7afcff'} text=' ' fillColor={'#7afcff'} />
          <ColorMenuOption value={'#c4e5f2'} text=' ' fillColor={'#c4e5f2'} />
          <ColorMenuOption value={'#ff7eb9'} text=' ' fillColor={'#ff7eb9'} />
          <ColorMenuOption value={'#e4f555'} text=' ' fillColor={'#e4f555'} />
          <ColorMenuOption value={'#a5f448'} text=' ' fillColor={'#a5f448'} />
          <ColorMenuOption value={'#f8b042'} text=' ' fillColor={'#f8b042'} />
          <ColorMenuOption value={'#8dd0f0'} text=' ' fillColor={'#8dd0f0'} />
          <ColorMenuOption value={'#fb49af'} text=' ' fillColor={'#fb49af'} />
        </MenuOptions>
      </Menu>
    );
  }

const paper = '#f5f5f5';

const liteYellow = '#feff9c'; //#feffd7
const liteGreen = '#c2fec1';
const liteOrange = '#f6d2b4';  // ... alt: #f6a12e
const liteCyan = '#7afcff';
const liteBlue = '#c4e5f2';
const litePink = '#ff7eb9';

const yellow = '#fff740';   // #e4f555 (postit color)
const green = '#a5f448';
const orange = 'f8b042';  // ... postit color ...
const blue = '#98c8ff'; //#8dd0f0  #34a6e2 (postit color)
const darkPink = '#fb49af'; // ... postit color ...

*/
