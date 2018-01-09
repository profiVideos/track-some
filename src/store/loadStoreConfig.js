import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers';
//const store = createStore(rootReducer, composeEnhancers());

// ... define / load our store, reducers and enhancers ...
const configureStore = () => {
  return createStore(rootReducer, devToolsEnhancer());
};

export default configureStore;
