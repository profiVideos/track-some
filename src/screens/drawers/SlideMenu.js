import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text,
  Image,
  Alert,
  Switch,
  ScrollView,
  StyleSheet,
  Dimensions, 
  ImageBackground } from 'react-native';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import profiGraphicsLogo from '../../images/profiGraphics-logo-257w.png';
import menuBackgroundImage from '../../images/menu-Background-850w.jpg';
import AppColors from '../../templates/appColors';
import MDButton from '../../components/common/mdButton';
import { setSaveMode } from '../../store/actions';

class Configurator extends Component {
  static navigatorStyle = {
    tabBarHidden: true,   // ... we need space for the emojis ...
    navBarHidden: true,
    //drawUnderNavBar: true,
    screenBackgroundColor: AppColors.paperColor,
    //navBarTextColor: AppColors.mainLiteColor,
    //navBarBackgroundColor: AppColors.hiliteColor,
    //navBarTranslucent: true
  }

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
  
  componentWillMount() {
    //OpenMainTabs();
  }
  
  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        scrWidth: Dimensions.get('window').width,
        scrHeight: Dimensions.get('window').height,
        viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
          ? 'portrait' : 'landscape'
      });
    });
  }

  componentDidUpdate() {
    //console.log('New Props: ', this.props);
  }

  loginHandler = () => {
    //Alert.alert('Pressed the Login button');
    //Alert.alert('Screen Height:' + this.state.scrHeight + '  Orientation: ' + 
    //  this.state.viewMode);
  }

  signupHandler = () => {
    Alert.alert('Pressed the Signup button');
    //Alert.alert('Screen Height:' + this.state.scrHeight + '  Orientation: ' + 
    //  this.state.viewMode);
    //OpenMainTabs();
  }

  handleTextChange(text) {
    this.setState({ emailAddr: text });
    console.log(this.state.emailAddr);
  }

  handleSaveMode(newMode) {
    this.props.setNewSaveMode((newMode ? 'local' : 'none'));
  }

  render() {
    return (
      <ImageBackground source={menuBackgroundImage} style={styles.backgroundImage}>
        <ScrollView style={{ flex: 1 }}>
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
                //value={this.state.toggled} 
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
              <MDButton
                iconSize={32} iconColor='white' iconName='mood' 
                textLabel='Save Emojis'
                //onPress={this.onEmojiSelect} 
              />
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image 
              source={profiGraphicsLogo} 
              style={this.state.viewMode === 'portrait' ? 
                styles.logoPortrait : styles.logoLandscape} 
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

}

/*

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

*/

const whatDoYouNeed = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNewSaveMode: (newSaveMode) => dispatch(setSaveMode(newSaveMode)),
  };
};

export default connect(whatDoYouNeed, mapDispatchToProps)(Configurator);

/*
            style={styles.input}
            label='Email'
            placeholder='Your Email Address'
            value={this.state.emailAddr}
            maxLength={20}
            error='You must enter a valid eMail-Address!'
            onChangeText={emailAddr => this.setState({ emailAddr })}
*/

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: '70%',
    marginBottom: 25,
    padding: 12,
  },
  title: {
    color: '#f2f2f2',
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
  },
  optionRow: {
    flex: 1,
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
  logoPortrait: {
    marginTop: 20,
    width: 180,
    height: 38
  },
  logoLandscape: {
    marginTop: 5,
    width: 100,
    height: 45
  },
  logoContainer: {
    alignItems: 'center'
  }
});

/*
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
*/
