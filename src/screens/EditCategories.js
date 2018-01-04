import React, { Component } from 'react';
import { 
  Text, 
  View,
  Alert,
  Button,
  Dimensions, 
  //Animated,
  ScrollView,
  StyleSheet 
} from 'react-native';
//import { Button } from 'react-native-elements';
import AppColors from '../templates/appColors';
import MDInput from '../components/common/mdInput';
//import CategoryList from '../components/CategoryList';

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
    itemName: '',
    itemIcon: 'Groovy',
    //removeAnim: new Animated.Value(1),
    //categoriesAnim: new Animated.Value(0),
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }

  itemNameChanged(text) {
    this.setState({ itemName: text });
  }

  itemIconChanged(icon) {
    this.setState({ itemIcon: icon });
  }

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
    const name = `The current description: ${this.state.itemName}`;
    const icon = ` & the current icon is: ${this.state.itemIcon}`;
    Alert.alert(name + icon);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <Text style={styles.textHeading}>Enter a new Category</Text>
            <MDInput
              label='Category Name'
              placeholder='Something short to describe this category ... '
              value={this.state.itemName}
              onChangeText={text => this.itemNameChanged(text)}
            />
            <MDInput
              label='Icon (optional)'
              placeholder='How about a nice Icon for this category? '
              value={this.state.itemIcon}
              onChangeText={icon => this.itemIconChanged(icon)}
            />
            <Button
              style={styles.button}
              title="Add this Category"
              onPress={this.addThisItem}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

}

export default EditCategories;

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
    margin: 3,
    paddingBottom: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 3
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

*/
