import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Ionicons';
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

const OpenMainTabs = () => {
    Promise.all([
        getImageSource('md-thumbs-up', 30),    // ... emojis ...
        getImageSource('logo-buffer', 30),    // ... categories ...
        getImageSource('md-paper', 30),       // ... build card ...
        getImageSource('ios-desktop', 30)     // ... show card ...
    ]).then(sources => {
        Navigation.startTabBasedApp({
          appStyle: {
            keepStyleAcrossPush: false,
            tabBarBackgroundColor: AppColors.darkerColor,
            tabBarButtonColor: AppColors.accentColor,
            tabBarSelectedButtonColor: AppColors.hiliteColor,
            tabBarTranslucent: false,
          },
          tabs: [
            {
              screen: 'tracksome.EmojiPicker',
              label: 'Emojis',
              title: 'Select an Emoji',
              icon: sources[0],
              rightButtons: [
                {
                  title: 'Close', // for a textual button, provide the button title (label)
                  //icon: require('../../img/navicon_add.png'), // local image asset name
                  id: 'close', // id for this button, given help understand which button was clicked
                  buttonFontSize: 14, // Set font size for the button (
                  buttonFontWeight: '600' // Set font weight for the button 
                }
              ]
            },
            {
              screen: 'tracksome.EditCategories',
              label: 'Categories',
              title: 'Maintain Categories',
              icon: sources[1]
            },
            {
              screen: 'tracksome.BuildCard',
              label: 'Build Card',
              title: 'New Card',
              icon: sources[2]
            },
            {
              screen: 'tracksome.ShowCard',
              label: 'Show Card',
              title: 'Show Card',
              icon: sources[3]
            }
          ],
          tabsStyle: {
              tabBarButtonColor: 'orange'
            },
          passProps: {},            
          animationType: 'fade'
        });
    });
};

export default OpenMainTabs;
