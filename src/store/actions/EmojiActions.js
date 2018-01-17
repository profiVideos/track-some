// ... later (uses Async & thunk - import firebase from 'firebase';
import {
  ADD_EMOJI, 
  LOAD_EMOJIS,
  SORT_EMOJIS,        // ... gets the current emojis database (from JSON File / Async / Firebase)
  UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI,
  CLEAR_EMOJI,
} from './actionTypes';

export const addEmoji = (emoji, name) => {
  return {
    type: ADD_EMOJI,
    payload: { emoji, name }
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

export const loadEmojis = () => {
  return {
    type: LOAD_EMOJIS
  };
};

export const sortEmojis = () => {
  return {
    type: SORT_EMOJIS
  };
};

export const updateEmoji = (key, numUsed) => {
  return {
    type: UPDATE_EMOJI,
    payload: { key, numUsed }
  };
};

export const removeEmoji = (key) => {
  return {
    type: REMOVE_EMOJI,
    payload: { key }
  };
};

/*
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
*/
