import {
  ADD_NOTE,
  //SORT_NOTES, 
  CLEAR_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  CURRENT_NOTE,
  HIGHLIGHT_NOTE,             // ... NEW ...
  OPEN_NOTES_MODAL,           // ... NEW ...
  CLOSE_NOTES_MODAL,          // ... NEW ...
  NOTE_EDIT_CHANGE,
  TOGGLE_COLOR_PICKER,        // ... NEW ...
  TOGGLE_PHOTO_VIEWER,        // ... super brand spanking NEW ...
  SEARCH_NOTES_CHANGED,       // ... brand, spanking NEW ...
  UPDATE_NOTE_SELECTED,       // ... NEW ...
  DELETE_SELECTED_NOTES
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

export const searchNotesChanged = (text) => {
  return {
    type: SEARCH_NOTES_CHANGED,
    payload: { text }
  };
};

export const propertyNoteChanged = (prop, value) => {
  return {
    type: NOTE_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const addNote = (key, card, icon, title, note, color, priority, reminder) => {
  store.createNote(key, card, icon, title, note, color, priority, reminder);
  return {
    type: ADD_NOTE,     // ... just need to inform Redux that something was added ...
    payload: { card }   // ... and preserve the card link if it exists ...
  };
};

export const setNoteSelected = (key, isSelected) => {
  store.updateNoteSelected(key, isSelected);
  return {
    type: UPDATE_NOTE_SELECTED
  };
};

//export const updateNote = (key, card, icon, title, note, color, priority, reminder) => {
export const updateNote = (item) => {
  store.updateNote(item);
  return {
    type: UPDATE_NOTE
  };
};

export const highlightNote = (key) => {
  return {
    type: HIGHLIGHT_NOTE,
    payload: { key }
  };
};

export const currentNote = (item) => {
  return {
    type: CURRENT_NOTE,
    payload: { item }
  };
};

export const clearNote = () => {
  return {
    type: CLEAR_NOTE
  };
};

export const togglePhotoViewer = (isActive) => {
  return {
    type: TOGGLE_PHOTO_VIEWER,
    payload: { isActive }
  };
};

export const toggleColorPicker = (isActive) => {
  return {
    type: TOGGLE_COLOR_PICKER,
    payload: { isActive }
  };
};

export const openNotesModal = (key) => {
  return {
    type: OPEN_NOTES_MODAL,
    payload: { key }
  };
};

export const closeNotesModal = (key) => {
  return {
    type: CLOSE_NOTES_MODAL,
    payload: { key }
  };
};

export const deleteNote = (key) => {
  //-----------------------------------------------------------------------------
  // ... we should really do this within a transaction so we could roll back ...
  //-----------------------------------------------------------------------------
  store.deleteNote(key);
  return {
    type: REMOVE_NOTE
  };
};

export const deleteNotes = () => {
  return {
    type: DELETE_SELECTED_NOTES
  };
};

//---------------------------------------------------------------
// ... the following functions need to be adjusted for Realm ...
//---------------------------------------------------------------
