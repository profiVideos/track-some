//import Immutable from 'seamless-immutable';
//import { Alert } from 'react-native';
import * as types from '../actions/actionTypes';

const initialState = {
  currentApp: null   // 'login' / 'mainApp'
};

// ... the App root reducer ...
const RootReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case types.ROOT_CHANGED:
      //Alert.alert('root changed:' + action.payload);
      return {
        ...state, 
        currentApp: action.payload
      };

    default:
      return state;
  }
};

export default RootReducer;
