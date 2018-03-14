export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_START = 'LOGIN_START';
export const INITIALIZED = 'INITIALIZED';
export const ROOT_CHANGED = 'ROOT_CHANGED';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';

export const CONNECTION_STATE = 'CONNECTION_STATE';
export const BACKUP_SYNC_START = 'BACKUP_SYNC_START';
export const BACKUP_SYNC_FINISH = 'BACKUP_SYNC_FINISH';

export const LOGOUT_USER_OK = 'LOGOUT_USER_OK';
export const LOGIN_ERROR_MSG = 'LOGIN_ERROR_MSG';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

//export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
//export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
//export const FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL';

// ... a global flag used to see if user has logged in and is paid member (members='cloud') ...
export const SET_SAVE_MODE = 'SET_SAVE_MODE';  // ... 'none', 'local', 'cloud' ...
export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const SEARCH_CARDS_CHANGED = 'SEARCH_CARDS_CHANGED';
export const SEARCH_NOTES_CHANGED = 'SEARCH_NOTES_CHANGED';

// ... everything dealing with emojis ...
//export const EMOJIS_STORAGE_KEY = '@track!some:my_emojis';
export const ADD_EMOJI = 'ADD_EMOJI'; 
export const CLEAR_EMOJI = 'CLEAR_EMOJI';
export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const REMOVE_EMOJI = 'REMOVE_EMOJI';
export const CURRENT_EMOJI = 'CURRENT_EMOJI';
export const SORT_EMOJIS = 'SORT_EMOJIS';
export const SAVE_EMOJIS_SUCCESS = 'SAVE_EMOJIS_SUCCESS';
export const SAVE_EMOJIS_FAILURE = 'SAVE_EMOJIS_FAILURE';
export const LOAD_EMOJIS_SUCCESS = 'LOAD_EMOJIS_SUCCESS';
export const LOAD_EMOJIS_FAILURE = 'LOAD_EMOJIS_FAILURE';
export const DELETE_ALL_EMOJIS = 'DELETE_ALL_EMOJIS';
export const DELETE_SELECTED_EMOJIS = 'DELETE_SELECTED_EMOJIS';

// ... everything dealing with categories ...
//export const CATEGORIES_STORAGE_KEY = '@track!some:my_categories';
export const CATEGORY_EDIT_CHANGE = 'CATEGORY_EDIT_CHANGE';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY';
export const HIGHLIGHT_CATEGORY = 'HIGHLIGHT_CATEGORY';
export const UPDATE_CAT_SELECTED = 'UPDATE_CAT_SELECTED';
//export const SORT_CATEGORIES = 'SORT_CATEGORIES';
export const SAVE_CATEGORIES_SUCCESS = 'SAVE_CATEGORIES_SUCCESS';
export const SAVE_CATEGORIES_FAILURE = 'SAVE_CATEGORIES_FAILURE';
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';
export const DELETE_SELECTED_CATS = 'DELETE_SELECTED_CATS';

// ... all our popup or modal windows ...
export const OPEN_TAGS_MODAL = 'OPEN_TAGS_MODAL';
export const CLOSE_TAGS_MODAL = 'CLOSE_TAGS_MODAL';
export const OPEN_NOTES_MODAL = 'OPEN_NOTES_MODAL';
export const CLOSE_NOTES_MODAL = 'CLOSE_NOTES_MODAL';
export const OPEN_CARDS_MODAL = 'OPEN_CARDS_MODAL';
export const CLOSE_CARDS_MODAL = 'CLOSE_CARDS_MODAL';
export const OPEN_LISTS_MODAL = 'OPEN_LISTS_MODAL';
export const CLOSE_LISTS_MODAL = 'CLOSE_LISTS_MODAL';

// ... everything dealing with cards ...
export const CARDS_STORAGE_KEY = '@track!some:my_cards';
export const CARD_EDIT_CHANGE = 'CARD_EDIT_CHANGE';
export const ADD_CARD = 'ADD_CARD';
export const GET_CARD = 'GET_CARD';
export const ADD_CARD_TAG = 'ADD_CARD_TAG';
export const ADD_CARD_NOTE = 'ADD_CARD_NOTE';
export const ADD_CARD_IMAGE = 'ADD_CARD_IMAGE';
export const CLEAR_CARD = 'CLEAR_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_CARD_TAGS = 'UPDATE_CARD_TAGS';
export const UPDATE_CARD_NOTES = 'UPDATE_CARD_NOTES';
export const HIGHLIGHT_CARD = 'HIGHLIGHT_CARD';
export const UPDATE_CARD_SELECTED = 'UPDATE_CARD_SELECTED';
export const REMOVE_CARD = 'REMOVE_CARD';
export const CURRENT_CARD = 'CURRENT_CARD';
export const SORT_CARDS = 'SORT_CARDS';
export const SAVE_CARDS_SUCCESS = 'SAVE_CARDS_SUCCESS';
export const SAVE_CARDS_FAILURE = 'SAVE_CARDS_FAILURE';
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
export const LOAD_CARDS_FAILURE = 'LOAD_CARDS_FAILURE';
export const DELETE_CARD_TAG = 'DELETE_CARD_TAG';
export const DELETE_CARD_NOTE = 'DELETE_CARD_NOTE';
export const DELETE_SELECTED_CARDS = 'DELETE_SELECTED_CARDS';

export const ADD_NOTE = 'ADD_NOTE';
export const SORT_NOTES = 'SORT_NOTES'; 
export const CLEAR_NOTE = 'CLEAR_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const CURRENT_NOTE = 'CURRENT_NOTE';
export const HIGHLIGHT_NOTE = 'HIGHLIGHT_NOTE';
export const NOTE_EDIT_CHANGE = 'NOTE_EDIT_CHANGE';
export const DELETE_CARD_NOTES = 'DELETE_CARD_NOTES';
export const TOGGLE_PHOTO_VIEWER = 'TOGGLE_PHOTO_VIEWER';
export const TOGGLE_COLOR_PICKER = 'TOGGLE_COLOR_PICKER';
export const UPDATE_NOTE_SELECTED = 'UPDATE_NOTE_SELECTED';
export const DELETE_SELECTED_NOTES = 'DELETE_SELECTED_NOTES';

export const ADD_LIST = 'ADD_LIST';
export const CLEAR_LIST = 'CLEAR_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const CURRENT_LIST = 'CURRENT_LIST';
export const ADD_LIST_IMAGE = 'ADD_LIST_IMAGE';
export const HIGHLIGHT_LIST = 'HIGHLIGHT_LIST';
export const LIST_EDIT_CHANGE = 'LIST_EDIT_CHANGE';
export const SORT_LISTS = 'SORT_LISTS'; 
export const UPDATE_LIST_SELECTED = 'UPDATE_LIST_SELECTED';
export const DELETE_SELECTED_LISTS = 'DELETE_SELECTED_LISTS';

//export const ADD_TAG = 'add_tag';
//export const UPDATE_TAG = 'update_tag';
//export const REMOVE_TAG = 'remove_tag';
