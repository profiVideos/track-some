//import people from './people.json';

import {
  NEW_CATEGORY,
  ADD_CATEGORY, 
  UPDATE_CATEGORY, 
//  REMOVE_CATEGORY,
  SELECT_CATEGORY,
  UNSELECT_CATEGORY,
//  INITIAL_CATEGORIES
} from '../actions/actionTypes';

const initialState = {
  categories: '',
  detailView: false,
  catSelected: null,
  catId: '',
  catName: '',
  catIcon: null,
  loading: false
};

export default (state = initialState, action) => {
  console.log('inside CategoryReducer - Action is ... ');
  console.log(state, action);
  switch (action.type) {

    case NEW_CATEGORY:
      return {
        ...state,
        catId: '',
        catName: '',
        catIcon: null
      };

    case ADD_CATEGORY:
      return {
        ...state,
        ...action.newCategory     // ... MG ??? Where is this defined ??? ...
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        detailView: true,
        catSelected: action.payload
      };

    case UNSELECT_CATEGORY:
      return {
        ...state,
        detailView: false,
        catSelected: null
      };

/*
    case 'INITIAL_FETCH':
      return {
        ...state,
        categories: action.payload
      };
*/

    default: return state;
  
  }
};
