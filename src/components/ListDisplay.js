import React, { PureComponent } from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import AppColors from '../templates/appColors';

//const uri = 'http://profigraphics.com/images/Christina-100px.jpg';

//const itemHeight = 65;  // ... used to calculate faster scrolls ...

class ListItemDisplay extends PureComponent {
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
        <TouchableNativeFeedback onPress={this.onPressItem} onLongPress={this.onLongPressItem}>
          <View style={styles.container}>
            <Text>{this.props.item.name}</Text>
          </View>
        </TouchableNativeFeedback>
*/

  render() {
    return (
      <View style={styles.outerWrapper}>
        <TouchableNativeFeedback onPress={this.onPressItem} onLongPress={this.onLongPressItem}>
          <View style={styles.container}>

            <View style={styles.imageWrapper}>
              {this.props.item.imageThumb === '' ?  
                <Text style={styles.itemIcon}>{this.props.item.icon}</Text> :
                <Image 
                  style={styles.imageStyle} 
                  source={{ uri: 
                   `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
                />} 
            </View>

            <View style={styles.statusPanel}>
              <Text style={styles.numberText}>Cards: {this.props.item.numCards}</Text>
            </View>

            <View style={styles.infoPanel}>
              <Text style={styles.listName}>{this.props.item.name}</Text>
              <Text 
                ellipsizeMode='tail' 
                numberOfLines={2} 
                style={styles.listDesc}
              >
                {this.props.item.desc}
              </Text>
            </View>

          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

}

export default ListItemDisplay;

const styles = StyleSheet.create({
  imageWrapper: {
    //width: 80,
    //borderTopRightRadius: 3,
    //borderTopLeftRadius: 3,
    //borderLeftWidth: 1,
    //borderRightWidth: 1,
    //borderColor: '#b9b9b9',
    //backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon: {
    //height: 180,
    width: '100%',
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 100,
    color: 'black'
  },
  imageStyle: {
    height: 190,
    width: 190,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    //maxWidth: 256,
    //maxHeight: 256,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    resizeMode: 'contain',    
  },
  numberText: {
    fontSize: 10,
    fontWeight: '300',
    color: AppColors.paperColor,
    textAlign: 'center'
  },
  statusPanel: {
    padding: 2,
    width: '100%',
    backgroundColor: AppColors.darkerColor
  },
  infoPanel: {
    padding: 3,
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'white'
  },
  outerWrapper: {
    margin: 4,
    //width: 194,
    //elevation: 3,
    //borderRadius: 5,
    //backgroundColor: AppColors.paperColor,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'stretch',
    //justifyContent: 'center',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  container: {
    margin: 3,
    //width: '100%',
    width: 190,
    elevation: 3,
    borderRadius: 7,
    //height: 150,
    //padding: 3,
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconValue: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center'
  },
  listDesc: {
    color: '#555',
    fontSize: 10,
    fontWeight: '300',
    textAlign: 'center'
  },
  listName: {
    color: '#121212',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center'
  }
});
