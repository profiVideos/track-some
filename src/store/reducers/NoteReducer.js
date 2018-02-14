import { ToastAndroid } from 'react-native';
import {
  ADD_NOTE,
  //SORT_NOTES, 
  CLEAR_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  CURRENT_NOTE,
  HIGHLIGHT_NOTE,            // ... NEW ...
  NOTE_EDIT_CHANGE,
  OPEN_NOTES_MODAL,
  CLOSE_NOTES_MODAL,
  TOGGLE_COLOR_PICKER,
  SEARCH_NOTES_CHANGED,
  UPDATE_NOTE_SELECTED,
  DELETE_SELECTED_NOTES
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  lastUpdated: false,
  detailView: false,
  highlighted: '',          // ... the unique key of the currently highlighted item ...
  colorPicker: false,
  editChange: false,
  notesWindowOpen: false,
  editNote: '',             // ... the unique key of the item being edited ...
  searchFor: '',
  thisNote: {
    key: '',
    card: '',
    icon: '',
    title: '',
    note: '',
    color: '',
    priority: 0,
    reminder: null,
    selected: false,
    createdTimestamp: {},
    updatedTimestamp: {}
  }
};

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {

    case SEARCH_NOTES_CHANGED:
      return {
        ...state,
        searchFor: action.payload.text
      };

    case OPEN_NOTES_MODAL:
      return {
        ...state,
        editNote: action.payload.key,
        editChange: false,
        notesWindowOpen: true
      };

    case CLOSE_NOTES_MODAL:
      return {
        ...state,
        editNote: '',
        notesWindowOpen: false
      };

    case NOTE_EDIT_CHANGE:
      return {
        ...state,
        thisNote: {
          ...state.thisNote,
          [action.payload.prop]: action.payload.value
        },
        editChange: true
      };

    case UPDATE_NOTE_SELECTED:
      // ... added in Realm DB - just update date to get a list refresh ...
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case TOGGLE_COLOR_PICKER:
      // ... open / close the color picker control ...
      return { 
        ...state,
        colorPicker: !action.payload.isActive
      };

    case HIGHLIGHT_NOTE:
      // ... make one item in the list stand out or be selected ...
      return { 
        ...state,
        highlighted: action.payload.key,
        lastUpdated: Date.now()
      };

    case UPDATE_NOTE:
      // ... added in Realm DB - just show something happened ...
      ToastAndroid.show('Note Updated', ToastAndroid.SHORT);
      return {
        ...state,
        //editChange: false,
        lastUpdated: Date.now()
      };

    case REMOVE_NOTE:
      // ... deleted in Realm DB - just show something happened ...
      // ... however we have to remove the link to this note in cards file (if required) ...
      ToastAndroid.show('Note Deleted', ToastAndroid.LONG);
      //-----------------------------------------------------------------------------
      // ... we should really do this within a transaction so we could roll back ...
      //-----------------------------------------------------------------------------
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    case ADD_NOTE:
      // ... added in Realm DB - just clear the note input record ...
      // ... preserve the card link in case person is adding multiple notes at once ...
      ToastAndroid.show('Note Added', ToastAndroid.SHORT);
      return { 
        ...state,
        thisNote: {
          key: '',
          card: action.payload.card,
          icon: '',
          title: '',
          note: '',
          color: '',
          priority: 0,
          reminder: null,
          selected: false,
          createdTimestamp: {},
          updatedTimestamp: {}
        },
        lastUpdated: Date.now()
      };

    case CURRENT_NOTE:
      return {
        ...state,
        thisNote: {
          key: action.payload.item.key,
          card: action.payload.item.card,
          icon: action.payload.item.icon,
          title: action.payload.item.title,
          note: action.payload.item.note,
          color: action.payload.item.color,
          priority: action.payload.item.priority,
          reminder: action.payload.item.reminder,
          selected: action.payload.item.selected,
          createdTimestamp: action.payload.item.createdTimestamp,
          updatedTimestamp: action.payload.item.updatedTimestamp
        },
        detailView: true,
        editChange: false
      };

    case CLEAR_NOTE:
      return {
        ...state,
        thisNote: {
          key: '',
          card: '',
          icon: '',
          title: '',
          note: '',
          color: '',
          priority: 0,
          reminder: null,
          selected: false,
          createdTimestamp: {},
          updatedTimestamp: {}
        },
        detailView: false,
        editChange: false
      };

//----------------------------------------------------
// ... these functions need to be fixed for Realm ...
//----------------------------------------------------
    case DELETE_SELECTED_NOTES:
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    default: return state;
  
  }
};

export default NoteReducer;
