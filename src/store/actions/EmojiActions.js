import {
  ADD_EMOJI,
  CLEAR_EMOJI,
  UPDATE_EMOJI, 
  CURRENT_EMOJI,
  LOAD_EMOJIS_SUCCESS,    // ... gets the current emojis database ...
  CLEAR_SELECTED_EMOJIS,  
  DELETE_SELECTED_EMOJIS
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

export const addEmoji = (emoji, name) => {
  store.createEmoji(emoji, name);
  const emojiData = store.getMyEmojis();    // ... retrieves the newly updated list ...
  return {
    type: ADD_EMOJI,
    payload: { emojis: emojiData }
  };
};

export const updateEmoji = (key, selected, numUsed) => {
  store.updateEmoji(key, selected, numUsed);
  const emojiData = store.getMyEmojis();    // ... retrieves the newly updated list ...
  return {
    type: UPDATE_EMOJI,
    payload: { emojis: emojiData }
  };
};

export const deleteEmojis = () => {
  store.deleteSelectedEmojis();
  const emojiData = store.getMyEmojis();    // ... retrieves the newly updated list ...
  return {
    type: DELETE_SELECTED_EMOJIS,
    payload: { emojis: emojiData }
  };
};

export const clearEmojis = () => {
  store.clearSelectedEmojis();
  const emojiData = store.getMyEmojis();    // ... retrieves the newly updated list ...
  return {
    type: CLEAR_SELECTED_EMOJIS,
    payload: { emojis: emojiData }
  };
};

export const emojiLoadSuccess = (emojiData) => {
  return {
    type: LOAD_EMOJIS_SUCCESS,
    payload: { emojis: emojiData }
  };
};

export const loadMyEmojis = () => {
  return dispatch => {
    const emojiData = store.getMyEmojis();
    dispatch(emojiLoadSuccess(emojiData));
  };
};

//---------------------------------------------------------------
// ... the following functions need to be adjusted for Realm ...
//---------------------------------------------------------------

export const clearEmoji = () => {
  return {
    type: CLEAR_EMOJI
  };
};

export const currentEmoji = (emoji, name) => {
  return {
    type: CURRENT_EMOJI,
    payload: { emoji, name }
  };
};

//----------------------------------------------------------------------
// ... not required right now as list is sort maintained by Realm ...
// ... Future: if additional sorts are needed / requested ...
//----------------------------------------------------------------------
/*

export const removeEmoji = (key) => {
  return {
    type: REMOVE_EMOJI,
    payload: { key }
  };
};

export const sortMyEmojis = () => {
  return {
    type: SORT_EMOJIS
  };
};
*/

//----------------------------------------------------------------------
/*

export const emojiSaveSuccess = () => {
  return {
    type: SAVE_EMOJIS_SUCCESS
  };
};

export const saveMyEmojis = (myEmojis) => {
  //console.log('Inside Save Emojis', myEmojis);
  return dispatch => {
    AsyncStorage.setItem(EMOJIS_STORAGE_KEY, JSON.stringify(myEmojis), (errorMsg, result) => {
      console.log('SAVED! but result is bogus: ', result, '*** Error: ', errorMsg);
      // ... here result is normally undefinded and error is null (very strange) ...
      dispatch(emojiSaveSuccess());
    });
  };
};

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
