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

import { Button } from 'react-native-elements';
import tracksomeLogo from '../images/tracksome-logo-684w.png';
import MDInput from '../components/common/mdInput';
import splashBackgroundImage from '../images/login-splash-screen-1080w.jpg';
import AppColors from '../templates/appColors';
import OpenMainTabs from './OpenMainTabs';

class MainLogin extends Component {
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
    emailAddr: 'markus@profiphotos.com',
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }
  
  componentWillMount() {
    //OpenMainTabs();
  }
  
  loginHandler = () => {
    //Alert.alert('Pressed the Login button');
    //Alert.alert('Screen Height:' + this.state.scrHeight + '  Orientation: ' + 
    //  this.state.viewMode);
    OpenMainTabs();
  }

  signupHandler = () => {
    Alert.alert('Pressed the Signup button');
    //Alert.alert('Screen Height:' + this.state.scrHeight + '  Orientation: ' + 
    //  this.state.viewMode);
    //OpenMainTabs();
  }

  testDriveHandler = () => {
    Alert.alert('Going to the fun part.  Screen Height:' + this.state.scrHeight 
      + '  Orientation: ' + this.state.viewMode);
    //OpenMainTabs();
  }

  loginWithFacebook = () => {
    Alert.alert('Pressed the Facebook button');
    //OpenMainTabs();
  }

  handleTextChange(text) {
    this.setState({ emailAddr: text });
    console.log(this.state.emailAddr);
  }

  render() {
    return (
      <ImageBackground source={splashBackgroundImage} style={styles.backgroundImage}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image 
              source={tracksomeLogo} 
              style={this.state.viewMode === 'portrait' ? 
                styles.logoPortrait : styles.logoLandscape} 
            />
            <Text style={styles.title}>Login / Signup</Text>
          </View>
          <View style={styles.container}>
            <MDInput
              darkInput
              label='Email'
              placeholder='Your Email Address please ... '
              keyboardType='email-address'
              value={this.state.emailAddr}
              onChangeText={value => this.handleTextChange(value)}
              validEmailCheck
            />
            <MDInput 
              darkInput
              label='Password'
              placeholder='Password please (min. 8 chars) ... '
              secureTextEntry
              //value={this.state.password}
            />
            <MDInput 
              darkInput
              label='Confirm Password'
              placeholder='And again please (to verify) ... '
              //secureTextEntry
              //value={this.state.password}
            />
            <View style={styles.buttonRow}>
              <Button style={styles.buttonStyle} title="Login" onPress={this.loginHandler} />
              <Button style={styles.buttonStyle} title="Signup" onPress={this.signupHandler} />
            </View>
            <Text style={styles.text}>
            If you've never signed up before, there are some benefits to doing so.  
            Or you could just take this app for a test drive by clicking the button below.
            </Text>
            <Button
              color={AppColors.mainDarkColor}
              buttonStyle={styles.funStyle}
              containerViewStyle={styles.buttonContainerStyle}
              //icon={{ name: 'envira', type: 'font-awesome' }}
              fontSize={16}
              borderRadius={5}
              fontWeight='700'
              title='Take a Test Drive (no Saving)' 
              onPress={this.testDriveHandler}
              icon={{ name: 'cached' }}
              large
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

}

export default MainLogin;

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
