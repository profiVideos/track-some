//import people from './people.json';

import {
  NEW_CATEGORY,
  ADD_CATEGORY, 
  UPDATE_CATEGORY, 
  REMOVE_CATEGORY,
  SELECT_CATEGORY,
  UNSELECT_CATEGORY,
//  INITIAL_CATEGORIES
} from '../actions/actionTypes';

const initialState = {
  itemList: [],
  loading: false,
  detailView: false,
  catSelected: null,
  catId: '',
  catName: '',
  catDesc: '',
  catIcon: null
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case NEW_CATEGORY:
      return {
        ...state,
        catId: '',
        catName: '',
        catDesc: '',
        catIcon: null
      };

    case ADD_CATEGORY:
      return {
        ...state,
        itemList: state.itemList.concat({   // ... need to add this to the list of categories ...
          key: Math.random(),   // ... must be unique key - use timestamp ??? ...
          name: action.payload.catName,
          desc: action.payload.catDesc,
          icon: action.payload.catIcon
        })
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => {
          return category.catId !== action.payload.catId;
        }),
        catSelected: null
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        detailView: true,
        catSelected: state.categories.find(category => {
          return category.catId === action.payload.catId;
        })
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

export default CategoryReducer;
