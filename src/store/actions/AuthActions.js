import { Alert } from 'react-native';
import { 
  ROOT_CHANGED,
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  //LOGIN_USER_SUCCESS,
  //LOGIN_USER_FAIL,
  //LOGIN_USER,
  SET_SAVE_MODE
} from './actionTypes';

export const changeApp = (nextApp) => {
  return {
    type: ROOT_CHANGED, 
    payload: nextApp
  };
};

export const appInitialize = () => {
  return dispatch => {
    //Alert.alert('We are in appInitilize ...');
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    //dispatch(changeApp('login'));
    dispatch(changeApp('mainApp'));
  };
};

export const login = () => {
  return dispatch => {
    //Alert.alert('We are in login ...');
    // login logic would go here, and when it's done, we switch app roots
    dispatch(changeApp('mainApp'));
  };
}
