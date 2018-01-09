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
  detailView: false,
  catSelected: null,
  catId: '',
  catName: '',
  catIcon: null,
  loading: false
};

const CategoryReducer = (state = initialState, action) => {
  //console.log('---------------------------------------');
  //console.log('inside CategoryReducer - State & Action = ');
  //console.log(state, action);
  //console.log('---------------------------------------');
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
        itemList: state.itemList.concat({
          key: Math.random(),
          name: action.payload.catDesc,
          icon: action.payload.catIcon
        })
      };

/*
        itemList: state.itemList.concat({  // ... need to add this to the list of categories ...
          catId: action.payload.catId,
          catName: action.payload.catDesc,
          catIcon: action.payload.catIcon
        })
*/


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
