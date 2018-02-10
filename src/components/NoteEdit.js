import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  //Alert,
  Image,
  TextInput,
  StyleSheet,
  //ScrollView,
  TouchableOpacity,
  //TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppColors from '../templates/appColors';
import ItemNotes from '../images/ItemNotes.png';
import RenderColors from './RenderColors';

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

class NoteEdit extends PureComponent {

  constructor(props) {
    super(props);
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

/*
  onClosePressed = () => {
    Alert.alert('Tag inside TagEdit and requested the close: ');
    this.props.onClosePress();
    //this.props.onTapItem(this.props.emojiName, this.props.emojiString);
  } 
*/

  pressedButton(whichOne) {
    //Alert.alert('pressed the button - ' + which);
    this.props.onButtonPress(whichOne);
  }

  renderColorSwatches() {
    if (this.props.pickerActive === false) return;
    return (
      <View style={styles.colorBar}>
        <RenderColors 
          myColors={this.state.colors}
          activeColor={this.props.noteColor}
          onPressColor={color => this.props.onColorChange(color)} 
        />
      </View>
    );
  }

  renderOptionButtons() {
    return (
      <TouchableNativeFeedback onPress={() => this.pressedButton('color')}>
        <Text style={styles.colorChooser}>🎨</Text>
      </TouchableNativeFeedback>
    );
  }

/*
  addThisTag() {
    console.log('Add this tag ...');
  }
*/
/*
  onLongPressItem = () => { 
    this.props.onLongPress(this.props.emojiKey);
  } 
      <TouchableNativeFeedback onPress={this.onPressItem} onLongPress={this.onLongPressItem}>
      </TouchableNativeFeedback>

              onTagChange={text => this.itemTagChanged(text)} 

*/

  render() {
    return (
      <View style={styles.outerContainer}>

        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.imageIconStyle} source={ItemNotes} />
            <Text style={styles.headline}>Add a New Note</Text>
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
              blurOnSubmit={false}
              disableFullscreenUI
              underlineColorAndroid={'transparent'}
              placeholder={'Note Title ... '}
              value={this.props.noteTitle}
              onChangeText={this.props.onTitleChange}
            />
          </View>
          <TouchableOpacity 
            //disabled={this.props.thisNote.title === ''} 
            onPress={this.props.onNoteAdd} 
          >
            <View style={{ alignItems: 'center' }}>
              <Icon size={28} name='plus' color={AppColors.darkerColor} />
            </View>
          </TouchableOpacity>
          <TouchableNativeFeedback onPress={this.props.onClosePress}>
            <View style={styles.buttonFinish}> 
              <IonIcon 
                name='md-checkmark-circle-outline' 
                size={34} 
                color={AppColors.paperColor} 
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.optionsBar}>
          { this.renderOptionButtons() }
        </View>
        { this.renderColorSwatches() }
        <View style={[styles.noteContainer, { backgroundColor: `${this.props.noteColor}` }]}>
          <TextInput
            style={styles.noteInputStyle}
            multiline
            numberOfLines={10}
            //placeholderTextColor='#aaa'
            returnKeyType='done'
            underlineColorAndroid={'transparent'}
            blurOnSubmit={false}
            textBreakStrategy={'highQuality'}
            disableFullscreenUI
            placeholder={'Write something amazing ... '}
            value={this.props.note}
            onChangeText={this.props.onNoteChange}
          />
        </View>

      </View>
    );
  }

}

export default NoteEdit;

/*
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
    height: 34,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    backgroundColor: '#525252'  //AppColors.paperColor
  },
  noteContainer: {
    backgroundColor: '#f8f8f8',
  },
  noteInputStyle: {
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
    height: 32,
    width: 32,
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
    borderRadius: 8,
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
    backgroundColor: AppColors.mainDarkColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
