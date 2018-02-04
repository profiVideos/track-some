// ... later (uses Async & thunk - import firebase from 'firebase';
//import { AsyncStorage } from 'react-native';
import {
  ADD_CARD,
  CLEAR_CARD,
  UPDATE_CARD,
  REMOVE_CARD,
  CURRENT_CARD,
  ADD_CARD_TAG,              // ... NEW ...
  ADD_CARD_IMAGE,            // ... NEW ...
  HIGHLIGHT_CARD,            // ... NEW ...
  CARD_EDIT_CHANGE,
  //SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  //LOAD_CARDS_SUCCESS,
  //LOAD_CARDS_FAILURE
  UPDATE_CARD_SELECTED,      // ... NEW ...
  DELETE_SELECTED_CARDS
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

export const itemCardChanged = (prop, value) => {
  return {
    type: CARD_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const addCard =
  (cName, cDesc, cIcon, cType, cRating, cCategory, cThumb, cMime, cBarcode, cTags, cNotes) => {
  store.createCard(
    cName, cDesc, cIcon, cType, cRating, cCategory, cThumb, cMime, cBarcode, cTags, cNotes);
  return {
    type: ADD_CARD   // ... just need to inform Redux that something was added ...
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

export const setCardSelected = (key, isSelected) => {
  store.updateCardSelected(key, isSelected);
  return {
    type: UPDATE_CARD_SELECTED
  };
};

export const updateCard = (key, name, desc, icon, category) => {
  store.updateCard(key, name, desc, icon, category);
  return {
    type: UPDATE_CARD
  };
};

export const deleteCard = (key) => {
  //-----------------------------------------------------------------------------
  // ... we should really do this within a transaction so we could roll back ...
  //-----------------------------------------------------------------------------
  store.deleteCard(key);
  return {
    type: REMOVE_CARD
  };
};

export const highlightCard = (key) => {
  return {
    type: HIGHLIGHT_CARD,
    payload: { key }
  };
};

//----------------------------------------------------
// ... these functions need to be fixed for Realm ...
//----------------------------------------------------

export const deleteCards = () => {
  return {
    type: DELETE_SELECTED_CARDS
  };
};

//---------------------------------------------------------------
// ... the following functions need to be adjusted for Realm ...
//---------------------------------------------------------------

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
