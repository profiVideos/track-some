//import people from './people.json';

import {
  ADD_EMOJI, 
  //LOAD_EMOJIS,
  //SORT_EMOJIS,        // ... gets the current emojis database (from JSON File / Async / Firebase)
  //UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI,
  CLEAR_EMOJI,
} from '../actions/actionTypes';

const GUID = function (append) {   // ... nice function to create a unique id ...
    let d = new Date().getTime();
    const uuid = 'xxxx-xxxx-xxxx'.replace(/[xy]/g, (c) => {
        const r = (d + (Math.random() * 16)) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    return append ? `${uuid}-${append}` : uuid;
};

const initialState = {
  emojiCode: '',
  emojiName: '',
  myEmojis: [],
  detailView: false
};

const EmojiReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_EMOJI:
      // ... add this item to the top of the user's emoji list ...
      return { 
        ...state,
        myEmojis: [{
          key: GUID(),
          emoji: action.payload.emoji,
          name: action.payload.name,
          numUsed: 1 },
          ...state.myEmojis
        ]
      };

    case REMOVE_EMOJI:
      return {
        ...state,
        myEmojies: state.myEmojies.filter(item => {
          return item.key !== action.payload.key;
        }),
        emojiCode: '',
        emojiName: '',
        detailview: false
      };

    case CURRENT_EMOJI:
      return {
        ...state,
        emojiCode: action.payload.emoji,
        emojiName: action.payload.name,
        detailView: true
      };

    case CLEAR_EMOJI:
      return {
        ...state,
        emojiCode: '',
        emojiName: '',
        detailView: false
      };
/*
    case 'INITIAL_FETCH':
      return {
        ...state,
        categories: action.payload
      };
    case UPDATE_EMOJI:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case FIND_EMOJI:
      return {
        ...state,
        detailView: true,
        catSelected: state.categories.find(category => {
          return category.catId === action.payload.catId;
        })
      };
*/

    default: return state;
  
  }
};

export default EmojiReducer;
