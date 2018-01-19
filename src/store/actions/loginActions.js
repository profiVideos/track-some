//import firebase from 'firebase';

import { 
  ROOT_CHANGED,
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  //LOGIN_USER_SUCCESS,
  //LOGIN_USER_FAIL,
  //LOGIN_USER,
  SET_SAVE_MODE
} from './actionTypes';

export const changeAppRoot = (root) => {
  return {
    type: ROOT_CHANGED, 
    root
  };
};

/*
dispatch(async (dispatch, getState) => {
  const data = await networkReq();
  return { type: 'NEW_DATA', payload: data }
});
*/
/*
export const appInitialized = () => {
  return async = (dispatch, getState) => {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('login'));
  };
};
*/
/*
export function login() {
  return async function(dispatch, getState) {
    // login logic would go here, and when it's done, we switch app roots
    dispatch(changeAppRoot('mainApp'));
  };
}
*/

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const setSaveMode = (mode) => {
  return {
    type: SET_SAVE_MODE,
    payload: mode
  };
};

/*

export function fetchProfile() {
  return dispatch => {
    dispatch({
      type: types.FETCH_PROFILE_REQUEST
    });
    AsyncStorage.getItem('@myapp:profile')
      .then((profileString) => {
        dispatch({
          type: types.FETCH_PROFILE_SUCCESS,
          data: profileString ? JSON.parse(profileString) :  {}
        });
      })
      .catch(error => {
        dispatch({
          type: types.FETCH_PROFILE_ERROR,
          error
        });
      });
  };
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });  // ... starts the spinner ...
    /*
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
    loginUserSuccess(dispatch);      
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};

*/
