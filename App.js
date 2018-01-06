import { Navigation } from 'react-native-navigation';

import Login from './src/screens/Login';
import BuildCard from './src/screens/BuildCard';
import ShowCard from './src/screens/ShowCard';
import EditCategories from './src/screens/EditCategories';
import OpenMainTabs from './src/screens/OpenMainTabs';

console.disableYellowBox = true;

// ... setup our store, reducers and enhancers ...
/*
import { createStore, compose } from 'redux';
import rootReducer from './store/reducers/index';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer, defaultState, enhancers);
*/

// ... register screens ...
Navigation.registerComponent('tracksome.Login', () => Login);
Navigation.registerComponent('tracksome.BuildCard', () => BuildCard);
Navigation.registerComponent('tracksome.ShowCard', () => ShowCard);
Navigation.registerComponent('tracksome.EditCategories', () => EditCategories);

OpenMainTabs();

// ... start a Navigation App ...

/*
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

*/
