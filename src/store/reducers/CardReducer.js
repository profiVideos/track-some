//import people from './people.json';

import {
  ADD_CARD,
  CLEAR_CARD,
  UPDATE_CARD,
  REMOVE_CARD,
  SORT_CARDS, 
  CURRENT_CARD,
  CARD_EDIT_CHANGE,
  SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  LOAD_CARDS_SUCCESS,
  //LOAD_CARDS_FAILURE
  DELETE_SELECTED_CARDS
} from '../actions/actionTypes';

const initialState = {
  itemList: [],
  loading: false,
  cardsDirty: false,
  detailView: false,
  thisCard: {
     key: '',
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

const CardReducer = (state = initialState, action) => {
  //console.log('Card Reducer State: ', state, '  Action: ', action);
  switch (action.type) {

    case CARD_EDIT_CHANGE:
      return {
        ...state,
        thisCard: {
          ...state.thisCard,
          [action.payload.prop]: action.payload.value
        }
      };

    case SORT_CARDS:
      return {
        ...state,
        itemList: state.itemList.slice().sort((a, b) => compareString(a.name, b.name)),
        cardsDirty: true
      };

    case DELETE_SELECTED_CARDS:
      return {
        ...state,
        itemList: state.itemList.filter(item => {
          return item.selected !== true;
        }),
        detailView: false,
        cardsDirty: true
      };

    case ADD_CARD:
      // ... add this item to the top of the card list ...
      return { 
        ...state,
        itemList: [{
           key: action.payload.key,
          name: action.payload.name,
          desc: action.payload.desc,
          icon: action.payload.icon,
          selected: false },
          ...state.itemList
        ],
        cardsDirty: true
      };

    case UPDATE_CARD:
      return {
        ...state,
        itemList: state.itemList.map(card => 
          (card.key === action.payload.key ? 
            { ...card, 
              name: action.payload.name,
              desc: action.payload.desc,
              icon: action.payload.icon,
              selected: action.payload.isSelected } : card)),
        cardsDirty: true 
      };

    case REMOVE_CARD:
      return {
        ...state,
        categories: state.categories.filter(card => {
          return card.key !== action.payload.key;
        }),
        thisCard: {
           key: '',
          name: '',
          desc: '',
          icon: ''
        }
      };

    case CLEAR_CARD:
      return {
        ...state,
        thisCard: {
           key: '',
          name: '',
          desc: '',
          icon: ''
        }
      };

    case CURRENT_CARD:
      return {
        ...state,
        detailView: true,
        cardFound: state.categories.find(card => {
          return card.key === action.payload.key;
        }),
        thisCard: {
           key: this.cardFound.key,
          name: this.cardFound.name,
          desc: this.cardFound.desc,
          icon: this.cardFound.icon
        }
      };

    case LOAD_CARDS_SUCCESS:
      // ... restore the user's card list ...
      return { 
        ...state,
        itemList: action.payload.itemList
      };

    case SAVE_CARDS_SUCCESS:
      return {
        ...state,
        cardsDirty: false,   // ... list has been saved ...
        thisCard: {       // ... clear the current record ...
           key: '',
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

export default CardReducer;
