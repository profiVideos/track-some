import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import splashImage from '../images/login-splash-screen-1080w.jpg';

//import loadMainTabs from './loadMainTabs';

class Login extends Component {
  
  loginHandler = () => {
      alert("Pressed the button")
      //loadMainTabs();
  }

  render () {
    return (
      <ImageBackground source={splashImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.text}>Login Screen</Text>
          <Button title="Login" onPress={this.loginHandler}/>
        </View>
      </ImageBackground>
    );
  }

}

styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#f2f2f2',
    margin: 10,
    padding: 12
  }
});

export default Login;