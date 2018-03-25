import { ToastAndroid } from 'react-native';
import {
  ADD_NOTE,
  //SORT_NOTES, 
  CLEAR_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  CURRENT_NOTE,
  RENDER_NOTES,
  HIGHLIGHT_NOTE,            // ... NEW ...
  NOTE_EDIT_CHANGE,
  OPEN_NOTES_MODAL,
  CLOSE_NOTES_MODAL,
  DELETE_CARD_NOTES,
  LOAD_NOTES_SUCCESS,
  TOGGLE_COLOR_PICKER,
  TOGGLE_PHOTO_VIEWER,
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
  photoViewer: false,
  editChange: false,
  renderNotes: false,
  notesWindowOpen: false,
  editNote: '',             // ... the unique key of the item being edited ...
  searchFor: '',
  thisNote: {
    key: '',
    list: '',
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
    key: 'string',    // ... unique GUID() ...
    list: 'string?',   // ... (key) to which 'list' does this note belong or '' for all ...
    card: 'string?',   // ... (key) to which 'card' does this note belong or '' for all ...
    icon: 'string?',
    title: { type: 'string', indexed: true },
    note: 'string',
    color: 'string?',
    priority: 'int?',
    reminder: 'date?',
    selected: 'bool',
    createdTimestamp: 'date',
    updatedTimestamp: 'date'

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

    case LOAD_NOTES_SUCCESS:
    case UPDATE_NOTE_SELECTED:
      // ... added in Realm DB - just update date to get a list refresh ...
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case TOGGLE_PHOTO_VIEWER:
      // ... open / close the photo viewer control ...
      return { 
        ...state,
        photoViewer: !action.payload.isActive
      };

    case TOGGLE_COLOR_PICKER:
      // ... open / close the color picker control ...
      return { 
        ...state,
        colorPicker: !action.payload.isActive
      };

    case RENDER_NOTES:
      // ... show all the notes on the drop shares to social media ...
      return { 
        ...state,
        renderNotes: action.payload.showNotes
        //lastUpdated: Date.now()
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
          list: '',
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
          list: action.payload.item.list,
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
          list: '',
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

    case DELETE_CARD_NOTES:
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
