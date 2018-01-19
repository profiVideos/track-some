import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

//import Login from './src/screens/Login';
import BuildCard from './src/screens/BuildCard';
import ShowCard from './src/screens/ShowCard';
import EditCategories from './src/screens/EditCategories';
//import EmojiPicker from './src/screens/CreateJSONSortedEmojisFile';
import TrackSomeConfig from './src/screens/drawers/SlideMenu';
import EmojiPicker from './src/screens/EmojiPicker';
import OpenMainTabs from './src/screens/OpenMainTabs';
import loadStoreConfig from './src/store/loadStoreConfig';

const store = loadStoreConfig();
console.disableYellowBox = true;

// ... register screens ...
//Navigation.registerComponent('tracksome.Login', () => Login, 
//  store, Provider);
Navigation.registerComponent('tracksome.BuildCard', () => BuildCard, 
  store, Provider);
Navigation.registerComponent('tracksome.ShowCard', () => ShowCard, 
  store, Provider);
Navigation.registerComponent('tracksome.EditCategories', () => EditCategories, 
  store, Provider);
Navigation.registerComponent('tracksome.EmojiPicker', () => EmojiPicker, 
  store, Provider);
Navigation.registerComponent('tracksome.ConfigMenu', () => TrackSomeConfig, 
  store, Provider);

OpenMainTabs();

/*

You can load all your data during the splash screen and then load the 
other screens after that. I did it like this. Hope it helps


    render() {
        if (this.state.isLoading) {
            return <SplashScreen/>;
        }
        return (
            <Provider store={this.state.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }

----------------------------------------------------------------------------------------

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

*/
