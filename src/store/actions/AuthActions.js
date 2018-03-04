import { ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { 
  LOGIN_USER,
  ROOT_CHANGED,
  EMAIL_CHANGED, 
  LOGOUT_USER_OK,
  LOGIN_USER_FAIL,
  LOGIN_ERROR_MSG,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
    //SET_SAVE_MODE
} from './actionTypes';

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const changeApp = (nextApp) => {
  return {
    type: ROOT_CHANGED, 
    payload: nextApp
  };
};

export const loginUserFail = (errCode, errMsg) => {
  return {
    type: LOGIN_USER_FAIL, 
    payload: {
      code: errCode,
      message: errMsg
    }
  };
};

export const loginUserOK = (user) => {
  return {
    type: LOGIN_USER_SUCCESS, 
    payload: user
  };
};

export const logoutUserOK = (nullCode) => {
  return {
    type: LOGOUT_USER_OK, 
    payload: nullCode
  };
};

export const setUserLogin = (user) => {
  //ToastAndroid.show(`inside loginUser: ${user}`, ToastAndroid.LONG);
  return {
    type: LOGIN_USER, 
    payload: user
  };
};

export const loginErrorMessage = (message) => {
  return {
    type: LOGIN_ERROR_MSG, 
    payload: message
  };
};

export const logoutUser = () => {
  return dispatch => {
    firebase.auth().signOut();
    dispatch(logoutUserOK(null));
  };
};

const translateErrorMessage = (code, message) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'The password entered does not match the one on file.';
    default: 
      return message;
  }
};

export const loginUser = (email, password) => {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(loginUserOK(user));
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the 
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      const myMessage = translateErrorMessage(code, message);
      dispatch(loginUserFail(code, myMessage));
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  };
};

export const checkUserStatus = () => {
  ToastAndroid.show('inside checkUserStatus', ToastAndroid.SHORT);
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(setUserLogin(user));
      //dispatch(changeApp('mainApp'));
      //if (user === null) dispatch(changeApp('login'));
      //else dispatch(changeApp('mainApp'));
    });
  };
};

export const appInitialize = () => {
  return dispatch => {
    //ToastAndroid.show('We are in appInitialize', ToastAndroid.SHORT);
    dispatch(checkUserStatus());    // ... checks if this user is logged in ...
    // ... other initialization code here ...
  };
};

/*
export const appLogin = () => {
  return dispatch => {
    ToastAndroid.show('We are in appLogin', ToastAndroid.SHORT);
    //Alert.alert('We are in login ...');
    //ToastAndroid.show(`This store is ${nextApp}`, ToastAndroid.LONG);
    // login logic would go here, and when it's done, we switch app roots
    dispatch(changeApp('mainApp'));
  };
};
*/
