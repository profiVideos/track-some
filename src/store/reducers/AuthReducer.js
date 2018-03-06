import { ToastAndroid } from 'react-native';
import { 
  LOGIN_USER,
  LOGIN_START,
  EMAIL_CHANGED, 
  LOGOUT_USER_OK,
  LOGIN_USER_FAIL,
  LOGIN_ERROR_MSG,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  SET_SAVE_MODE
} from '../actions/actionTypes';

const INITIAL_STATE = { 
  email: 'markus@profiphotos.com',
  password: '',
  errorMsg: '',
  errorCode: 0,
  user: null,
  loading: false,        // ... awaiting login state from firebase ...
  saveMode: 'local',    // ... none, local, cloud, liveSync ...
  didLogin: false
};

export default (state = INITIAL_STATE, action) => { 
  switch (action.type) { 

    case EMAIL_CHANGED:
      return { 
        ...state, 
        errorMsg: '',
        email: action.payload 
      };

    case PASSWORD_CHANGED:
      return { 
        ...state, 
        errorMsg: '',
        password: action.payload
      };

    case SET_SAVE_MODE:
      return { 
        ...state, 
        saveMode: action.payload 
      };

    case LOGIN_ERROR_MSG:
      return { 
        ...state, 
        errorMsg: action.payload 
      };

    case LOGIN_START:
      return { 
        ...state, 
        loading: true 
      };

    case LOGIN_USER:
      return { 
        ...state, 
        user: action.payload, 
        loading: false 
      };

    case LOGIN_USER_FAIL:
      return { 
        ...state, 
        errorMsg: action.payload.code + ': ' + action.payload.message, 
        errorCode: action.payload.code, 
        password: '', 
        loading: false 
      };

    case LOGIN_USER_SUCCESS:
      // ... this should start the spinner rotating ...
      return { 
        ...state, 
        user: action.payload, 
        errorMsg: '',
        errorCode: 0,
        loading: false 
      };

    //-----------------------------------------
    // ... next one is just for the logout ...
    //-----------------------------------------
    case LOGOUT_USER_OK:
      //ToastAndroid.show(`inside dispatch login_User: ${action.payload}`, ToastAndroid.LONG);
      return { 
        ...state, 
        user: action.payload, 
        email: '',
        password: '',
        errorMsg: '',
        errorCode: 0,
        loading: false
      };

    default: 
      return state;
  }
};

/*

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_REQUEST:
      return true;
    case types.FETCH_PROFILE_SUCCESS:
    case types.FETCH_PROFILE_FAIL:
      return false;
    default:
      return state;
  }
};

const data = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
      return action.data;
  }
  return state;
};

*/