// ... later (uses Async & thunk - import firebase from 'firebase';
import {
  NEW_CATEGORY,
  ADD_CATEGORY, 
  UPDATE_CATEGORY, 
  REMOVE_CATEGORY,
  SELECT_CATEGORY,
  UNSELECT_CATEGORY,
//  INITIAL_CATEGORIES  ... gets initial state of the categories (from Async / Firebase)
} from './actionTypes';

export const newCategory = () => {
  return {
    type: NEW_CATEGORY
  };
};

export const addCategory = (catId, catName, catDesc, catIcon) => {
  return {
    type: ADD_CATEGORY,
    payload: { catId, catName, catDesc, catIcon }
  };
};

export const updateCategory = ({ prop, value }) => {
  return {
    type: UPDATE_CATEGORY,
    payload: { prop, value }
  };
};

export const removeCategory = (catId) => {
  return {
    type: REMOVE_CATEGORY,
    payload: { catId }
  };
};

export const selectCategory = (catId) => {
  return {
    type: SELECT_CATEGORY,
    payload: catId
  };
};

export const unselectCategory = () => {
  return {
    type: UNSELECT_CATEGORY
  };
};

/*

  //console.log('inside selectCategory');
  //console.log(categoryDetails);

export const formUpdate = ({ prop, value }) => {
  return {
    type: 'FORM_UPDATE',
    payload: { prop, value }
  };
};

export const createNewContact = ({ 
  first_name, last_name, phone, email, company, project, notes }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .push({ first_name, last_name, phone, email, company, project, notes })
      .then(() => {
        dispatch({ type: 'NEW_CONTACT' });
    });
  };
};

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
