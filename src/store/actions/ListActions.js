import {
  ADD_LIST,
  //SORT_LISTS, 
  CLEAR_LIST,
  UPDATE_LIST,
  REMOVE_LIST,
  CURRENT_LIST,
  ADD_LIST_IMAGE,
  HIGHLIGHT_LIST,             // ... NEW ...
  SET_ACTIVE_LIST,
  OPEN_LISTS_MODAL,           // ... NEW ...
  LIST_EDIT_CHANGE,
  CLOSE_LISTS_MODAL,          // ... NEW ...
  LOAD_LISTS_SUCCESS,         // ... NEW - Restore Lists from Cloud ...
  UPDATE_LIST_SELECTED,       // ... NEW ...
  DELETE_SELECTED_LISTS
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

//-------------------------------------------------------------------------------------------
// ... VIP action - sets the state for many other modules as everything is list specific ...
//-------------------------------------------------------------------------------------------
export const setActiveList = (key, name) => {
  return {
    type: SET_ACTIVE_LIST,
    payload: { key, name }
  };
};

export const propertyListChanged = (prop, value) => {
  return {
    type: LIST_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const addList = (key, name, desc, icon, type, thumb, mime, bcode) => {
  store.createList(key, name, desc, icon, type, thumb, mime, bcode);
  return {
    type: ADD_LIST,     // ... just need to inform Redux that something was added ...
  };
};

export const addListImage = (image) => {
  return {
    type: ADD_LIST_IMAGE,
    payload: { image }
  };
};

export const updateList = (item) => {
  store.updateList(item);
  return {
    type: UPDATE_LIST
  };
};

export const currentList = (item) => {
  return {
    type: CURRENT_LIST,
    payload: { item }
  };
};

export const clearListItem = () => {
  return {
    type: CLEAR_LIST
  };
};

export const openListsModal = (key) => {
  return {
    type: OPEN_LISTS_MODAL,
    payload: { key }
  };
};

export const closeListsModal = (key) => {
  return {
    type: CLOSE_LISTS_MODAL,
    payload: { key }
  };
};

export const listsRestoreSuccess = () => {
  return {
    type: LOAD_LISTS_SUCCESS
  };
};

export const deleteList = (key) => {
  //-----------------------------------------------------------------------------
  // ... we should really do this within a transaction so we could roll back ...
  //-----------------------------------------------------------------------------
  store.deleteList(key);
  return {
    type: REMOVE_LIST
  };
};

//------------------------------------------------------------------------
// ... MG - 22.02.2018 - not really used as set active list does both ...
//------------------------------------------------------------------------
export const highlightList = (key) => {
  return {
    type: HIGHLIGHT_LIST,
    payload: { key }
  };
};

//-----------------------------------------------------------------------
// ... not really used as I don't anticipate massive list operations ...
//-----------------------------------------------------------------------
export const setListSelected = (key, isSelected) => {
  store.updateListSelected(key, isSelected);
  return {
    type: UPDATE_LIST_SELECTED
  };
};

//-----------------------------------------------------------------------
// ... not really used as I don't anticipate massive list operations ...
//-----------------------------------------------------------------------
export const deleteLists = () => {
  return {
    type: DELETE_SELECTED_LISTS
  };
};

//---------------------------------------------------------------
// ... the following functions need to be adjusted for Realm ...
//---------------------------------------------------------------
