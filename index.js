import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import loadStoreConfig from './src/store/loadStoreConfig';

const store = loadStoreConfig();

const TSRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('tracksome', () => TSRedux);
