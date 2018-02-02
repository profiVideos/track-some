import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  CURRENT_CATEGORY,
  DELETE_SELECTED_CATS,
  CATEGORY_EDIT_CHANGE,
  LOAD_CATEGORIES_SUCCESS,
} from './actionTypes';
import store from '../../store';   // ... Realm DB Routines ...

export const itemTextChanged = (prop, value) => {
  return {
    type: CATEGORY_EDIT_CHANGE,
    payload: { prop, value }
  };
};

export const addCategory = (catName, catDesc, catIcon) => {
  store.createCategory(catName, catDesc, catIcon);
  const newList = store.getAllCategories();  // ... retrieves the newly sorted list ...
  return {
    type: ADD_CATEGORY,
    payload: { itemList: newList }
  };
};

export const updateCategory = (key, name, desc, icon, isSelected) => {
  store.updateCategory(key, name, desc, icon, isSelected);
  const newList = store.getAllCategories();  // ... retrieves the newly updated list ...
  return {
    type: UPDATE_CATEGORY,
    payload: { itemList: newList }
  };
};

export const deleteCategories = () => {
  store.deleteSelectedCategories();
  const newList = store.getAllCategories();  // ... retrieves the newly sorted list ...
  return {
    type: DELETE_SELECTED_CATS,
    payload: { itemList: newList }
  };
};

export const categoriesLoadSuccess = (catData) => {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: { itemList: catData }
  };
};

export const loadCategories = () => {
  return dispatch => {
    const catData = store.getAllCategories();
    //console.log('Category Data: ', catData);
    dispatch(categoriesLoadSuccess(catData));
  };
};

//---------------------------------------------------------------
// ... the following functions need to be adjusted for Realm ...
//---------------------------------------------------------------

export const removeCategory = (catKey) => {
  return {
    type: REMOVE_CATEGORY,
    payload: { catKey }
  };
};

export const clearCategory = () => {
  return {
    type: CLEAR_CATEGORY
  };
};

export const currentCategory = (catKey) => {
  return {
    type: CURRENT_CATEGORY,
    payload: { catKey }
  };
};

/*
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
