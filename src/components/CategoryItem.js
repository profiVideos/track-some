import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    this.props.onPressItem(this.props.id, this.props.name);
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
      key={item.key}
      icon={item.icon}
      name={item.name}
      description={item.desc}
      onPressItem={this.onCatItemPress}

FontAwesome
square-o
check-square-o

*/

    return (
      <View style={styles.outerWrapper}>
        <TouchableNativeFeedback onPress={this.onTouchablePress}>
          <View style={styles.catWrapper}>
            <Text style={styles.catIcon}>{this.props.icon}</Text>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={1} 
              style={styles.catName}
            >
              {this.props.name}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.checkWrapper}>
          <TouchableOpacity onPress={this.onToggleCheck}>
            <Icon 
              size={22}
              name='square-o' 
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  catWrapper: {
    borderRadius: 2,
    padding: 3,
    height: 45,
    width: '88%',
    paddingLeft: 12,
    paddingBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkWrapper: {
    padding: 3,
    width: '12%',
    height: 45,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    paddingTop: 3
  },
  catName: {
    fontSize: 17,
    width: '90%',
    fontWeight: '500',
    color: '#333'
  },
  catIcon: {
    marginRight: 10,
    fontSize: 30,
    color: 'black'
  }
});


/*
      <Image resizeMode="cover" source={props.categoryIcon} style={styles.categoryIcon} />
*/
