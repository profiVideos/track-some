import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  //Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
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

const touchableOpacityProps = {
  activeOpacity: 0.6,
};

const touchableHighlightProps = {
  activeOpacity: 0.5,
  underlayColor: 'green',
};

const getDisplayName = Component => (
  Component.displayName ||
  Component.name ||
  (typeof Component === 'string' ? Component : 'Component')
);

class ShowCard extends React.Component {
  static navigatorStyle = {
    drawUnderNavBar: false,
    navBarBackgroundColor: AppColors.accentColor,
    navBarTranslucent: false
  };

  constructor(props) {
    super(props);
    this.state = {
      Touchable: Button
    };
  }

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
    const { Touchable } = this.state;
    const buttonText = 'Select ' + (Touchable ? (getDisplayName(Touchable)) : 'default');
    return (
      <MenuProvider style={{ flexDirection: 'column', padding: 30 }}>
        <View style={styles.container}>

          <Menu onSelect={NewTouchable => this.setState({ Touchable: NewTouchable })}>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: Button,
                triggerTouchable: { title: 'Select (Custom Touchables)' }
              }}
            />
          <MenuOptions>
              <MenuOption text='Default' />
              <MenuOption 
                text='TouchableOpacity' 
                customStyles={{
                  OptionTouchableComponent: TouchableOpacity,
                  optionTouchable: touchableOpacityProps,
                }}
                value={TouchableOpacity}
              />
              <MenuOption 
                text='TouchableHighlight' 
                customStyles={{
                  OptionTouchableComponent: TouchableHighlight,
                  optionTouchable: touchableHighlightProps,
                }}
                value={TouchableHighlight}
              />
              <MenuOption 
                text='TouchableWithoutFeedback' 
                customStyles={{
                  OptionTouchableComponent: TouchableWithoutFeedback,
                }}
                value={TouchableWithoutFeedback}
              />
              <MenuOption 
                customStyles={{
                  OptionTouchableComponent: Button,
                  optionTouchable: { title: 'Button' }
                }}
                value={Button}
              />
            </MenuOptions>
          </Menu>

          <Menu style={{ paddingTop: 30 }}>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: Touchable,
                triggerTouchable: { title: buttonText }
              }}
              text={buttonText}
            />
            <MenuOptions 
              customStyles={{
                OptionTouchableComponent: TouchableOpacity,
                optionTouchable: touchableOpacityProps,
              }}
            >
              <MenuOption text='Option 1' />
              <MenuOption text='Option 2' />
              <MenuOption text='Option 3' />
              <MenuOption text='Option 4' />
            </MenuOptions>
          </Menu>

        </View>
      </MenuProvider>
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
