// ... later (uses thunk - import firebase from 'firebase';

//import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import {
  ADD_EMOJI,
  CLEAR_EMOJI,
  SORT_EMOJIS,
  PURGE_EMOJIS,
  UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI,
  EMOJIS_STORAGE_KEY, 
  SAVE_EMOJIS_SUCCESS,   // ... not really needed - just being thorough ...
  //SAVE_EMOJIS_FAILURE,   // ... not used right now as AsyncStorage does not return error ...
  LOAD_EMOJIS_SUCCESS,    // ... gets the current emojis database ( AsyncStorage / Cloud Storage )
  //LOAD_EMOJIS_FAILURE    // ... reports an error condition to the store / user )
} from './actionTypes';

export const addEmoji = (key, emoji, name) => {
  return {
    type: ADD_EMOJI,
    payload: { key, emoji, name }
  };
};

export const currentEmoji = (emoji, name) => {
  return {
    type: CURRENT_EMOJI,
    payload: { emoji, name }
  };
};

export const clearEmoji = () => {
  return {
    type: CLEAR_EMOJI
  };
};

export const updateEmoji = (key, selected, numUsed) => {
  return {
    type: UPDATE_EMOJI,
    payload: { key, selected, numUsed }
  };
};

export const removeEmoji = (key) => {
  return {
    type: REMOVE_EMOJI,
    payload: { key }
  };
};

/*
return dispatch => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myEmojis))
      .then(console.log('Saved these Emojis', myEmojis))
      .catch((error) => {
        console.log('Error - Failed to save name.', error);
        //dispatch({ ... NEVER DID GET THIS TO WORK RELIABLY ...
        //  type: SAVE_EMOJIS_FAILURE,
        //  payload: error
        //});
      });
*/

export const emojiLoadSuccess = (jsonData) => {
  return {
    type: LOAD_EMOJIS_SUCCESS,
    payload: { emojis: jsonData }
  };
};

export const emojiSaveSuccess = () => {
  return {
    type: SAVE_EMOJIS_SUCCESS
  };
};

//  clearPosts: () => async (dispatch, getState) => {
//    if (getState().posts.length > 0) {
//      dispatch({type: types.CLEAR_POSTS})
//    }
//  }
//  return (dispatch) => {

export const loadMyEmojis = () => {
  return dispatch => {
    AsyncStorage.getItem(EMOJIS_STORAGE_KEY, (errorMsg, jsonData) => {
      if (jsonData !== null) dispatch(emojiLoadSuccess(JSON.parse(jsonData)));
    });
  };
};

export const saveMyEmojis = (myEmojis) => {
  return dispatch => {
    AsyncStorage.setItem(EMOJIS_STORAGE_KEY, JSON.stringify(myEmojis), (errorMsg, result) => {
      console.log('SAVED! but result is bogus: ', result, '*** Error: ', errorMsg);
      // ... here result is normally undefinded and error is null (very strange) ...
      dispatch(emojiSaveSuccess());
    });
  };
};

export const sortMyEmojis = () => {
  return {
    type: SORT_EMOJIS
  };
};

export const deleteMyEmojis = () => {
  return {
    type: PURGE_EMOJIS
  };
};

/*

-------------------------------------------------------------------------------------------------

Actions

An action MUST
be a plain JavaScript object.
have a type property.

An action MAY
have an error property.
have a payload property.
have a meta property.

An action MUST NOT include properties other than type, payload, error, and meta.

type
The type of an action identifies to the consumer the nature of the action that has occurred. 
type is a string constant. If two types are the same, 
they MUST be strictly equivalent (using ===).

payload
The optional payload property MAY be any type of value. It represents the payload of the action. 
Any information about the action that is not the type or status of the action should be part 
of the payload field.

By convention, if error is true, the payload SHOULD be an error object. 
This is akin to rejecting a promise with an error object.

error
The optional error property MAY be set to true if the action represents an error.

An action whose error is true is analogous to a rejected Promise. 
By convention, the payload SHOULD be an error object.

If error has any other value besides true, including undefined and null, 
the action MUST NOT be interpreted as an error.

meta
The optional meta property MAY be any type of value. It is intended for any 
extra information that is not part of the payload.

-------------------------------------------------------------------------------------------------

export const loadInitialContacts = () => { 
  const { currentUser } = firebase.auth();
  console.log('inside loadInitialContacts - user is:');
  console.log(currentUser);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .on('value', snapshot => {
        dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() });
    });
  };
};

-------------------------------------------------------------------------------------------------

*/
