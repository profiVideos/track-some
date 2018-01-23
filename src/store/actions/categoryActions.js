// ... later (uses Async & thunk - import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  //SORT_CATEGORIES, 
  CURRENT_CATEGORY,
  //PURGE_CATEGORIES,
  CATEGORIES_STORAGE_KEY,
  SAVE_CATEGORIES_SUCCESS,
  //SAVE_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS,
  //LOAD_CATEGORIES_FAILURE
} from './actionTypes';

export const addCategory = (catKey, catName, catDesc, catIcon) => {
  return {
    type: ADD_CATEGORY,
    payload: { catKey, catName, catDesc, catIcon }
  };
};

export const updateCategory = ({ catKey, catName, catDesc, catIcon }) => {
  return {
    type: UPDATE_CATEGORY,
    payload: { catKey, catName, catDesc, catIcon }
  };
};

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

export const categoriesLoadSuccess = (jsonData) => {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: { itemList: jsonData }
  };
};

export const loadCategories = () => {
  return dispatch => {
    AsyncStorage.getItem(CATEGORIES_STORAGE_KEY, (errorMsg, jsonData) => {
      if (jsonData !== null) dispatch(categoriesLoadSuccess(JSON.parse(jsonData)));
    });
  };
};

/*
export const loadInitialContacts = () => { 
  const { currentUser } = firebase.auth();
  console.log('inside loadInitialContacts - user is:');
  console.log(currentUser);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .on('value', snapshot => {
        dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() });
    });
  };
};
*/
