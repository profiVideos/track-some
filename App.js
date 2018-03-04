import React from 'react';
import thunk from 'redux-thunk';
import { ToastAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RegisterScreens from './src/screens/DefineMainScreens.js';
import MainReducer from './src/store/reducers';
import OpenMainTabs from './src/screens/OpenMainTabs';
import {
  appLogin,
  appInitialize
} from './src/store/actions';

//----------------------------------------------------------------
// ... collect all components to build our really "HOT" store ...
//----------------------------------------------------------------
const store = createStore(MainReducer, composeWithDevTools(applyMiddleware(thunk)));
RegisterScreens(store, Provider);

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //this.startApp('mainApp');
    //store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appInitialize());
    this.startApp('mainApp');
  }

 componentDidMount() {
    ToastAndroid.show('Inside componentDidMount', ToastAndroid.SHORT);
    /*
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
    */
  }

  onStoreUpdate() {
    ToastAndroid.show('Inside onStoreUpdate', ToastAndroid.SHORT);
    const nextApp = store.getState().root.currentApp;
    //ToastAndroid.show(`nextApp is ${nextApp}`, ToastAndroid.SHORT);
    if (this.currentApp !== nextApp || this.currentApp === undefined) {
      this.currentApp = nextApp;
      this.startApp(nextApp);
    }
  }

  startApp(nextApp) {
    switch (nextApp) {

      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'tracksome.MainLogin',
            title: 'photoDrops',
            navigatorStyle: {
              navBarHidden: true,
              statusBarHidden: true,
              //screenBackgroundColor: '#222222'
              screenBackgroundColor: '#e2e2e2'
            }
          },
          animationType: 'fade'
        });
        return;

      case 'mainApp':
        OpenMainTabs();
        return;
  
      default: //no root found
        console.log('No Root Found');

    }
  }
}
