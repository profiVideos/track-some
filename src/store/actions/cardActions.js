// ... later (uses Async & thunk - import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
  ADD_CARD,
  CLEAR_CARD,
  UPDATE_CARD,
  REMOVE_CARD,
  SORT_CARDS, 
  CURRENT_CARD,
  ADD_CARD_TAG,              // ... NEW ...
  ADD_CARD_IMAGE,            // ... NEW ...
  HIGHLIGHT_CARD,            // ... NEW ...
  CARD_EDIT_CHANGE,
  CARDS_STORAGE_KEY,
  SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  LOAD_CARDS_SUCCESS,
  //LOAD_CARDS_FAILURE
  UPDATE_CARD_SELECTED,      // ... NEW ...
  DELETE_SELECTED_CARDS
} from './actionTypes';

export const itemCardChanged = (prop, value) => {
  return {
    type: CARD_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const highlightCard = (key) => {
  return {
    type: HIGHLIGHT_CARD,
    payload: { key }
  };
};

export const deleteCards = () => {
  return {
    type: DELETE_SELECTED_CARDS
  };
};

export const sortMyCards = () => {
  return {
    type: SORT_CARDS
  };
};

export const addCard = (key, name, desc, icon, thumb, rating, category, tags, image) => {
  return {
    type: ADD_CARD,
    payload: { key, name, desc, icon, thumb, rating, category, tags, image }
  };
};

export const addCardTag = (tag) => {
  return {
    type: ADD_CARD_TAG,
    payload: { tag }
  };
};

export const addCardImage = (image) => {
  return {
    type: ADD_CARD_IMAGE,
    payload: { image }
  };
};

export const updateCard = (key, name, desc, icon, thumb, rating, category) => {
  return {
    type: UPDATE_CARD,
    payload: { key, name, desc, icon, thumb, rating, category }
  };
};

export const setCardSelected = (key, isSelected) => {
  return {
    type: UPDATE_CARD_SELECTED,
    payload: { key, isSelected }
  };
};

export const removeCard = (key) => {
  return {
    type: REMOVE_CARD,
    payload: { key }
  };
};

export const clearCard = () => {
  return {
    type: CLEAR_CARD
  };
};

export const currentCard = (key) => {
  return {
    type: CURRENT_CARD,
    payload: { key }
  };
};

export const cardsSaveSuccess = () => {
  //console.log('Did the bloomen SAVE! : ');
  return {
    type: SAVE_CARDS_SUCCESS
  };
};

export const saveMyCards = (itemList) => {
  //console.log('Will SAVE! : ', itemList);
  return dispatch => {
    AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(itemList), (err, result) => {
      console.log('SAVED! But result is bogus: ', result, '*** Error: ', err);
      // ... here result is normally undefinded and error is null (very strange) ...
      dispatch(cardsSaveSuccess());
    });
  };
};

export const cardsLoadSuccess = (jsonData) => {
  return {
    type: LOAD_CARDS_SUCCESS,
    payload: { itemList: jsonData }
  };
};

export const loadMyCards = () => {
  return dispatch => {
    AsyncStorage.getItem(CARDS_STORAGE_KEY, (errorMsg, jsonData) => {
      if (jsonData !== null) dispatch(cardsLoadSuccess(JSON.parse(jsonData)));
    });
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
