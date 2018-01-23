import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  //Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

//const uri = 'http://profigraphics.com/images/Christina-100px.jpg';

const itemHeight = 65;  // ... used to calculate faster scrolls ...

class EmojiItem extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      didSave: false
    };
  }


  onPressItem = () => { 
    this.props.onTapItem(this.props.emojiName, this.props.emojiString);
  } 

  onLongPressItem = () => { 
    this.props.onLongPress(this.props.emojiKey);
  } 

/*
          // ... for sort debugging ...
          <View style={styles.usageStyle}>
            <Text style={styles.usageText}>{this.props.usageNum}</Text>
          </View>

  TouchableNativeFeedback (On Android for almost all touchable elements.)
  TouchableHighlight (On iOS for touchable elements or buttons that have a 
                      solid shape or background, and on ListView items.)
*/

  render() {
    //console.log(this.props);
    //const badgeColor = this.props.canEdit ? 'blue' : 'transparent';
    const renderBadge = this.props.canEdit && this.props.isChecked ?
      (<View style={[styles.extraInfo, { backgroundColor: 'blue' }]}>
         <Icon name='check' style={styles.badgeStyle} />
       </View>) : null;
    //const backColor = this.state.selected ? '#fff8b2' : 'white';
    return (
      <TouchableNativeFeedback onPress={this.onPressItem} onLongPress={this.onLongPressItem}>
        <View style={styles.container}>
          <Text style={styles.iconValue}>{this.props.emojiString}</Text>
          { renderBadge }
          <Text 
            ellipsizeMode='tail' 
            numberOfLines={1} 
            style={styles.textValue}
          >
            {this.props.emojiName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

}

export default EmojiItem;

/*
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
*/

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 2,
    width: '16.66666666666667%',  // ... 100 / 6 items across ...
    //width: '14.28571428571429%',  // ... 100 / 7 items across ...
    height: itemHeight,           // ... used to calculate faster scrolls ...
    margin: 0,
    padding: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
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
  textValue: {
    color: 'black',
    fontSize: 9,
    textAlign: 'center'
  }
});
