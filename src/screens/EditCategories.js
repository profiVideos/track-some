import React, { Component } from 'react';
import { 
  Text, 
  View,
  Alert,
  FlatList,
  Platform,
  Dimensions, 
  //ScrollView,
  //Animated,
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';

//import { Button } from 'react-native-elements';
//import EmojiPicker from 'react-native-simple-emoji-picker';  ... 1) broken ...
//import Emoticons from 'react-native-emoticons';  ... 2) also broken ...
//import EmojiPicker from 'react-native-emoji-picker';   // ... 3) also broken ProcTypes ...
//import { Icon, Button } from 'native-base';   // ... Uses Ionicons from RN Vector Icons ...
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
//import Emoji from 'react-native-emoji';
import AppColors from '../templates/appColors';
import MDInput from '../components/common/mdInput';
import MDButton from '../components/common/mdButton';
import { addCategory } from '../store/actions';
//import CategoryItem from '../components/CategoryItem';


/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
}

    "babel-polyfill": "^6.26.0",
    "emoji-datasource": "^2.4.4",
    "prop-types": "^15.6.0"

*/

class EditCategories extends Component {

  static navigatorStyle = {
    drawUnderNavBar: false,
    screenBackgroundColor: AppColors.paperColor,
    navBarTextColor: AppColors.mainLiteColor,
    navBarBackgroundColor: AppColors.hiliteColor,
    navBarTranslucent: false
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', () => {
      this.setState({
        scrWidth: Dimensions.get('window').width,
        scrHeight: Dimensions.get('window').height,
        viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
          ? 'portrait' : 'landscape'
      });
    });
  }

  state = {
    toggled: false,
    hasloaded: false,
    itemsCount: 0,
    itemName: '',
    itemDesc: '',
    itemIcon: '',
    //removeAnim: new Animated.Value(1),
    //categoriesAnim: new Animated.Value(0),
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

  componentDidUpdate() {
    this.props.navigator.setTabBadge({
      badge: this.state.itemsCount,
      badgeColor: '#121212'  // ... doesn't seem to be working ...
    });
    //console.log(`Toggled is: ${this.state.toggled}`);
  }

  onEmojiSelect() {
    Alert.alert('Select an Emoticon!');
  }

  toggleDescription = () => {
    this.setState({ toggled: !this.state.toggled });
  }

  itemNameChanged(text) {
    this.setState({ itemName: text });
  }

  itemDescChanged(text) {
    this.setState({ itemDesc: text });
  }

  itemIconChanged(icon) {
    this.setState({ itemIcon: icon });
  }

  itemSelectedHandler = key => {
    Alert.alert(`A list item was selected with ${JSON.stringify(key)}`);
    /*
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    */
  };

  addThisItem = () => {
    this.props.onAddCategory('04587', 'Best Red Meat', 
      'Probably the best prime meat this side of the Atlantic', 'smiley-lady');
    this.setState({ itemsCount: this.state.itemsCount + 1 });
  }

  itemSeparator = () => {
    return (<View style={{ height: 1, width: '100%', backgroundColor: '#d2d2d2' }} />);
  };

/*

icons on the image server;

https://res.cloudinary.com/profivideos/icons/apple-64/1f4a3.png

Used for other module - but here it is.

react-native-image-resizer


  renderCategoryItem = ({ item }) => (
    <CategoryItem 
      key={item.key}
      Icon={item.icon}
      Name={item.name}
      Description={item.desc}
      //onPressItem={this.onPressItem}
      //selected={!!this.state.selected.get(item.id)}
    />
  );
*/
  renderMoreFields() {
    if (this.state.toggled) {
      return (
        <View style={{ marginTop: 5 }}>
          <MDInput 
            label='Description (optional)'
            placeholder='An optional category description ... '
            value={this.state.itemDesc}
            onChangeText={text => this.itemDescChanged(text)}
          />
        </View>
      );
    }
  }

  render() {
    //console.log(this.props.itemList);
    //const backColor = this.props.selected ? '#fff8b2' : 'white';
    //const buttonType = (Platform.OS === 'android' ? 0 : 64);
    return (
        <View style={styles.outerContainer}>
          <View style={styles.rowInputBar}>
            <MDButton
              iconSize={36} iconColor='white' iconName='mood' 
              textLabel='Add Icon'
              onPress={this.onEmojiSelect} 
            />
            <View style={styles.textInput}>
              <MDInput
                label='Category Name'
                placeholder='A short category name ... '
                value={this.state.itemName}
                onChangeText={text => this.itemNameChanged(text)}
              />
              {this.renderMoreFields()}
            </View>
            <MDButton
              iconSize={36} iconColor='white' iconName='event-note' 
              textLabel='Description'
              onPress={this.toggleDescription} 
            />
            <MDButton
              iconSize={46} iconColor='#333' iconName='add' 
              onPress={this.addThisItem} 
            />
          </View>
          <FlatList
            data={this.props.itemList}
            renderItem={({ item }) => (
              <Text>Category: {item.name}  Description: {item.desc}</Text>
            )}
            ItemSeparatorComponent={this.itemSeparator}
          />            
        </View>
    );
  }

/*
              <Button transparent onPress={this.addThisItem}>
                <Icon ios='ios-add' android='md-add' style={{ fontSize: 56 }} />
              </Button>            

            <MDInput
              label='Icon (optional)'
              placeholder='A nice Icon for this category? '
              value={this.state.itemIcon}
              onChangeText={icon => this.itemIconChanged(icon)}
            />
          <Button
            style={styles.button}
            title="Add this Category"
            onPress={this.addThisItem}
          />

    // this.props.navigator.switchToTab({tabIndex: 0});
    //this.props.navigator.setSubTitle({
    //  subtitle: ''
    //});
            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />
            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />

            <FlatList
              data={superHeros}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.name}`}
                />
              )}
            />            

            <CategoryList
              data={this.props.itemList}
              onItemSelected={this.itemSelectedHandler}
            />

              onItemSelected={this.itemSelectedHandler}

            <FlatList
              data={this.props.itemList}
              renderItem={({ item }) => this.renderItem(item)}
            />

 {item.catName}
            <Text>{this.props.itemList.catName}</Text>
          <CategoryList
            categories={this.props.itemList}
            onItemSelected={this.itemSelectedHandler}
          />
<FlatList
      style={styles.listContainer}
      data={props.categories}
      renderItem={(info) => (
        <CategoryItem
          categoryName={info.categories.catName}
          categoryIcon={info.categories.catIcon}
          onItemPressed={() => props.onItemSelected(info.categories.catId)}
        />
      )}
    />
*/

}

