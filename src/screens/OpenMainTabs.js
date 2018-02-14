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
  //console.log('OpenMainTabs: ', props);
    Promise.all([
        getImageSource('md-thumbs-up', 26),         // ... emojis ...
        getImageSource('md-albums', 26),           // ... show cards ...
        getImageSource('md-paper', 26),           // ... lists ...
        getImageSource('logo-buffer', 26),       // ... categories ...
        getImageSource('md-menu', 26),          // ... the menu button ...
        getImageSource('md-more', 26),         // ... the options button ...
        getImageSource('md-bulb', 26),        // ... light bulb = notes ...
        getImageSource('md-search', 26)      // ... magnifying glass = search ...

    ]).then(sources => {
        Navigation.startTabBasedApp({
          tabs: [
            {
              screen: 'tracksome.ShowCards',
              label: 'Show Cards',
              title: 'Show Cards',
              icon: sources[1],
              leftButtons: [{ icon: sources[4], id: 'menu' }],
              rightButtons: [
                { icon: sources[5], id: 'options' },
                { icon: sources[7], id: 'search' },
              ]
            },
            {
              screen: 'tracksome.ShowNotes',
              label: 'Notes',
              title: 'List Notes',
              icon: sources[6],  // ... light bulb ...
              leftButtons: [{ icon: sources[4], id: 'menu' }],
              rightButtons: [
                { icon: sources[5], id: 'options' },
                { icon: sources[7], id: 'search' },
              ],
              animated: true
            },
            {
              screen: 'tracksome.BuildCard',
              label: 'Lists',
              title: 'Choose List',
              icon: sources[2],  // ... paper ...
              leftButtons: [{ icon: sources[4], id: 'menu' }],
              rightButtons: [
                { icon: sources[5], id: 'options' },
                { icon: sources[7], id: 'search' },
              ],
              animated: true
            },
            {
              screen: 'tracksome.EditCategories',
              label: 'Categories',
              title: 'Update Categories',
              icon: sources[3],
              leftButtons: [{ icon: sources[4], id: 'menu' }],
              rightButtons: [
                { icon: sources[5], id: 'options' },
                { icon: sources[7], id: 'search' },
              ]
            },
            {
              screen: 'tracksome.EmojiPicker',
              label: 'Emojis',
              title: 'Search Emojis',
              icon: sources[0],
              leftButtons: [{ icon: sources[4], id: 'menu' }],
              rightButtons: [
                { icon: sources[5], id: 'options' },
                { icon: sources[7], id: 'search' },
              ]
            },
          ],
          drawer: {
            left: {
              screen: 'tracksome.ConfigMenu'   // unique ID you registered
            },
            disableOpenGesture: false // optional, the drawer can be opened with a swipe 
          },
          tabsStyle: {
              tabBarButtonColor: 'orange'
            },
          appStyle: {
            keepStyleAcrossPush: false,
            tabBarBackgroundColor: AppColors.darkerColor,
            tabBarButtonColor: AppColors.accentColor,
            tabBarSelectedButtonColor: AppColors.hiliteColor,
            tabBarTranslucent: false,
          },
          animationType: 'fade'
        });
    });
};

export default OpenMainTabs;

/*            
            {
              screen: 'tracksome.EmojiPicker',
              label: 'Emojis',
              title: 'Select an Emoji',
              icon: sources[0],
              leftButtons: [
                {
                  icon: sources[4],
                  id: 'menu',               // ... to know which button was clicked ...
                  buttonFontSize: 14,      // ... set font size for the button ...
                  buttonFontWeight: '300' // ... set font weight for the button ...
                }
              ],
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
*/            
