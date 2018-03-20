// ... later (uses Async & thunk - import firebase from 'firebase';
//import { AsyncStorage } from 'react-native';
import {
  ADD_CARD,
  GET_CARD,
  CLEAR_CARD,
  UPDATE_CARD,
  REMOVE_CARD,
  CURRENT_CARD,
  ADD_CARD_TAG,
  ADD_CARD_NOTE,
  ADD_CARD_IMAGE,
  HIGHLIGHT_CARD,
  DELETE_CARD_TAG,
  DELETE_CARD_NOTE,           // ... VERY NEW ...
  OPEN_TAGS_MODAL,
  CLOSE_TAGS_MODAL,
  OPEN_CARDS_MODAL,           // ... VERY, VERY NEW ...
  CLOSE_CARDS_MODAL,          // ... VERY, VERY NEW ...
  CARD_EDIT_CHANGE,
  UPDATE_CARD_TAGS,
  UPDATE_CARD_NOTES,          // ... VERY NEW ...
  LOAD_CARDS_SUCCESS,
  //SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  //LOAD_CARDS_FAILURE
  SEARCH_CARDS_CHANGED,       // ... brand, spanking NEW ...
  UPDATE_CARD_SELECTED,
  DELETE_SELECTED_CARDS
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

export const searchCardsChanged = (text) => {
  return {
    type: SEARCH_CARDS_CHANGED,
    payload: { text }
  };
};

export const itemCardChanged = (prop, value) => {
  return {
    type: CARD_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const addCard =
  (cList, cName, cDesc, cIcon, cType, cRating, cCat, cThumb, cMime, cBarcode, cTags, cNotes) => {
  store.createCard(
    cList, cName, cDesc, cIcon, cType, cRating, cCat, cThumb, cMime, cBarcode, cTags, cNotes);
  return {
    type: ADD_CARD   // ... just need to inform Redux that something was added ...
  };
};

export const getCard = (key) => {
  const item = store.getCard(key);
  return {
    type: GET_CARD,
    payload: { item }
  };
};

export const addCardTag = (tag) => {
  return {
    type: ADD_CARD_TAG,
    payload: { tag }
  };
};

export const addCardNote = (key) => {
  return {
    type: ADD_CARD_NOTE,
    payload: { key }
  };
};

export const addCardImage = (image) => {
  return {
    type: ADD_CARD_IMAGE,
    payload: { image }
  };
};

export const deleteCardTag = (tag) => {
  return {
    type: DELETE_CARD_TAG,
    payload: { tag }
  };
};

export const deleteCardNote = (key) => {
  return {
    type: DELETE_CARD_NOTE,
    payload: { key }
  };
};

export const setCardSelected = (key, isSelected) => {
  store.updateCardSelected(key, isSelected);
  return {
    type: UPDATE_CARD_SELECTED
  };
};

export const updateCard = 
  (key, list, name, desc, icon, type, rating, cat, thumb, mime, bcode, tags, notes) => {
  store.updateCard(key, list, name, desc, icon, type, rating, cat, thumb, mime, bcode, tags, notes);
  return {
    type: UPDATE_CARD
  };
};

export const updateCardTags = (key, tags) => {
  store.updateCardTags(key, tags);
  return {
    type: UPDATE_CARD_TAGS
  };
};

export const cardsRestoreSuccess = () => {
  return {
    type: LOAD_CARDS_SUCCESS
  };
};

export const updateCardNotes = (key, notes) => {
  store.updateCardNotes(key, notes);
  return {
    type: UPDATE_CARD_NOTES
  };
};

export const currentCard = (item) => {
  return {
    type: CURRENT_CARD,
    payload: { item }
  };
};

export const clearCard = () => {
  return {
    type: CLEAR_CARD
  };
};

export const openCardsModal = (key) => {
  return {
    type: OPEN_CARDS_MODAL,
    payload: { key }
  };
};

export const closeCardsModal = (key) => {
  return {
    type: CLOSE_CARDS_MODAL,
    payload: { key }
  };
};

export const openTagsModal = (key) => {
  return {
    type: OPEN_TAGS_MODAL,
    payload: { key }
  };
};

export const closeTagsModal = (key) => {
  return {
    type: CLOSE_TAGS_MODAL,
    payload: { key }
  };
};

export const deleteCard = (cardKey, listKey) => {
  //-----------------------------------------------------------------------------
  // ... we should really do this within a transaction so we could roll back ...
  // ... we may now be leaving some notes as orphans - just be aware of this ...
  //-----------------------------------------------------------------------------
  store.deleteCard(cardKey, listKey);
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
