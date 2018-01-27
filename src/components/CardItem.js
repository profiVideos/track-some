import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  //TouchableWithoutFeedback,
  TouchableNativeFeedback 
  //Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CardItem extends React.PureComponent {
  constructor(props) {
    super(props);
    //console.log(props);
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
    //console.log(this.props);
    //const badgeColor = this.props.canEdit ? 'blue' : 'transparent';
    //const renderBadge = this.props.canEdit && this.props.isChecked ?
    //  (<View style={[styles.extraInfo, { backgroundColor: 'blue' }]}>
    //     <Icon name='check' style={styles.badgeStyle} />
    //   </View>) : null;
    //const backColor = this.state.selected ? '#fff8b2' : 'white';
/*
  onTogglePress  
    <CategoryItem 
      id={item.key}
      icon={item.icon}
      name={item.name}
      desc={item.desc}
      selected={item.selected}
      onPressItem={this.onCatItemPress}
    />
          <Text style={styles.catIcon}>✏️</Text>
*/
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
            <Text>
              {this.props.catDesc}
            </Text>
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

/*
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
*/

const styles = StyleSheet.create({
  outerWrapper: {
    //flex: 1,
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
    //marginLeft: 3,
    //paddingLeft: 7,
    //paddingRight: 7,
    //paddingBottom: 3,
    backgroundColor: '#f5f5f5',  //#282828',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    //height: 55,
    padding: 3,
    paddingLeft: 7,
    width: '70%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkWrapper: {
    padding: 5,
    //width: '10%',
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


/*
      <Image resizeMode="cover" source={props.categoryIcon} style={styles.categoryIcon} />
*/
