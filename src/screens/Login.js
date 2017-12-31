import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Button, 
  Image,
  StyleSheet,
  Dimensions, 
  ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import tracksomeLogo from '../images/tracksome-logo-684w.png';
import splashBackgroundImage from '../images/login-splash-screen-1080w.jpg';

//import loadMainTabs from './loadMainTabs';

class Login extends Component {
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
    scrWidth: Dimensions.get('window').width,
    scrHeight: Dimensions.get('window').height,
    viewMode: this.scrHeight > this.scrWidth ? 'portrait' : 'landscape'
  }
  
  loginHandler = () => {
      this.alert('Screen Height:', this.state.scrHeigh, '  Orientation: ', this.state.viewMode);
      //loadMainTabs();
  }

  loginWithFacebook = () => {
      this.alert('Pressed the Facebook button');
      //loadMainTabs();
  }

  render() {
    return (
      <ImageBackground source={splashBackgroundImage} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image 
            source={tracksomeLogo} 
            style={this.state.viewMode === 'portrait' ? styles.logoPortrait : styles.logoLandscape} 
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Login Screen</Text>
          <Button title="Login" onPress={this.loginHandler} />
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>
        </View>
      </ImageBackground>
    );
  }

}

/*
          <Switch 
            onValueChange={ (value) => this.setState({ toggled: value })} 
            value={ this.state.toggled } 
          /> 
*/

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1
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
  },
  container: {
    flex: 3,
    alignItems: 'center'
  },
  text: {
    color: '#f2f2f2',
    margin: 10
  }
});

export default Login;
