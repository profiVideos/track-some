import React from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet, 
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CardItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      didSave: false
    };
  }

  onTouchablePress = () => { 
    this.props.onPressItem(this.props.id);
  }

  onToggleCheck = () => { 
    this.props.onToggleItem(this.props.id, !this.props.selected);
  }

  onMenuPress = () => { 
    this.props.onPressMenu(this.props.id);
  }

  render() {
    //console.log('Item & Color: ', this.props.id, '  ', this.props.hilite);
    const backColor = this.props.hilite;   // ... AppsColor.hiliteColor, otherwise white ...
    const tagsBadge = (this.props.numTags === 0) ? <View /> :
      (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.extraInfo}>  Tags:</Text>
         <View style={styles.tagsBadge}>
           <Text style={styles.badgeTextStyle}>{this.props.numTags}</Text>
         </View>
       </View>);
    return (
      <View style={[styles.outerWrapper, { backgroundColor: backColor }]}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={this.onIconChange}>
            {Object.keys(this.props.image).length === 0 && 
             this.props.image.constructor === Object ?  
               <Text style={styles.itemIcon}>{this.props.icon}</Text> :
             <Image style={styles.imageStyle} source={this.props.image} />} 
          </TouchableOpacity>
        </View>
        <TouchableNativeFeedback onPress={this.onTouchablePress}>
          <View style={styles.infoWrapper}>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={1} 
              style={styles.itemName}
            >
              {this.props.name}
            </Text>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={1} 
              style={styles.subHeading}
            >
              {this.props.desc}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.extraInfo} >{this.props.catDesc}</Text>
              {tagsBadge}
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.onMenuPress}>
          <Icon 
            size={18}
            name={'ellipsis-v'} 
            style={styles.menuWrapper} 
            color={'#212191'} 
          />            
        </TouchableNativeFeedback>
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={this.onToggleCheck}>
            <Icon 
              size={20}
              name={this.props.checkIcon} 
              style={styles.checkStyle} 
              color={'#212121'} 
            />            
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

export default CardItem;

const styles = StyleSheet.create({
  subHeading: {
    fontSize: 13,
    //height: 15
    marginTop: -3
  },
  extraInfo: {
    fontSize: 11,
  },
  imageStyle: {
    height: 60,
    width: 80,
    borderRadius: 3,
    resizeMode: 'cover'
  },
  badgeTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
  tagsBadge: {
    backgroundColor: 'rgba(30,30,200,0.45)',
    marginLeft: 3,
    width: 14,
    height: 14,
    borderRadius: 14
  },
  outerWrapper: {
    width: '100%',
    height: 60,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageWrapper: {
    borderRadius: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b9b9b9',
    //padding: 7,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    //padding: 3,
    paddingLeft: 7,
    width: '68%',
    //justifyContent: 'center',
    //backgroundColor: 'yellow', //white',
  },
  checkWrapper: {
    //padding: 3,
    width: 22,
    //backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuWrapper: {
    padding: 5,
    //width: 22,
    //backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    //paddingTop: 3
  },
  itemName: {
    marginTop: -3,
    fontSize: 16,
    fontWeight: '500',
    //backgroundColor: 'grey', //white',
    color: '#333'
  },
  itemIcon: {
    height: 60,
    width: 80,
    textAlign: 'center',
    fontSize: 42,
    color: 'black'
  }
});
