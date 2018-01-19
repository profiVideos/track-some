import React from 'react';
import thunk from 'redux-thunk';
//import { Platform, AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { devToolsEnhancer } from 'redux-devtools-extension';
import { composeWithDevTools } from 'redux-devtools-extension';

//import { INITIALIZED, ROOT_CHANGED } from './src/store/actions/actionTypes';

import RegisterScreens from './src/screens/DefineMainScreens.js';
import MainReducer from './src/store/reducers';
import OpenMainTabs from './src/screens/OpenMainTabs';
//import * as appActions from './src/store/actions';

//----------------------------------------------------------------
// ... collect all components to build our really "HOT" store ...
//----------------------------------------------------------------
const store = createStore(MainReducer, composeWithDevTools(applyMiddleware(thunk)));
RegisterScreens(store, Provider);

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startApp('mainApp');
    //console.log(store.getState());
    //store.subscribe(this.onStoreUpdate.bind(this));
    //store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    if (this.currentRoot !== root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {

      case 'login':
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
        return;

      case 'mainApp':
        OpenMainTabs();
        return;
  
      default: //no root found
        console.log('Not Root Found');

    }
  }
}

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

const store = createStore(rootReducer, devToolsEnhancer());
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(MainReducer);

import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
const store = createStore(reducer, preloadedState, devToolsEnhancer(
   Specify name here, actionsBlacklist, actionsCreators and other options if needed
));
import loadStoreConfig from './src/store/loadStoreConfig';
const store = createStore(rootReducer, composeEnhancers());
// ... define / load our store, reducers and enhancers ...
const configureStore = () => {
  return createStore(rootReducer, devToolsEnhancer());
};
export default configureStore;
const store = loadStoreConfig();

*/
