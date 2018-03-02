//import React from 'react';
import { AppRegistry } from 'react-native';
//import { App } from 'react-native';
//import { Provider } from 'react-redux';
import App from './App';
//import loadStoreConfig from './src/store/loadStoreConfig';

//const store = loadStoreConfig();

//const TSRedux = () => (
//  <Provider store={store}>
//    <App />
//  </Provider>
//);
const photoDrops = new App();
//trackSome();
AppRegistry.registerComponent('photoDrops', () => photoDrops);
