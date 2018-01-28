import React from 'react';
import { 
  View, 
  Text, 
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
    this.props.onPressItem(
      this.props.id, 
      this.props.name,
      this.props.desc,
      this.props.icon,
      this.props.selected
    );
  }

  onToggleCheck = () => { 
    this.props.onToggleItem(
      this.props.id, 
      this.props.name,
      this.props.desc,
      this.props.icon,
      !this.props.selected
    );
  }

  render() {
    const tagsBadge = (this.props.numTags === 0) ? <View /> :
      (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text>  Tags:</Text>
         <View style={styles.tagsBadge}>
           <Text style={styles.badgeTextStyle}>{this.props.numTags}</Text>
         </View>
       </View>);
    return (
      <View style={styles.outerWrapper}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={this.onIconChange}>
            <Text style={styles.itemIcon}>{this.props.icon}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{this.props.catDesc}</Text>
              {tagsBadge}
            </View>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={this.onToggleCheck}>
            <Icon 
              size={18}
              name={'pencil'} 
              style={styles.checkStyle} 
              color={'#212191'} 
            />            
          </TouchableOpacity>
        </View>
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={this.onToggleCheck}>
            <Icon 
              size={22}
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconWrapper: {
    borderRadius: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b9b9b9',
    padding: 7,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    padding: 3,
    paddingLeft: 7,
    width: '70%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkWrapper: {
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    paddingTop: 3
  },
  itemName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333'
  },
  itemIcon: {
    fontSize: 36,
    color: 'black'
  }
});
