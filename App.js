import { Navigation } from 'react-native-navigation';

import Login from './src/screens/Login';
import BuildCard from './src/screens/BuildCard';
import ShowCard from './src/screens/ShowCard';

console.disableYellowBox = true;

// ... register screens ...
Navigation.registerComponent('tracksome.Login', () => Login);
Navigation.registerComponent('tracksome.BuildCard', () => BuildCard);
Navigation.registerComponent('tracksome.ShowCard', () => ShowCard);

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
