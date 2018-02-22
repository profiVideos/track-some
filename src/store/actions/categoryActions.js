import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  CURRENT_CATEGORY,
  HIGHLIGHT_CATEGORY,
  UPDATE_CAT_SELECTED,
  DELETE_SELECTED_CATS,
  CATEGORY_EDIT_CHANGE,
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

export const itemTextChanged = (prop, value) => {
  return {
    type: CATEGORY_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const setCatSelected = (key, isSelected) => {
  store.updateCatSelected(key, isSelected);
  return {
    type: UPDATE_CAT_SELECTED
  };
};

export const addCategory = (list, name, desc, icon) => {
  store.createCategory(list, name, desc, icon);
  return {
    type: ADD_CATEGORY
  };
};

export const updateCategory = (item) => {
  store.updateCategory(item);
  return {
    type: UPDATE_CATEGORY
  };
};

export const highlightCategory = (key) => {
  return {
    type: HIGHLIGHT_CATEGORY,
    payload: { key }
  };
};

export const currentCategory = (item) => {
  return {
    type: CURRENT_CATEGORY,
    payload: { item }
  };
};

export const clearCategory = () => {
  return {
    type: CLEAR_CATEGORY
  };
};

export const deleteCategory = (key) => {
  //-----------------------------------------------------------------------------
  // ... we should really do this within a transaction so we could roll back ...
  //-----------------------------------------------------------------------------
  store.deleteCategory(key);
  return {
    type: REMOVE_CATEGORY
  };
};

export const deleteCategories = (list) => {
  store.deleteSelectedCategories(list);
  return {
    type: DELETE_SELECTED_CATS
  };
};

/*
    key: 'string',
    name: { type: 'string', indexed: true },
    // ... to which 'list' does this category belong or '' for all ...
    list: { type: 'string', optional: true },   
    desc: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date'

export const categoriesLoadSuccess = (catData) => {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: { itemList: catData }
  };
};

export const loadCategories = () => {
  return dispatch => {
    const catData = store.getAllCategories();
    dispatch(categoriesLoadSuccess(catData));
  };
};

export const categoriesSaveSuccess = () => {
  //console.log('Did the bloomen SAVE! : ');
  return {
    type: SAVE_CATEGORIES_SUCCESS
  };
};

export const saveCategories = (categoryList) => {
  //console.log('Will SAVE! : ', categoryList);
  return dispatch => {
    AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categoryList), (err, result) => {
      console.log('SAVED! But result is bogus: ', result, '*** Error: ', err);
      // ... here result is normally undefinded and error is null (very strange) ...
      dispatch(categoriesSaveSuccess());
    });
  };
};

export const loadAsyncCategories = () => {
  return dispatch => {
    AsyncStorage.getItem(CATEGORIES_STORAGE_KEY, (errorMsg, jsonData) => {
      if (jsonData !== null) dispatch(categoriesLoadSuccess(JSON.parse(jsonData)));
    });
  };
};

export const sortCategories = () => {
  return {
    type: SORT_CATEGORIES
  };
};
*/
