import { ToastAndroid } from 'react-native';
import {
  ADD_LIST,
  //SORT_LISTS, 
  CLEAR_LIST,
  UPDATE_LIST,
  REMOVE_LIST,
  CURRENT_LIST,
  ADD_LIST_IMAGE,
  HIGHLIGHT_LIST,            // ... NEW ...
  LIST_EDIT_CHANGE,
  OPEN_LISTS_MODAL,
  CLOSE_LISTS_MODAL,
  //SEARCH_LISTS_CHANGED,
  UPDATE_LIST_SELECTED,
  DELETE_SELECTED_LISTS
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  lastUpdated: false,
  detailView: false,
  highlighted: '',          // ... the unique key of the currently highlighted item ...
  editChange: false,
  listWindowOpen: false,
  editList: '',             // ... the unique key of the item being edited ...
  thisList: {
    key: '',
    name: '',
    desc: '',
    icon: '',
    iconType: '',            // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    imageThumb: '',          // ... base64 encoded thumbnail (256x256) ...
    mimeType: '',            // ... same as full image in imageRealm ...
    barcode: '',             // ... definition same as one above ...
    notes: [],
    numCards: 0,
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

const ListReducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_LISTS_MODAL:
      return {
        ...state,
        editList: action.payload.key,
        editChange: false,
        listWindowOpen: true
      };

    case CLOSE_LISTS_MODAL:
      return {
        ...state,
        editList: '',
        listWindowOpen: false
      };

    case LIST_EDIT_CHANGE:
      return {
        ...state,
        thisList: {
          ...state.thisList,
          [action.payload.prop]: action.payload.value
        },
        editChange: true
      };

    case UPDATE_LIST_SELECTED:
      // ... added in Realm DB - just update date to get a list refresh ...
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case HIGHLIGHT_LIST:
      // ... make one item in the list stand out or be selected ...
      return { 
        ...state,
        highlighted: action.payload.key,
        lastUpdated: Date.now()
      };

    case UPDATE_LIST:
      // ... added in Realm DB - just show something happened ...
      ToastAndroid.show('List Updated', ToastAndroid.SHORT);
      return {
        ...state,
        //editChange: false,
        lastUpdated: Date.now()
      };

    case REMOVE_LIST:
      // ... deleted in Realm DB - just show something happened ...
      // ... however we have to remove the link to this note in cards file (if required) ...
      ToastAndroid.show('List Deleted', ToastAndroid.LONG);
      //-----------------------------------------------------------------------------
      // ... we should really do this within a transaction so we could roll back ...
      //-----------------------------------------------------------------------------
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    case ADD_LIST:
      // ... added in Realm DB - just clear the note input record ...
      // ... preserve the card link in case person is adding multiple notes at once ...
      ToastAndroid.show('List Added', ToastAndroid.SHORT);
      return { 
        ...state,
        thisList: {
          key: '',
          name: '',
          desc: '',
          icon: '',
          iconType: '',            // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
          imageThumb: '',          // ... base64 encoded thumbnail (256x256) ...
          mimeType: '',            // ... same as full image in imageRealm ...
          barcode: '',             // ... definition same as one above ...
          notes: [],
          numCards: 0,
          selected: false,
          createdTimestamp: {},
          updatedTimestamp: {}
        },
        lastUpdated: Date.now()
      };

    case ADD_LIST_IMAGE:
      // ... add this image to the list ...
      return { 
        ...state,
        thisList: { ...state.thisList, 
          imageThumb: action.payload.image.data, 
          mimeType: action.payload.image.mime
          //image: '',  // ... store this in separate Realm (do this later) ...
        },
      };

    case CURRENT_LIST:
      return {
        ...state,
        thisList: {
          key: action.payload.item.key,
          name: action.payload.item.name,
          desc: action.payload.item.desc,
          icon: action.payload.item.icon,
          iconType: action.payload.item.iconType,
          imageThumb: action.payload.item.imageThumb,
          mimeType: action.payload.item.mimeType,
          barcode: action.payload.item.barcode,
          notes: action.payload.item.notes,
          numCards: action.payload.item.numCards,
          selected: action.payload.item.selected,
          createdTimestamp: action.payload.item.createdTimestamp,
          updatedTimestamp: action.payload.item.updatedTimestamp
        },
        detailView: true,
        editChange: false
      };

    case CLEAR_LIST:
      return {
        ...state,
        thisList: {
          key: '',
          name: '',
          desc: '',
          icon: '',
          iconType: '',            // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
          imageThumb: '',          // ... base64 encoded thumbnail (256x256) ...
          mimeType: '',            // ... same as full image in imageRealm ...
          barcode: '',             // ... definition same as one above ...
          notes: [],
          numCards: 0,
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
    case DELETE_SELECTED_LISTS:
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    default: return state;
  
  }
};

export default ListReducer;
