//import people from './people.json';

import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  //SORT_CATEGORIES, 
  CURRENT_CATEGORY,
  //PURGE_CATEGORIES,
  SAVE_CATEGORIES_SUCCESS,
  //SAVE_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS,
  //LOAD_CATEGORIES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  itemList: [],
  loading: false,
  catsDirty: false,
  detailView: false,
  catCurrent: {
    itemName: '',
    itemDesc: '',
    itemIcon: ''
  }
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CATEGORY:
      // ... add this item to the top of the category list ...
      return { 
        ...state,
        itemList: [{
           key: action.payload.catKey,
          name: action.payload.catName,
          desc: action.payload.catDesc,
          icon: action.payload.catIcon,
          selected: false },
          ...state.itemList
        ],
        catsDirty: true
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
        catCurrent: {
          itemName: '',
          itemDesc: '',
          itemIcon: ''
        }
      };

    case CLEAR_CATEGORY:
      return {
        ...state,
        catCurrent: {
          itemName: '',
          itemDesc: '',
          itemIcon: ''
        }
      };

    case CURRENT_CATEGORY:
      return {
        ...state,
        detailView: true,
        catFound: state.categories.find(category => {
          return category.catKey === action.payload.catKey;
        }),
        catCurrent: {
          itemName: this.catFound.name,
          itemDesc: this.catFound.desc,
          itemIcon: this.catFound.icon
        }
      };

    case LOAD_CATEGORIES_SUCCESS:
      // ... restore the user's category list ...
      return { 
        ...state,
        itemList: action.payload.itemList
      };

    case SAVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        catsDirty: false,   // ... list has been saved ...
        catCurrent: {       // ... clear the current record ...
          itemName: '',
          itemDesc: '',
          itemIcon: ''
        }
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
