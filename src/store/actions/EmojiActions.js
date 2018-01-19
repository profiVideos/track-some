//import { connect } from 'react-redux';
// ... later (uses Async & thunk - import firebase from 'firebase';

import {
  ADD_EMOJI,
  CLEAR_EMOJI,
  SORT_EMOJIS,
  PURGE_EMOJIS,
  UPDATE_EMOJI, 
  REMOVE_EMOJI,
  CURRENT_EMOJI,
  SAVE_EMOJIS_FAILURE,   // ... no need to dispatch an operation that does not affect the store ...
  LOAD_EMOJIS_SUCCESS,    // ... gets the current emojis database ( AsyncStorage / Cloud Storage )
  LOAD_EMOJIS_FAILURE    // ... reports an error condition to the store / user )
} from './actionTypes';

const STORAGE_KEY = '@track!some:my_emojis';

export const addEmoji = (emoji, name) => {
  return {
    type: ADD_EMOJI,
    payload: { emoji, name }
  };
};

export const currentEmoji = (emoji, name) => {
  return {
    type: CURRENT_EMOJI,
    payload: { emoji, name }
  };
};

export const clearEmoji = () => {
  return {
    type: CLEAR_EMOJI
  };
};

export const updateEmoji = (key, numUsed) => {
  return {
    type: UPDATE_EMOJI,
    payload: { key, numUsed }
  };
};

export const removeEmoji = (key) => {
  return {
    type: REMOVE_EMOJI,
    payload: { key }
  };
};


/*
return dispatch => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myEmojis))
      .then(console.log('Saved these Emojis', myEmojis))
      .catch((error) => {
        console.log('Error - Failed to save name.', error);
        //dispatch({
        //  type: SAVE_EMOJIS_FAILURE,
        //  payload: error
        //});
      });
*/

export const emojiLoadSuccess = (jsonData) => {
  //console.log('jsonData is ', jsonData);
  return {
    type: LOAD_EMOJIS_SUCCESS,
    payload: { emojis: jsonData }
  };
};

//  clearPosts: () => async (dispatch, getState) => {
//    if (getState().posts.length > 0) {
//      dispatch({type: types.CLEAR_POSTS})
//    }
//  }
//  return (dispatch) => {

//export const saveMyEmojis = async (myEmojis) => {
/*

    payload: { emojis: JSON.parse(jsonData) }

  return () => {
    const response = await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myEmojis));  
    await console.log('response: ', response);
  }
};

    AsyncStorage.getItem('data', (err, quotes) => {
      if (quotes !== null){
        quotes = JSON.parse(quotes);
        quotes.unshift(quote); //add the new quote to the top
        AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
            dispatch({type: ADD_QUOTE, quote:quote});
        });
      }
    });

*/
/*
export const saveMyEmojis = (myEmojis) => { 
  console.log('about to save emojis', myEmojis);
  return (dispatch) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myEmojis), () => {
      console.log('saved something', 'Really!');
      //dispatch({ type: ADD_QUOTE, quote:quote });
    });
  };
};
*/
/*
  console.log('about to save emojis', myEmojis);
  try {
    //this.setState({name})
    console.error('Supposedly saved data??');
  } catch (errorMsg) {
    console.error('Failed to save Emojis: ', errorMsg);
  }
};
*/


/*
export const loadMyEmojis = (msg) => {
  AsyncStorage.getItem(STORAGE_KEY)
    .then(jsonData => console.log('Got this data: ', jsonData, msg))
    .catch(error => console.log('Error - Failed to save name.', error));
      //dispatch({
      //  type: SAVE_EMOJIS_FAILURE,
      //  payload: error
      //});
};
*/
//processPromise(response)
//const processPromise = (response) => {
//  console.log('The result of the promise is: ', response);
//};

export const saveMyEmojis = (myEmojis) => {
  // ... here result is normally undefinded and error is null (very strange) ...
  /*
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myEmojis))
    .then(console.log('Saved these Emojis', myEmojis))
    .catch(error => {
      console.log('Error - Failed to save name.', error);
      //dispatch({
      //  type: SAVE_EMOJIS_FAILURE,
      //  payload: error
      //});
  });
  */
};

/*
export const loadMyEmojis = () => {
  //console.log('Making the call to AsyncStorage ...', STORAGE_KEY);
  //console.log('Message is ', props);
  AsyncStorage.getItem(STORAGE_KEY, (errorMsg, jsonData) => {
    console.log(JSON.parse(jsonData));
    return (dispatch) => {
      dispatch(emojiLoadSuccess(JSON.parse(jsonData)));
    };
    //props.dispatch({ type: LOAD_EMOJIS_SUCCESS, payload: JSON.parse(jsonData) });
  });
};
*/

  //const promise = AsyncStorage.getItem(STORAGE_KEY, result => processPromise(result));
  //console.log('promise is: ', promise, '***', msg);
/*
    .then(jsonData => {
      console.log('Got something here!', jsonData);
      //return { type: LOAD_EMOJIS_SUCCESS, payload: jsonData };  
      //dispatch(emojiLoadSuccess(jsonData));
    })
    .catch(error => {
      console.log('Error - Failed to load emojis: ', error);
      //dispatch({
      //  type: LOAD_EMOJIS_FAILURE,
      //  payload: error
      //});
    });
*/

export const sortMyEmojis = () => {
  return {
    type: SORT_EMOJIS
  };
};

export const deleteMyEmojis = () => {
  return {
    type: PURGE_EMOJIS
  };
};


/*

-------------------------------------------------------------------------------------------------

Actions

An action MUST
be a plain JavaScript object.
have a type property.

An action MAY
have an error property.
have a payload property.
have a meta property.

An action MUST NOT include properties other than type, payload, error, and meta.

type
The type of an action identifies to the consumer the nature of the action that has occurred. 
type is a string constant. If two types are the same, 
they MUST be strictly equivalent (using ===).

payload
The optional payload property MAY be any type of value. It represents the payload of the action. 
Any information about the action that is not the type or status of the action should be part 
of the payload field.

By convention, if error is true, the payload SHOULD be an error object. 
This is akin to rejecting a promise with an error object.

error
The optional error property MAY be set to true if the action represents an error.

An action whose error is true is analogous to a rejected Promise. 
By convention, the payload SHOULD be an error object.

If error has any other value besides true, including undefined and null, 
the action MUST NOT be interpreted as an error.

meta
The optional meta property MAY be any type of value. It is intended for any 
extra information that is not part of the payload.

-------------------------------------------------------------------------------------------------

export const loadInitialContacts = () => { 
  const { currentUser } = firebase.auth();
  console.log('inside loadInitialContacts - user is:');
  console.log(currentUser);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .on('value', snapshot => {
        dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() });
    });
  };
};

-------------------------------------------------------------------------------------------------

*/
