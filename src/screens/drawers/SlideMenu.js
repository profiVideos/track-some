import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text,
  //Image,
  //Alert,
  Switch,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions
  //AsyncStorage 
  //ImageBackground 
} from 'react-native';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import profiGraphicsLogo from '../../images/profiGraphics-logo-257w.png';
//import menuBackgroundImage from '../../images/menu-Background-850w.jpg';
//import AppColors from '../../templates/appColors';
/*
import { 
  setSaveMode, 
  saveMyEmojis, 
  loadMyEmojis, 
  emojiLoadSuccess
} from '../../store/actions';
*/

import {
  loadMyEmojis,
  saveMyEmojis
} from '../../store/actions';

//import { EMOJIS_STORAGE_KEY } from '../../store/actions/actionTypes';

const whatDoYouNeed = state => {
  return {
    login: state.login,
    myEmojis: state.emojis.myEmojis
  };
};

//const EMOJIS_STORAGE_KEY = '@track!some:my_emojis';

//    dispatch(actionCreators.fetchPosts())
//    loadSuccess: (jsonData) => dispatch(emojiLoadSuccess(jsonData)),
/*
const whatShouldIDo = dispatch => {
  return {
    setNewSaveMode: (newSaveMode) => dispatch(setSaveMode(newSaveMode)),
    saveAllEmojis: (myEmojis) => saveMyEmojis(myEmojis),
    loadAllEmojis: (msg) => loadMyEmojis(msg),
  };
};
*/

class TrackSomeConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      loggedIn: false,
      scrWidth: Dimensions.get('window').width,
      scrHeight: Dimensions.get('window').height,
      viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
    };
  }
  
  componentDidMount() {
    console.log('Slide Menu Props: ', this.props);
    //Dimensions.addEventListener('change', () => {
    //  this.setState({
    //    scrWidth: Dimensions.get('window').width,
    //    scrHeight: Dimensions.get('window').height,
    //    viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
    //      ? 'portrait' : 'landscape'
    //  });
    //});
  }

  handleSaveMode(newMode) {
    console.log(newMode);
    //this.props.setNewSaveMode((newMode ? 'local' : 'none'));
  }

//---------------------------
//Linking.openURL('mailto:example@gmail.com&subject=example&body=example')
//----------------------------
/*
  renderBackupControls() {
    return (
      <View>
        <
      </View>
    );
  }
*/

  render() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.container}>

            <Text style={styles.title}>Configuration Settings</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>User successfully logged in</Text>
              <Switch 
                onValueChange={(value) => this.setState({ loggedIn: value })}
                value={this.state.loggedIn} 
              /> 
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Save information locally</Text>
              <Switch 
                onValueChange={(value) => this.handleSaveMode(value)} 
                value={(this.props.login.saveMode === 'local' || 
                        this.props.login.saveMode === 'cloud')} 
              /> 
            </View>
            <View style={styles.optionRow}>
              <View style={styles.infoColumns}>
                <Text style={styles.optionText}>Save information in Cloud</Text>
                <Text style={styles.explainText}>
                  An active internet connection is required for this functionality.
                  (also a paid customer)
                </Text>
              </View>
              <Switch 
                onValueChange={(value) => this.setState({ toggled: value })} 
                value={this.state.toggled} 
                //value={(this.props.saveMode === 'none')} 
              /> 
            </View>
            <View style={styles.optionRow}>
              <Text>More config options here!</Text>
            </View>
          </View>
        </ScrollView>
    );
  }

}

export default connect(whatDoYouNeed)(TrackSomeConfig);

//export default connect(whatDoYouNeed, whatShouldIDo)(TrackSomeConfig);
/*
      <ImageBackground 
        source={menuBackgroundImage} 
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: 'cover' }}
      >
      </ImageBackground>

          <View style={styles.logoContainer}>
            <Image 
              source={profiGraphicsLogo} 
              imageStyle={this.state.viewMode === 'portrait' ? styles.portrait : styles.landscape} 
            />
          </View>

export default connect(whatDoYouNeed, whatShouldIDo)(Configurator);

const mapStateToProps = state => {
  return {
    saveData: getSaveMode()
  };
};


ACTION IS;
export const getSaveMode = () => {
  return {
    type: GET_SAVE_MODE
  };
};

<imagebackground source="{require" ('..="" images="" images.jpg')}="" 
  style="{styles.backgroundImage}">
<keyboardavoidingview behavior="padding" 
  style="{styles.container}" contentcontainerstyle="{styles.content}">
......
</keyboardavoidingview>
</imagebackground>

<CustomCachedImage
    component={ImageBackground}
    source={{ uri: 'http://loremflickr.com/640/480/dog' }} 
/>

*/


/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({

  backgroundImage: {
   flex: 1,
   position: 'absolute',
   resizeMode: 'cover',
   width: viewportWidth,
   height: viewportHeight,
   backgroundColor: 'transparent',
   justifyContent: 'center',
   alignItems: 'center'
  },

*/

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: null,
    height: null
  },
  container: {
    flex: 1,
    marginTop: '70%',
    marginBottom: 25,
    padding: 12,
  },
  title: {
    color: '#f2f2f2',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '700',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
  },
  optionRow: {
    flex: 1,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'   // ... top to bottom ...
  },
  infoColumns: {
    width: '80%',
    flexDirection: 'column'
  },
  explainText: {
    fontStyle: 'italic',
    marginTop: -3
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  portrait: {
    width: 180,
    height: 38
  },
  landscape: {
    width: 180,
    height: 38
  },
  logoContainer: {
    alignItems: 'center'
  }
});