const mapStateToProps = state => {
  return {
    itemList: state.categories.itemList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCategory: (categoryId, categoryName, categoryDesc, categoryIcon) =>
      dispatch(addCategory(categoryId, categoryName, categoryDesc, categoryIcon)),
  };
};

/*
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(EditCategories);

const styles = StyleSheet.create({
  button: {
    width: '80%'
  },
  textInput: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#979797'
  },
  rowInputBar: {
    width: '100%',
    flexDirection: 'row',
    padding: (Platform.OS === 'android' ? 5 : 5),
    alignItems: 'center',
    //margin: 3,
    backgroundColor: AppColors.accentColor,  // ... medium orange ...
    justifyContent: 'space-around'
  },
  outerContainer: {
    flex: 1,
    //padding: 5,
    //borderRadius: 2,
    backgroundColor: 'white'
  }
});

/*

            <Icon ios='ios-book' android="md-book" style={{ fontSize: 48, color: 'blue' }} />
            <EmojiPicker 
              onEmojiSelected={this.onEmojiSelected}
            />            

              onChangeText={icon => this.itemIconChanged(icon)}
              onChangeText={icon => this.setState({ itemIcon: icon })}
              onChangeText={text => this.setState({ itemName: text })}

  itemNameChanged(text) {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          itemName: {
            ...prevState.controls.itemName,
            value: text
            //valid: validate(val, prevState.controls.placeName.validationRules)
          }
        }
      };
    });
  }

  itemIconChanged(icon) {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          itemIcon: {
            ...prevState.controls.itemIcon,
            value: icon
          }
        }
      };
    });
  }

            <MDInput
              label='Icon (optional)'
              placeholder='How about a nice Icon for this category? '
              value={this.state.controls.itemIcon.value}
              onChangeText={icon => this.itemIconChanged(icon)}
            />


    let content = (<Text>Hello World!</Text>);
    if (this.state.itemsLoaded) {
      content = (
          <CategoryList
            categories={this.props.categories}
            onItemSelected={this.itemSelectedHandler}
          />
      );
    }


              disabled={
                !this.state.controls.itemName.valid ||
                !this.state.controls.itemicon.valid
              }

          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />

      <View style={this.state.itemsLoaded ? null : styles.buttonContainer}>
        {content}
      </View>

            ... also had problems with React.PropTypes.func
            <Emoticons
               onEmoticonPress={this.onEmoticonPress.bind(this)}
               onBackspacePress={this.onBackspacePress.bind(this)}
               show
               concise
               showHistoryBar
               showPlusBar
            />            

*/
