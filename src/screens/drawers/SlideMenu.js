import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions, 
  ImageBackground } from 'react-native';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import profiGraphicsLogo from '../../images/profiGraphics-logo-684w.png';
import menuBackgroundImage from '../../images/menu-backdrop-screen-1080w.jpg';
import AppColors from '../../templates/appColors';
//import OpenMainTabs from './OpenMainTabs';

export default class Configurator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
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

  render() {
    return (
      <ImageBackground source={menuBackgroundImage} style={styles.backgroundImage}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image 
              source={profiGraphicsLogo} 
              style={this.state.viewMode === 'portrait' ? 
                styles.logoPortrait : styles.logoLandscape} 
            />
            <Text style={styles.title}>Login / Signup</Text>
          </View>
          <View style={styles.container}>
            <Text>Welcome to my party!</Text>  
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

}

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
  container: {
    flex: 3,
    marginBottom: 25,
    alignItems: 'center'
  },
  text: {
    color: '#f2f2f2',
    margin: 20,
    textAlign: 'center'
  },
  input: {
    color: '#111111',
    width: '80%'
  },
  backgroundImage: {
    flex: 1
  },
  buttonRow: {
    flex: 1,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonContainerStyle: {
    flex: 1,
    borderRadius: 5,
    alignItems: 'center'
  },
  funStyle: {
    backgroundColor: AppColors.accentColor
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: '#f2f2f2',
    fontSize: 20,
    fontWeight: '700',
    shadowColor: '#121212',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.85,
    elevation: 2,
  },
  logoPortrait: {
    marginTop: 20,
    width: 218,
    height: 197
  },
  logoLandscape: {
    marginTop: 5,
    width: 132,
    height: 120
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center'
  }
});

/*
          <Switch 
            onValueChange={ (value) => this.setState({ toggled: value })} 
            value={ this.state.toggled } 
          /> 
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
*/
