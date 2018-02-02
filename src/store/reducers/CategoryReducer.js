//import people from './people.json';

import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  CURRENT_CATEGORY,
  DELETE_SELECTED_CATS,
  CATEGORY_EDIT_CHANGE,
  //SAVE_CATEGORIES_SUCCESS,
  //SAVE_CATEGORIES_FAILURE,
  LOAD_CATEGORIES_SUCCESS,
  //LOAD_CATEGORIES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  itemList: [],
  loading: false,   // ... not used t the moment ...
  detailView: false,
  lastUpdated: null,
  catCurrent: {
    name: '',
    desc: '',
    icon: ''
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
        }
      };

    case ADD_CATEGORY:
      return { 
        ...state,
        itemList: action.payload.itemList,
        catCurrent: {
          name: '',
          desc: '',
          icon: ''
        },
        lastUpdated: Date.now()
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        itemList: action.payload.itemList,
        lastUpdated: Date.now()
      };

    case DELETE_SELECTED_CATS:
      return {
        ...state,
        itemList: action.payload.itemList,
        detailView: false,
        lastUpdated: Date.now()
      };

    case REMOVE_CATEGORY:
      //-------------------------------------------
      // ... fix this routine to reflect Realm ...
      //-------------------------------------------
      return {
        ...state,
        categories: state.categories.filter(category => {
          return category.catId !== action.payload.catId;
        }),
        catCurrent: {
          name: '',
          desc: '',
          icon: ''
        }
      };

    case CLEAR_CATEGORY:
      return {
        ...state,
        catCurrent: {
          name: '',
          desc: '',
          icon: ''
        }
      };

    case CURRENT_CATEGORY:
      //-------------------------------------------
      // ... fix this routine to reflect Realm ...
      //-------------------------------------------
      return {
        ...state,
        detailView: true,
        catFound: state.categories.find(category => {
          return category.catKey === action.payload.catKey;
        }),
        catCurrent: {
          name: this.catFound.name,
          desc: this.catFound.desc,
          icon: this.catFound.icon
        }
      };

    case LOAD_CATEGORIES_SUCCESS:
      // ... restore the user's category list ...
      return { 
        ...state,
        itemList: action.payload.itemList
      };

    default: return state;
  
  }
};

export default CategoryReducer;
