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
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  CONNECTION_STATE,
  BACKUP_SYNC_START,
  BACKUP_SYNC_FINISH,
  LOGIN_USER_SUCCESS,
    //SET_SAVE_MODE
} from './actionTypes';
import realmDB from '../../store';   // ... Realm DB Routines ...
import { RestoreMainFiles } from '../../components/SyncDataFiles';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

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

export const startBackupSync = () => {
  return {
    type: BACKUP_SYNC_START 
  };
};

export const finishBackupSync = () => {
  return {
    type: BACKUP_SYNC_FINISH
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
      return 'The account with this email address has been disabled.  Please contact support.';
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

// ... firebase auth:export photo-drops-users.json

export const subscribeUser = (email, password, username) => {
  return dispatch => {
    dispatch(loginStart());
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      firebase.auth().currentUser.updateProfile({ displayName: username });
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        ToastAndroid.show(`Email sent to: ${email}`, ToastAndroid.LONG);
        // ... add this users details to the firestore database ...
        const userData = firebase.firestore().collection('users');
        userData.doc(user.uid).set({
          userid: user.uid,
          email,
          nickname: username,
          phone: user.phoneNumber,
          signup: user.providerId,
          photoURI: user.photoURL,
          lastSync: null,
          created: user.metadata.creationTime
        });
        //ToastAndroid.show(`User: ${JSON.stringify(user)}`, ToastAndroid.LONG);
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

const gotCloudUserData = (cloudData, dispatch) => {
  //ToastAndroid.show(`inside gotCloudUserData: ${cloudData.lastSync}`, ToastAndroid.LONG);
  //-------------------------------------------------
  // ... compare last cloud sync with local sync ...
  // ... & see if we need to do a database sync ...
  //-------------------------------------------------
  const userConfig = realmDB.getUserConfig(cloudData.userid);
  //ToastAndroid.show(`Cloud Sync: ${cloudData.lastSync}\nLocal Sync: ${userConfig.lastSync}`, 
  //  ToastAndroid.LONG);
  if (userConfig.lastSync === null && cloudData.lastSync !== null) {
    dispatch(startBackupSync());
    RestoreMainFiles(cloudData.userid, dispatch, false);
    //ToastAndroid.show(`Need to download data: ${cloudData.lastSync}`, ToastAndroid.SHORT);
  } else if (userConfig.lastSync < cloudData.lastSync) {
    dispatch(startBackupSync());
    RestoreMainFiles(cloudData.userid, dispatch, false);
  }
};

export const requestCloudUserData = (userData, dispatch) => {
  firebase.firestore().collection('users').doc(userData.uid).get()
  .then((documentSnapshot) => {
    gotCloudUserData(documentSnapshot.data(), dispatch);
  });
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => { 
      requestCloudUserData(user, dispatch); 
      dispatch(loginUserOK(user));
    })
    .catch(error => {
      const { code, message } = error;
      const myMessage = translateErrorMessage(code, message);
      dispatch(loginUserFail(code, myMessage));
    });
  };
};

export const connectionState = (isOnline) => {
  return {
    type: CONNECTION_STATE, 
    payload: isOnline
  };
};

export const setUserLogin = (user) => {
  if (user !== null) { 
    const userConfig = realmDB.getUserConfig(user.uid);
    //ToastAndroid.show(`inside setUserLogin: ${JSON.stringify(userConfig)}`, ToastAndroid.LONG);
    // ... if no user config data - create it ...
    if (userConfig === undefined) {
      realmDB.addUserConfig(user);
      ToastAndroid.show('Config created', ToastAndroid.SHORT);
    }
  }
  return {
    type: LOGIN_USER, 
    payload: user
  };
};

export const checkUserStatus = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(setUserLogin(user));
    });
  };
};

export const appInitialize = () => {
  return dispatch => {
    dispatch(checkUserStatus());    // ... checks if this user is logged in ...
    // ... other initialization code here ...
  };
};

/*
    //ToastAndroid.show(`inside setUserLogin: ${JSON.stringify(user)}`, ToastAndroid.LONG);

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
