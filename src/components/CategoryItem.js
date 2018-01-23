import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableNativeFeedback 
  //Image 
} from 'react-native';

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
*/

    return (
      <TouchableNativeFeedback onPress={this.onTouchablePress}>
        <View style={styles.catWrapper}>
          <Text style={styles.catIcon}>{this.props.icon}</Text>
          <Text style={styles.catName}>{this.props.name}</Text>
        </View>
      </TouchableNativeFeedback>
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
  catWrapper: {
    elevation: 2,
    borderRadius: 2,
    //width: '100%',
    //marginBottom: 5,
    padding: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  catName: {
    //marginRight: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#333'
  },
  catIcon: {
    marginRight: 12,
    fontSize: 30,
    color: 'black'
  }
});


/*
      <Image resizeMode="cover" source={props.categoryIcon} style={styles.categoryIcon} />
*/
