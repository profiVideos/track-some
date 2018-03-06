import { ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { 
  LOGIN_USER,
  LOGIN_START,
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

export const loginStart = () => {
  return {
    type: LOGIN_START 
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
    case 'auth/user-disabled':
      return 'The account associated with this email address has been disabled.  Please contact support.';
    case 'auth/invalid-email':
      return 'The email address entered is not valid.';
    case 'auth/wrong-password':
      return 'The password entered does not match the one on file.';
    case 'auth/user-not-found':
      return 'The account associated with this email address could not be found.';
    case 'auth/email-already-in-use':
    default: 
      return message;
  }
};

export const subscribeUser = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      // ... send user verification email & do anything else here with user info ...
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        ToastAndroid.show(`Email sent to: ${email}`, ToastAndroid.LONG);
        dispatch(loginUserOK(user));
      })
      .catch(error => {
        const { code, message } = error;
        const myMessage = translateErrorMessage(code, message);
        dispatch(loginUserFail(code, myMessage));
      });
    })
    .catch(error => {
      const { code, message } = error;
      const myMessage = translateErrorMessage(code, message);
      dispatch(loginUserFail(code, myMessage));
    });
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(loginUserOK(user));
      // If you need to do anything with the user, do it here
    })
    .catch(error => {
      const { code, message } = error;
      const myMessage = translateErrorMessage(code, message);
      dispatch(loginUserFail(code, myMessage));
    });
  };
};

export const checkUserStatus = () => {
  //ToastAndroid.show('inside checkUserStatus', ToastAndroid.SHORT);
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
