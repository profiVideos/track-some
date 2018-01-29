import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  //TouchableHighlight,
  //TouchableNativeFeedback
} from 'react-native';
import AppColors from '../templates/appColors';
import ItemTags from '../images/ItemTags.png';
import RenderTags from './RenderTags';

//const itemHeight = 65;  // ... used to calculate faster scrolls ...

/*
To Restart the currently running App;
adb shell am broadcast -a react.native.RELOAD
*/

class TagEdit extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      didSave: false,
    };
  }

  onPressTag = (tag) => {
    console.log('Tag inside TagEdit was clicked: ', tag); 
    //this.props.onTapItem(this.props.emojiName, this.props.emojiString);
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

  renderItemTags() {
    const renderThis = (this.props.tagsList.length === 0 ? ( 
      <View style={styles.tagsEmpty}>
        <Text style={styles.sadFace}>😢</Text>
        <Text style={styles.bigMessage}>You have no tags for this item yet!</Text>
        <Text style={styles.bigMessage}>Go ahead and enter your first one below.</Text>
      </View>) : (
      <View style={styles.tagsContainer}>
        <RenderTags 
          myTags={this.props.tagsList} 
          onPressTag={this.props.onTagRemove} 
        />
      </View>));
    return renderThis;
  }

  render() {
    //console.log(this.state.tags);
    //console.log(this.renderTags(this.state.tags));
    //const renderBadge = this.props.canEdit && this.props.isChecked ?
    //  (<View style={[styles.extraInfo, { backgroundColor: 'blue' }]}>
    //     <Icon name='check' style={styles.badgeStyle} />
    //   </View>) : null;
    //const backColor = this.state.selected ? '#fff8b2' : 'white';
    return (
      <View style={styles.outerContainer}>

        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.imageIconStyle} source={ItemTags} />
            <Text style={styles.headline}>Add a New Tag</Text>
          </View>
          <TouchableOpacity onPress={this.props.onClosePress}>
            <View style={{ alignSelf: 'flex-end' }}>
              <Icon size={20} name='times' color={AppColors.mainLiteColor} />
            </View>
          </TouchableOpacity>
        </View>

        { this.renderItemTags() }

        <View style={styles.statusBar}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInputStyle}
              //autoCorrect={false}
              //blurOnSubmit={true}
              disableFullscreenUI
              underlineColorAndroid={'transparent'}
              placeholder={'A new tag ... '}
              value={this.props.tagName}
              onChangeText={this.props.onTagChange}
            />
          </View>
          <TouchableOpacity 
            //disabled={this.props.thisTag.name === ''} 
            onPress={this.props.onTagAdd} 
          >
            <View style={{ alignItems: 'center', marginLeft: 5 }}>
              <Icon size={28} name='plus' color={AppColors.darkerColor} />
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

}

export default TagEdit;

/*
          <View style={styles.tagItem}>
            <Text style={styles.textValue}>
              Jumping Jacks
            </Text>
          </View>
          <View style={styles.tagItem}>
            <Text style={styles.textValue}>
              Elephants
            </Text>
          </View>
          <View style={styles.tagItem}>
            <Text style={styles.textValue}>
              Nursing Moms
            </Text>
          </View>

      <TouchableNativeFeedback onPress={this.onTouchablePress}>
        <View style={[styles.container, { backgroundColor: backColor }]}>
          <View style={styles.headingRow}>
            <Image 
              style={styles.imageThumb} 
              source={{ uri: this.props.thumbNail }}
            />
            <View style={styles.textMargins} >
              <Text style={styles.heading}>{this.props.Name}</Text>
              <Text style={styles.tagLine}>{this.props.Teaser}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>

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
  tagsEmpty: {
    //height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 10,
    backgroundColor: AppColors.paperColor
  },
  bigMessage: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.40)'
  },
  sadFace: {
    fontSize: 60,
    color: 'rgba(0,0,0,0.40)'
  },
  tagsContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 5,
    paddingTop: 12,
    paddingBottom: 12,
    flexWrap: 'wrap',    
  },
  smallDot: {
    fontSize: 5,
    color: '#ccc',
    paddingRight: 3,
  },
  tagItem: {
    elevation: 1,
    //borderRadius: 2,
    padding: 3,
    paddingLeft: 4,
    paddingRight: 6,
    margin: 3,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    backgroundColor: AppColors.hiliteColor,
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  textInputStyle: {
    color: '#121212',
    padding: 3,
    fontSize: 16,
    fontWeight: '300'
  },
  imageIconStyle: {
    height: 32,
    width: 32,
    resizeMode: 'contain'
  },
  statusBar: {
    elevation: 3,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'center',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  outerContainer: {
    borderRadius: 8,
    //backgroundColor: 'blue'
  },
  inputContainer: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 30
  },
  headline: {
    color: AppColors.accentColor,
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
  usageStyle: {
    position: 'absolute',
    marginTop: 0,
    marginLeft: 55
  },
  usageText: {
    fontSize: 11,
    fontWeight: '700'
  },
  badgeStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    //fontWeight: 'bold'
  },
  extraInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: -20,
    width: 22,
    height: 22,
    borderRadius: 22
  },
  iconValue: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center'
  },
});
