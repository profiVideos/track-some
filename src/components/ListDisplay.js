import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  //ToastAndroid,
  TouchableNativeFeedback
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import AppColors from '../templates/appColors';

//const uri = 'http://profigraphics.com/images/Christina-100px.jpg';

//const itemWidth = 176;  // ... used to calculate column spacing ...
const itemWidth = 170;  // ... add this to state - used to calculate column spacing ...
const IconMenuOption = (props) => (
  <MenuOption 
    value={props.value} 
    text={`${props.icon}  ${props.text}`} 
  />
);
const menuOptionsStyles = {
  optionsContainer: {
    width: 120,
    backgroundColor: AppColors.darkerColor,  // ... dark cyan ...
  },
  optionText: {
    color: 'white',
  },
};

class ListItemDisplay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      didSave: false,
    };
  }

  componentWillMount() {
    this.onLayout();
  }

  onLayout() {
    const scrnWidth = Dimensions.get('window').width;
    const numColumns = Math.floor(scrnWidth / itemWidth);
    const horizontalMargin = (((scrnWidth / numColumns) - itemWidth) / 2) - 3;
    this.setState({
      numCols: numColumns,
      horizMargin: horizontalMargin,
      scrnWidth: Dimensions.get('window').width
    });
  }

  onPressItem = () => { 
    this.props.onItemPress(this.props.item);
  } 

  onLongPressItem = () => { 
    this.props.onMenuPress('edit', this.props.item);
  } 

  onMenuSelect = (value, item) => { 
    this.props.onMenuPress(value, item);
  }

  renderOptionMenu = () => (
    <Menu onSelect={value => this.onMenuSelect(value, this.props.item)}>
      <MenuTrigger>
        <Icon size={16} name={'ellipsis-v'} style={styles.iconWrapper} color={'#f2f2f2'} />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsStyles}>
        <IconMenuOption value={'edit'} icon='✏️' text='Edit' />
        <IconMenuOption value={'delete'} icon='🗑️' text='Delete' />
      </MenuOptions>
    </Menu>
  )

  render() {
    //ToastAndroid.show(`Window Width: ${this.state.horizMargin}`, ToastAndroid.SHORT);
    const backColor = this.props.hilite;   // ... AppColors.hiliteColor, otherwise white ...
    return (
      <View 
        style={[styles.outerWrapper, { marginHorizontal: this.state.horizMargin }]} 
        onLayout={this.onLayout.bind(this)}
      >
        <TouchableNativeFeedback 
          onPress={this.onPressItem}
          onLongPress={this.onLongPressItem}
        >
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
              <Text style={styles.numberText}>Drops: {this.props.item.numCards}</Text>
              <Text style={styles.numberText}>Notes: {this.props.item.numNotes}</Text>
              <View style={styles.menuWrapper}>
                <TouchableNativeFeedback>
                  { this.renderOptionMenu() }
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={[styles.infoPanel, { backgroundColor: backColor }]}>
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
  iconWrapper: {
    paddingHorizontal: 7,
    justifyContent: 'flex-end'
  },
  menuWrapper: {
    //width: 20,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon: {
    width: '100%',
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 100,
    color: 'black'
  },
  imageStyle: {
    height: itemWidth - 6,
    width: itemWidth - 6,
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
    paddingLeft: 7,
    textAlign: 'center'
  },
  statusPanel: {
    padding: 2,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.darkerColor
  },
  infoPanel: {
    padding: 3,
    paddingHorizontal: 5,
    width: '100%',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  outerWrapper: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  container: {
    margin: 3,
    width: itemWidth - 6,
    elevation: 3,
    borderRadius: 7,
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
