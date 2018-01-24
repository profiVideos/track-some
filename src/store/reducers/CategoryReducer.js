//import people from './people.json';

import {
  ADD_CATEGORY,
  CLEAR_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  SORT_CATEGORIES, 
  CURRENT_CATEGORY,
  DELETE_SELECTED_CATS,
  CATEGORY_EDIT_CHANGE,
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
    name: '',
    desc: '',
    icon: ''
  }
};

const compareString = (a, b) => {
  const itemA = a.toUpperCase(); // ignore upper and lowercase
  const itemB = b.toUpperCase(); // ignore upper and lowercase
  if (itemA < itemB) return -1;
  if (itemA > itemB) return 1;
  return 0;  // ... items are equal ...
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

    case SORT_CATEGORIES:
      return {
        ...state,
        itemList: state.itemList.slice().sort((a, b) => compareString(a.name, b.name)),
        catsDirty: true
      };

    case DELETE_SELECTED_CATS:
      return {
        ...state,
        itemList: state.itemList.filter(item => {
          return item.selected !== true;
        }),
        detailView: false,
        catsDirty: true
      };

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
        itemList: state.itemList.map(category => 
          (category.key === action.payload.key ? 
            { ...category, 
              name: action.payload.name,
              desc: action.payload.desc,
              icon: action.payload.icon,
              selected: action.payload.isSelected } : category)),
        catsDirty: true 
      };

    case REMOVE_CATEGORY:
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

    case SAVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        catsDirty: false,   // ... list has been saved ...
        catCurrent: {       // ... clear the current record ...
          name: '',
          desc: '',
          icon: ''
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
