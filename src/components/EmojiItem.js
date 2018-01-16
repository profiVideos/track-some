import React, { PureComponent } from 'react';
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

  componentDidMount() {
    //console.log('Inside EmojiItem ...');
    //console.log(this.props.selected);
  }

  onTouchablePress = () => { 
    //console.log('Pressed an item! Hurrah!', this.props.emojiId);
    this.props.onPressItem(this.props.emojiName, this.props.emojiString);
    //this.setState({ selected: !this.state.selected });
  } 

/*
  TouchableNativeFeedback (On Android for almost all touchable elements.)
  TouchableHighlight (On iOS for touchable elements or buttons that have a 
                      solid shape or background, and on ListView items.)
*/

  render() {
    //console.log(this.props);
    //const backColor = this.props.selected ? '#fff8b2' : 'white';
    //const backColor = this.state.selected ? '#fff8b2' : 'white';
    return (
      <TouchableNativeFeedback onPress={this.onTouchablePress}>
        <View style={styles.container}>
          <Text style={styles.iconValue}>{this.props.emojiString}</Text>
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
