import { Navigation } from 'react-native-navigation';

import Login from './src/screens/Login';
import BuildThumbnails from './src/screens/BuildThumbs';
import ShowThumbnails from './src/screens/ShowThumbs';

console.disableYellowBox = true;

// ... register screens ...
Navigation.registerComponent('tracksome.Login', () => Login);
Navigation.registerComponent('tracksome.BuildThumbnails', () => BuildThumbnails);
Navigation.registerComponent('tracksome.ShowThumbnails', () => ShowThumbnails);

// ... start a Navigation App ...
Navigation.startSingleScreenApp({
  screen: {
    screen: 'tracksome.Login',
    title: 'track!some',
    navigatorStyle: {
      navBarHidden: true,
      statusBarHidden: true,
      screenBackgroundColor: '#222222'
    }
  },
  animationType: 'fade'
});
