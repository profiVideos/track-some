import {
  ADD_EMOJI,
  CLEAR_EMOJI,
  UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI,
  DELETE_ALL_EMOJIS,  
  LOAD_EMOJIS_SUCCESS,    // ... gets the current emojis database ...
  DELETE_SELECTED_EMOJIS
} from '../actions/actionTypes';

const initialState = {
  emojiCode: '',
  emojiName: '',
  myEmojis: [],
  lastUpdated: null,
  detailView: false
};

const EmojiReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_EMOJI:
    case UPDATE_EMOJI:
      return { 
        ...state,
        myEmojis: action.payload.emojis,
        lastUpdated: Date.now()
      };

    case DELETE_ALL_EMOJIS:
    case DELETE_SELECTED_EMOJIS:
      return {
        ...state,
        myEmojis: action.payload.emojis,
        detailView: false,
        lastUpdated: Date.now()
      };

    case REMOVE_EMOJI:
      // ... fix this one for Realm DB ...
      return {
        ...state,
        myEmojis: state.myEmojis.filter(item => {
          return item.key !== action.payload.key;
        }),
        emojiCode: '',
        emojiName: '',
        detailview: false,
        lastUpdated: Date.now()
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

    default: return state;
  
  }  // ... switch ...
};

export default EmojiReducer;

/*
    case SORT_EMOJIS:
      return {
        ...state,
        myEmojis: state.myEmojis.slice().sort((a, b) => compareNum(a.numUsed, b.numUsed)),
        emojisDirty: true
      };

    case FIND_EMOJI:
      return {
        ...state,
        detailView: true,
        catSelected: state.categories.find(category => {
          return category.catId === action.payload.catId;
        })
      };

    case SAVE_EMOJIS_FAILURE:
      // ... show user a proper notification about the save error and show developer ...
      console.error('Error - Failed to save Emojis with error: ', action.payload.error);
      Alert.alert('Your favorite Emojis will only be saved when you are logged in!');
      return state;  // ... nothing to change in store ...

*/
