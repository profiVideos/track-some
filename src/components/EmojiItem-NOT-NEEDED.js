import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';

//const uri = 'http://profigraphics.com/images/Christina-100px.jpg';

class FlatListItem extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
       didSave: false
    };
  }

  componentDidMount() {
    console.log('Inside FlatListItem ...');
    //console.log(this.props.selected);
  }

  onTouchablePress = () => { 
    //console.log('Pressed an item! Hurrah!');
    this.props.onPressItem(this.props.id);
    //this.setState({ selected: !this.state.selected });
  } 

/*
  TouchableNativeFeedback (On Android for almost all touchable elements.)
  TouchableHighlight (On iOS for touchable elements or buttons that have a 
                      solid shape or background, and on ListView items.)
*/

  render() {
    //console.log(this.props);
    const backColor = this.props.selected ? '#fff8b2' : 'white';
    //const backColor = this.state.selected ? '#fff8b2' : 'white';
    return (
      <TouchableNativeFeedback onPress={this.onTouchablePress}>
        <View style={[styles.container, { backgroundColor: backColor }]}>
          <View style={styles.headingRow}>
            <Image 
              style={styles.imageThumb} 
              source={{ uri: this.props.thumbNail }}
            />
            <View style={styles.textMargins} >
              <Text style={styles.heading}>{this.props.Name}</Text>
              <Text style={styles.tagLine}>{this.props.Teaser}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

}

export default FlatListItem;

const styles = StyleSheet.create({
  textMargins: {
    flex: 1.0,
    marginLeft: 10,
    marginRight: 10 
  },
  container: {
    elevation: 1,
    borderRadius: 2,
    margin: 0,
    padding: 2,
    backgroundColor: 'white',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85
  },
  headingRow: {
    flexDirection: 'row',
    margin: 0,
    alignItems: 'center',
    //elevation: 2
  },
  heading: {
    fontSize: 20,
    fontWeight: '700'
  },
  imageThumb: {
    width: 120, 
    height: 85,
    resizeMode: 'contain',
    borderRadius: 1
  },
  tagLine: {
    fontSize: 13,
    fontStyle: 'italic'
  },
  textInput: {
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

/*

    const textColor = this.state.selected ? 'red' : 'black';
    const boldState = this.state.selected ? '700' : '300';
              <Text style={{ color: textColor, fontWeight: boldState }}>Hello World!</Text>
const FlatListItem = (props) => {

<Switch
            onValueChange = {props.toggleSwitch1}
            value = {props.switch1Value}/>

          <Text>{props.thumbNail}</Text>
          <Image style={styles.imageThumb} source={require(props.thumbNail)} />
'../images/Christy-100px.jpg'
        <Text>{props.Description}</Text>
 - {props.Description}

class FlatListItem extends Component {
  componentWillMount() {
    console.warn('Inside FlatListItem ...');
    console.log(this.props);
  }

  render() {
    return (
      <View>
        <Text>Hi {this.props.catName} - {this.props.catDescription}</Text>
      </View>
    );
  }
}

*/
