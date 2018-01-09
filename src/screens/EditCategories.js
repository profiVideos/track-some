import React, { Component } from 'react';
import { 
  Text, 
  View,
  Alert,
  Button,
  FlatList,
  //ListItem,
  Dimensions, 
  //Animated,
  //ScrollView,
  StyleSheet 
} from 'react-native';
import { connect } from 'react-redux';

//import { Button } from 'react-native-elements';
//import EmojiPicker from 'react-native-simple-emoji-picker';  ... 1) broken ...
//import Emoticons from 'react-native-emoticons';  ... 2) also broken ...
//import EmojiPicker from 'react-native-emoji-picker';   // ... 3) also broken ProcTypes ...
//import { Icon } from 'native-base';   // ... Uses Ionicons from React Native Vector Icons ...
import AppColors from '../templates/appColors';
import MDInput from '../components/common/mdInput';
import { addCategory } from '../store/actions';
// ... following two lines are a temp cludge to test the actions ...
//import store from '../../App';
//import { ADD_CATEGORY } from '../store/actions/actionTypes';
//import CategoryList from '../components/CategoryList';
//import superHeros from '../store/data/characters.json';

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
    itemsLoaded: false,
    emailAddr: 'markus@profiphotos.com',
    itemName: 'Markus is here!',
    itemIcon: 'Nice Heart',
    //removeAnim: new Animated.Value(1),
    //categoriesAnim: new Animated.Value(0),
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

  onBackspacePress() {
    Alert.alert('Backspace was pressed!');
  }

  onEmojiSelected() {
    Alert.alert('Emoticon was selected!');
  }

  itemNameChanged(text) {
    this.setState({ itemName: text });
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
    this.props.navigator.push({
      screen: 'tracksome.PlaceDetailScreen',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    });
    */
  };

  addThisItem = () => {
    //if (this.props.navigator.header )
    //this.props.navigator.setTabBadge({
    //  tabIndex: 0, // (optional) if missing, the badge will be added to this screen's tab
    //  badge: 17, // badge value, null to remove badge
    //  badgeColor: '#006400', // (optional) if missing, the badge will use the default color
    //});
    //this.props.navigator.setSubTitle({
    //  subtitle: ''
    //});
    //const name = `The current description: ${this.state.itemName}`;
    //const icon = ` & the current icon is: ${this.state.itemIcon}`;
    //Alert.alert(name + icon);
    //console.log('---->>>', JSON.stringify(this.props.itemList));
    //Alert.alert(JSON.stringify(this.props.itemList));
    this.props.onAddCategory('04587', 'Great Red Meat', 'smiley-lady');
    // this.props.navigator.switchToTab({tabIndex: 0});
  }

renderItem({ item }) {
  return (
      <View style={styles.row}>
          <Text style={styles.rowText}> Name {item}</Text>
      </View>
  );
}

  render() {
    console.log(this.props.itemList);
    //console.log(superHeros);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <Text style={styles.textHeading}>Enter a new Category</Text>
            <MDInput
              label='Category Name'
              placeholder='A short category description ... '
              value={this.state.itemName}
              onChangeText={text => this.itemNameChanged(text)}
            />
            <MDInput
              label='Icon (optional)'
              placeholder='A nice Icon for this category? '
              value={this.state.itemIcon}
              onChangeText={icon => this.itemIconChanged(icon)}
            />
            <FlatList
              data={this.props.itemList}
              renderItem={({ item }) => (
                <Text>Hero: {item.name}  Strength: {item.strength}</Text>
              )}
            />            
            <Button
              style={styles.button}
              title="Add this Category"
              onPress={this.addThisItem}
            />
          </View>
        </View>
      </View>
    );
  }

/*
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
    onAddCategory: (categoryId, categoryDesc, categoryIcon) =>
      dispatch(addCategory(categoryId, categoryDesc, categoryIcon)),
  };
};

/*
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};
*/

//export default connect(mapStateToProps)(EditCategories);
export default connect(mapStateToProps, mapDispatchToProps)(EditCategories);

const styles = StyleSheet.create({
  button: {
    width: '80%'
  },
  container: {
    flex: 1,
    margin: 7,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outerContainer: {
    flex: 1,
    margin: 3,
    paddingBottom: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    //elevation: 3
  },
  textHeading: {
    color: '#232323',
    margin: 20,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
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


const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
}

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
