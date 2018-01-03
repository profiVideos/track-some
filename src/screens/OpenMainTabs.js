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
        getImageSource('md-map', 30),
        getImageSource('ios-share-alt', 30)
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
              screen: 'tracksome.BuildCard',
              label: 'Build Card',
              title: 'New Card',
              icon: sources[0]
            },
            {
              screen: 'tracksome.ShowCard',
              label: 'Show Card',
              title: 'Show Card',
              icon: sources[1]
            }
          ],
          tabsStyle: {
              tabBarButtonColor: '#ff0000'
            },
          animationType: 'fade'
        });
    });
};

export default OpenMainTabs;
