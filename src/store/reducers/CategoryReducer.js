//import people from './people.json';
import { ToastAndroid } from 'react-native';
import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  CURRENT_CATEGORY,
  HIGHLIGHT_CATEGORY,
  SHOW_ALL_CATEGORIES,
  UPDATE_CAT_SELECTED,
  DELETE_SELECTED_CATS,
  CATEGORY_EDIT_CHANGE,
  LOAD_CATEGORIES_SUCCESS,
  //SAVE_CATEGORIES_SUCCESS,
  //SAVE_CATEGORIES_FAILURE,
  //LOAD_CATEGORIES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  //itemList: [],
  loading: false,   // ... not used at the moment ...
  showAll: false,   // ... display all categories - regardless of list selected ...
  detailView: false,
  editChange: false,
  lastUpdated: null,
  highlighted: '',
  catCurrent: {
    key: '',
    name: '',
    list: '',
    desc: '',
    icon: '',
    selected: false,
    createdTimestamp: {}
  }
};

const CategoryReducer = (state = initialState, action) => {
  //console.log('Category Reducer State: ', state, '  Action: ', action);
  switch (action.type) {

    case CATEGORY_EDIT_CHANGE:
      return {
        ...state,
        catCurrent: {
          ...state.catCurrent,
          [action.payload.prop]: action.payload.value
        },
        editChange: true
      };

    case UPDATE_CAT_SELECTED:
      // ... added in Realm DB - just update date to get a list refresh ...
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case HIGHLIGHT_CATEGORY:
      // ... make one item in the list stand out or be selected ...
      return { 
        ...state,
        highlighted: action.payload.key,
        lastUpdated: Date.now()
      };

    case SHOW_ALL_CATEGORIES:
      // ... toggle the display of all categories on the category page ...
      return { 
        ...state,
        showAll: action.payload.displayAll,
        lastUpdated: Date.now()
      };

    case UPDATE_CATEGORY:
      // ... added in Realm DB - just show something happened ...
      ToastAndroid.show('Category Updated', ToastAndroid.SHORT);
      return {
        ...state,
        //editChange: false,
        lastUpdated: Date.now()
      };

    case REMOVE_CATEGORY:
      // ... deleted in Realm DB - just show something happened ...
      // ... however we have to remove link to this category in cards file (if used) ...
      ToastAndroid.show('Category Deleted', ToastAndroid.SHORT);
      //-----------------------------------------------------------------------------
      // ... we should really do this within a transaction so we could roll back ...
      //-----------------------------------------------------------------------------
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    case ADD_CATEGORY:
      // ... added in Realm DB - just update date to get a list refresh ...
      ToastAndroid.show('Category Added', ToastAndroid.SHORT);
      return { 
        ...state,
        catCurrent: {
          key: '',
          name: '',
          list: '',
          desc: '',
          icon: '',
          selected: false,
          createdTimestamp: {}
        },
        lastUpdated: Date.now()
      };

    case CURRENT_CATEGORY:
      //-------------------------------------------
      // ... fix this routine to reflect Realm ...
      //-------------------------------------------
      return {
        ...state,
        catCurrent: {
          key: this.action.payload.item.key,
          name: this.action.payload.item.name,
          list: this.action.payload.item.list,
          desc: this.action.payload.item.desc,
          icon: this.action.payload.item.icon,
          selected: this.action.payload.item.selected,
          createdTimestamp: action.payload.item.createdTimestamp
        },
        detailView: true,
        editChange: false
      };

    case DELETE_SELECTED_CATS:
      return {
        ...state,
        //itemList: action.payload.itemList,
        detailView: false,
        lastUpdated: Date.now()
      };

    case CLEAR_CATEGORY:
      return {
        ...state,
        catCurrent: {
          key: '',
          name: '',
          list: '',
          desc: '',
          icon: '',
          selected: false,
          createdTimestamp: {}
        },
        detailView: false,
        editChange: false
      };

    case LOAD_CATEGORIES_SUCCESS:
      // ... restore the user's category list ...
      return { 
        ...state,
        lastUpdated: Date.now()
      };

    default: return state;
  
  }
};

export default CategoryReducer;
