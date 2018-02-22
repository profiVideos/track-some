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

class CategoryItem extends React.PureComponent {
  constructor(props) {
    super(props);
    //console.log(props);
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
*/
    const backColor = this.props.hilite;   // ... AppColors.hiliteColor, otherwise white ...
    return (
      <View style={[styles.outerWrapper, { backgroundColor: backColor }]}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={this.onIconChange}>
            <Text style={styles.catIcon}>{this.props.icon}</Text>
          </TouchableOpacity>
        </View>
        <TouchableNativeFeedback onPress={this.onTouchablePress}>
          <View style={styles.infoWrapper}>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={1} 
              style={styles.catName}
            >
              {this.props.name}*{this.props.list}*
            </Text>
          </View>
        </TouchableNativeFeedback>
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

export default CategoryItem;

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
    height: 45,
    flexDirection: 'row',
    //backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconWrapper: {
    borderRadius: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b9b9b9',
    padding: 3,
    //marginLeft: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    backgroundColor: '#f5f5f5',  //#282828',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    height: 45,
    padding: 3,
    paddingLeft: 7,
    width: '71%',
    justifyContent: 'center',
    //backgroundColor: 'white',
  },
  checkWrapper: {
    padding: 5,
    width: '13%',
    //backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    paddingTop: 3
  },
  catName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333'
  },
  catIcon: {
    fontSize: 30,
    color: 'black'
  }
});


/*
      <Image resizeMode="cover" source={props.categoryIcon} style={styles.categoryIcon} />
*/
