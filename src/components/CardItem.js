import React from 'react';
import { 
  View, 
  Text, 
  Image,
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback 
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../templates/appColors';

const IconMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={`${props.icon}  ${props.text}`} 
  />
);

class CardItem extends React.PureComponent {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.onDeviceChange);
    this.state = {
      didSave: false,
      isVisible: false,
      infoWidth: Dimensions.get('window').width - 112
    };
  }

  componentWillMount() {
    console.log('inside card item ...');
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDeviceChange);
  }

  onDeviceChange = (dims) => {
    this.setState({
      infoWidth: dims.window.width - 112
    });
  };

  onTouchablePress = () => { 
    this.props.onPressItem(this.props.item.key);
  }

  onToggleCheck = () => { 
    this.props.onToggleItem(this.props.item.key, !this.props.item.selected);
  }

  onMenuSelect = (value, item) => { 
    this.props.onMenuPress(value, item);
  }

  renderOptionMenu = () => (
    <Menu onSelect={(value) => this.onMenuSelect(value, this.props.item)}>
      <MenuTrigger>
        <Icon size={18} name={'ellipsis-v'} style={styles.menuWrapper} color={'#212191'} />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <IconMenuOption value={'edit'} icon='✏️' text='Edit' />
        <IconMenuOption value={'tags'} icon='🏷️' text='Tags' />
        <IconMenuOption value={'notes'} icon='🗒️' text='Notes' />
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

  render() {
    const infoWidth = this.state.infoWidth;
    const backColor = this.props.hilite;   // ... AppsColor.hiliteColor, otherwise white ...
    const renderFull = this.props.marked ? <Text>Show Everything!</Text> : <View />;
    const tagsBadge = (this.props.numTags === 0) ? <View /> :
      (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.extraInfo}>Tags:</Text>
         <View style={styles.tagsBadge}>
           <Text style={styles.badgeTextStyle}>{this.props.numTags}</Text>
         </View>
       </View>);
    const itemDesc = (this.props.item.desc === '') ? <View /> :
      (<Text ellipsizeMode='tail' numberOfLines={1} style={styles.subHeading}>
         {this.props.item.desc}
       </Text>);
    const categoryDesc = (this.props.catDesc === '') ? <View /> :
      <Text style={styles.extraInfo} >{`${this.props.catDesc}  `}</Text>;

    return (
      <View>
        <View style={[styles.outerWrapper, { backgroundColor: backColor }]}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={this.onIconChange}>
              {this.props.item.imageThumb === '' ?  
                 <Text style={styles.itemIcon}>{this.props.item.icon}</Text> :
               <Image 
                 style={styles.imageStyle} 
                 source={{ uri: 
                  `data:${this.props.item.mimeType};base64,${this.props.item.imageThumb}` }} 
               />} 
            </TouchableOpacity>
          </View>
          <TouchableNativeFeedback onPress={this.onTouchablePress}>
            <View style={[styles.infoWrapper, { width: infoWidth }]}>
              <Text 
                ellipsizeMode='tail' 
                numberOfLines={1} 
                style={styles.itemName}
              >
                {this.props.item.name}
              </Text>
              {itemDesc}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {categoryDesc}
                {tagsBadge}
              </View>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.checkWrapper}>
            <TouchableNativeFeedback>
              { this.renderOptionMenu() }
            </TouchableNativeFeedback>
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
        <View style={styles.fullView}>
          { renderFull }
        </View>
      </View>
    );
  }

}

export default CardItem;

const menuOptionsStyles = {
  optionsContainer: {
    width: 105,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

const styles = StyleSheet.create({
  menuTitle: {
    fontWeight: '500', 
    color: AppColors.darkerColor,
    paddingBottom: 3,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  subHeading: {
    fontSize: 13,
    //height: 15
    marginTop: -3,
  },
  extraInfo: {
    fontSize: 11,
    paddingBottom: 3,
  },
  imageStyle: {
    height: 60,
    width: 80,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
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
    borderRadius: 14,
    marginBottom: 3,
  },
  outerWrapper: {
    width: '100%',
    height: 60,
    paddingRight: 16,
    //elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'blue',
    justifyContent: 'space-between'
  },
  imageWrapper: {
    width: 80,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    //borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#b9b9b9',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoWrapper: {
    paddingLeft: 7,
    //width: {state.infoWidth},  //'82%', //'70%',
  },
  checkWrapper: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuWrapper: {
    padding: 7,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkStyle: {
    //paddingTop: 3
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
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
