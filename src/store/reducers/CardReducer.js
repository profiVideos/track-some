import { ToastAndroid } from 'react-native';
import {
  ADD_CARD,
  //SORT_CARDS, 
  CLEAR_CARD,
  UPDATE_CARD,
  REMOVE_CARD,
  CURRENT_CARD,
  ADD_CARD_TAG,              // ... NEW ...
  ADD_CARD_IMAGE,            // ... NEW ...
  HIGHLIGHT_CARD,            // ... NEW ...
  CARD_EDIT_CHANGE,
  //SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  LOAD_CARDS_SUCCESS,
  //LOAD_CARDS_FAILURE
  UPDATE_CARD_SELECTED,
  DELETE_SELECTED_CARDS
} from '../actions/actionTypes';

const initialState = {
  itemList: [],   // ... array of cards + selected flag ...
  loading: false,
  lastUpdated: false,
  detailView: false,
  highlighted: '',      // ... the unique key of the currently highlighted item ...
  thisCard: {
    key: '',
    tag: '',
    note: '',
    name: '',
    desc: '',
    icon: '',
    iconType: '',       // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    rating: 0,
    category: '',
    image: '',          // ... image will be stored in it's own realm ...
    mimeType: '',       // ... the mimeType for image & thumbnail will be the same ...
    imageThumb: '',     // ... small image stored for the list ...
    barcode: '',
    tags: [],
    notes: []
  }
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

    case UPDATE_CARD_SELECTED:
      // ... added in Realm DB - just update date to get a list refresh ...
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case UPDATE_CARD:
      // ... added in Realm DB - just show something happened ...
      ToastAndroid.show('Card Updated', ToastAndroid.SHORT);
      return {
        ...state,
        lastUpdated: Date.now()
      };

    case REMOVE_CARD:
      // ... deleted in Realm DB - just show something happened ...
      ToastAndroid.show('Card Deleted', ToastAndroid.LONG);
      //-----------------------------------------------------------------------------
      // ... we should really do this within a transaction so we could roll back ...
      //-----------------------------------------------------------------------------
      return {
        ...state,
        detailView: false,
        lastUpdated: Date.now()
      };

    case DELETE_SELECTED_CARDS:
      return {
        ...state,
        itemList: state.itemList.filter(item => {
          return item.selected !== true;
        }),
        detailView: false,
        lastUpdated: Date.now()
      };

    case ADD_CARD_IMAGE:
      // ... add this image to the card ...
      return { 
        ...state,
        thisCard: { ...state.thisCard, 
          imageThumb: action.payload.image.data, 
          mimeType: action.payload.image.mime
          //image: '',  // ... store this in separate Realm (do this later) ...
        },
        //lastUpdated: Date.now() - don't set this yet as card is not saved (like adding a field)
      };

/*
  uri: action.payload.image.path, 
  width: action.payload.image.width, 
  height: action.payload.image.height,
  size: action.payload.image.size,
  mimeType: action.payload.image.mime,
  created: action.payload.image.modificationDate,
  base64: action.payload.image.data
*/

    case ADD_CARD_TAG:
      // ... add this item to this card's tag list ...
      return { 
        ...state,
        thisCard: { ...state.thisCard, 
          tag: '', 
          tags: [ 
            ...state.thisCard.tags,
            action.payload.tag
          ]
        },
        //lastUpdated: Date.now() - don't set this as card is not saved (like adding a field)
      };

    case ADD_CARD:
      // ... added in Realm DB - just clear the card input record ...
      ToastAndroid.show('Card Successfully Added', ToastAndroid.SHORT);
      return { 
        ...state,
        thisCard: {
          key: '',
          tag: '',
          note: '',
          name: '',
          desc: '',
          icon: '',
          iconType: '',       // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
          rating: 0,
          category: '',
          image: '',          // ... image will be stored in it's own realm ...
          mimeType: '',       // ... the mimeType for image & thumbnail will be the same ...
          imageThumb: '',     // ... small image stored for the list ...
          barcode: '',
          tags: [],
          notes: []
        },
        lastUpdated: Date.now()
      };

    case HIGHLIGHT_CARD:
      // ... make one item in the list stand out or be selected ...
      return { 
        ...state,
        highlighted: action.payload.key
      };

    case CLEAR_CARD:
      return {
        ...state,
        thisCard: {
          key: '',
          tag: '',
          note: '',
          name: '',
          desc: '',
          icon: '',
          thumb: '',
          rating: 0,
          category: '',
          image: {},
          barcode: {},
          tags: [],
          notes: []
        },
        detailView: false
      };

    case CURRENT_CARD:
      return {
        ...state,
        cardFound: state.itemList.find(card => {
          return card.key === action.payload.key;
        }),
        thisCard: {
          key: this.cardFound.key,
          name: this.cardFound.name,
          desc: this.cardFound.desc,
          icon: this.cardFound.icon,
          thumb: this.cardFound.thumb,
          rating: this.cardFound.rating,
          category: this.cardFound.category,
          image: this.cardFound.image,
          barcode: this.cardFound.barcode,
          tags: this.cardFound.tags,
          notes: this.cardFound.notes
        },
        detailView: true
      };

    default: return state;
  
  }
};

export default CardReducer;

/*
    case SORT_CARDS:
      return {
        ...state,
        itemList: state.itemList.slice().sort((a, b) => compareString(a.name, b.name)),
        lastUpdated: Date.now()
     };

    case LOAD_CARDS_SUCCESS:
      // ... restore the user's card list ...
      return { 
        ...state,
        itemList: action.payload.itemList
      };

    case 'INITIAL_FETCH':
      return {
        ...state,
        categories: action.payload
      };
*/
