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
  OPEN_TAGS_MODAL,
  CLOSE_TAGS_MODAL,
  //SAVE_CARDS_SUCCESS,
  //SAVE_CARDS_FAILURE,
  //LOAD_CARDS_SUCCESS,
  //LOAD_CARDS_FAILURE
  UPDATE_CARD_SELECTED,
  DELETE_SELECTED_CARDS
} from '../actions/actionTypes';

const initialState = {
  itemList: [],   // ... array of cards + selected flag (not used anymore) ...
  loading: false,
  lastUpdated: false,
  detailView: false,
  highlighted: '',        // ... the unique key of the currently highlighted item ...
  showTagsScreen: '',     // ... the unique key of the item to be edited ...
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

    case OPEN_TAGS_MODAL:
    case CLOSE_TAGS_MODAL:
      return {
        ...state,
        showTagsScreen: action.payload.key,
        lastUpdated: Date.now()
      };

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

    case HIGHLIGHT_CARD:
      // ... make one item in the list stand out or be selected ...
      return { 
        ...state,
        highlighted: action.payload.key
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

    case ADD_CARD_IMAGE:
      // ... add this image to the card ...
      return { 
        ...state,
        thisCard: { ...state.thisCard, 
          imageThumb: action.payload.image.data, 
          mimeType: action.payload.image.mime
          //image: '',  // ... store this in separate Realm (do this later) ...
        },
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
      };

    case ADD_CARD:
      // ... added in Realm DB - just clear the card input record ...
      ToastAndroid.show('Card Added', ToastAndroid.SHORT);
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

    case CURRENT_CARD:
      return {
        ...state,
        thisCard: {
          key: action.payload.item.key,
          tag: '',
          note: '',
          name: action.payload.item.name,
          desc: action.payload.item.desc,
          icon: action.payload.item.icon,
          iconType: action.payload.item.iconType,
          rating: action.payload.item.rating,
          category: action.payload.item.category,
          image: action.payload.item.image,
          mimeType: action.payload.item.mimeType,
          imageThumb: action.payload.item.imageThumb,
          barcode: action.payload.item.barcode,
          tags: action.payload.item.tags,
          notes: action.payload.item.notes
        },
        detailView: true
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
          iconType: '',
          rating: 0,
          category: '',
          image: '',          // ... image will be stored in it's own realm ...
          mimeType: '',       // ... the mimeType for image & thumbnail will be the same ...
          imageThumb: '',     // ... small image stored for the list ...
          barcode: '',
          tags: [],
          notes: []
        },
        detailView: false
      };

//----------------------------------------------------
// ... these functions need to be fixed for Realm ...
//----------------------------------------------------
    case DELETE_SELECTED_CARDS:
      return {
        ...state,
        itemList: state.itemList.filter(item => {
          return item.selected !== true;
        }),
        detailView: false,
        lastUpdated: Date.now()
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
