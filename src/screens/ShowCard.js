import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import AppColors from '../templates/appColors';

/*
const AppColors = {
  paperColor: '#e2e2e2',      // ... off white ...
  hiliteColor: '#fff8b2',     // ... light yellow ...
  accentColor: '#dea140',     // ... medium orange ...
  mainLiteColor: '#a32b26',   // ... medium red ...
  mainDarkColor: '#590d0b',   // ... dark red (burgundy) ...
  darkerColor: '#325a66'      // ... dark cyan ....
*/

const whatDoYouNeed = state => {
  return {
    saveMode: state.login.saveMode,
    emojiCode: state.emojis.emojiCode,
    emojiName: state.emojis.emojiName,
    listUpdated: state.emojis.emojisUpdated,
    myEmojis: state.emojis.myEmojis
  };
};

class ShowCard extends Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    navBarBackgroundColor: AppColors.accentColor,
    navBarTranslucent: false
  };

  componentDidMount() {
    console.log('Show Card Props: ', this.props);
    //Dimensions.addEventListener('change', () => {
    //  this.setState({
    //    scrWidth: Dimensions.get('window').width,
    //    scrHeight: Dimensions.get('window').height,
    //    viewMode: Dimensions.get('window').height > Dimensions.get('window').width 
    //      ? 'portrait' : 'landscape'
    //  });
    //});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Inside Show Card</Text>
      </View>
    );
  }

}

export default connect(whatDoYouNeed)(ShowCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 25,
    alignItems: 'center'
  },
  text: {
    color: '#f2f2f2',
    margin: 20,
    textAlign: 'center'
  }
});
