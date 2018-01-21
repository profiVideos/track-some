import { Alert } from 'react-native';
import {
  ADD_EMOJI,
  CLEAR_EMOJI,
  SAVE_EMOJIS_FAILURE, 
  LOAD_EMOJIS_SUCCESS,    // ... the current emojis ( AsyncStorage / Cloud Storage )
  //LOAD_EMOJIS_FAILURE,   // ... the current emojis ( AsyncStorage / Cloud Storage )
  SORT_EMOJIS,
  //PURGE_EMOJIS,
  UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI
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

/*
const compareString = (a, b) => {
  const itemA = a.toUpperCase(); // ignore upper and lowercase
  const itemB = b.toUpperCase(); // ignore upper and lowercase
  if (itemA < itemB) return -1;
  if (itemA > itemB) return 1;
  return 0;  // ... items are equal ...
};
*/

const compareNum = (a, b) => {
  return b - a;  // ... reverse sort ...
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

    case UPDATE_EMOJI:
      //console.log('Yippie - Will now update this Emoji: ', action.payload.key);
      // ... update this emoji in our emoji object list ...
      return {
        ...state,
        myEmojis: state.myEmojis.map(emoji => 
          (emoji.key === action.payload.key ? 
            { ...emoji, numUsed: action.payload.numUsed } : emoji)) 
      };

    case REMOVE_EMOJI:
      return {
        ...state,
        myEmojis: state.myEmojis.filter(item => {
          return item.key !== action.payload.key;
        }),
        emojiCode: '',
        emojiName: '',
        detailview: false
      };

/*
        sorted=${JSON.stringify(state.myEmojis.slice().sort(sortByKey('name')))}`);    
        sorted=${JSON.stringify(state.myEmojis.slice().sort((a,b) => a.name > b.name))}`);    
      console.log(`state=${JSON.stringify(state.myEmojis)}\n
        sorted=${JSON.stringify(state.myEmojis.sort((a, b) => 
          compareNum(a.numUsed, b.numUsed)))}`);    
*/

    case SORT_EMOJIS:
      return {
        ...state,
        myEmojis: state.myEmojis.slice().sort((a, b) => compareNum(a.numUsed, b.numUsed))
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

    case LOAD_EMOJIS_SUCCESS:
      // ... restore the user's emoji list ...
      return { 
        ...state,
        myEmojis: action.payload.emojis
      };

    case SAVE_EMOJIS_FAILURE:
      // ... show user a proper notification about the save error and show developer ...
      console.error('Error - Failed to save Emojis with error: ', action.payload.error);
      Alert.alert('Your favorite Emojis will only be saved when you are logged in!');
      return state;  // ... nothing to change in store ...

    default: return state;
  
  }  // ... switch ...
};

export default EmojiReducer;

/*
    case 'INITIAL_FETCH':
      return {
        ...state,
        categories: action.payload
      };
    case UPDATE_EMOJI:
      return {
        ...state,
        var index = getIndex(quotes, quote.id); //find the index of the quote with the id passed
        if (index !== -1) {
            quotes[index]['author'] = quote.author;
            quotes[index]['quote'] = quote.quote;
        }
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
