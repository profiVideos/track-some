//import { ToastAndroid } from 'react-native';
import { 
  LOGIN_USER,
  LOGIN_START,
  EMAIL_CHANGED, 
  LOGOUT_USER_OK,
  LOGIN_USER_FAIL,
  LOGIN_ERROR_MSG,
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  CONNECTION_STATE,
  BACKUP_SYNC_START,
  BACKUP_SYNC_FINISH,
  LOGIN_USER_SUCCESS,
  SET_SAVE_MODE
} from '../actions/actionTypes';

const INITIAL_STATE = { 
  //email: 'markus@profiphotos.com',
  //password: 'holycow854',
  email: '',
  password: '',
  username: '',
  errorMsg: '',
  errorCode: 0,
  user: null,
  connected: false,     // ... shows we have an internet connection ...
  loading: false,       // ... awaiting login state from firebase ...
  syncing: false,       // ... doing a backup / sync with firebase ...
  saveMode: 'cloud',    // ... none, local, cloud, liveSync ...
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

    case USERNAME_CHANGED:
      return { 
        ...state, 
        errorMsg: '',
        username: action.payload
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

    case CONNECTION_STATE:
      return { 
        ...state, 
        connected: action.payload 
      };

    case BACKUP_SYNC_START:
      //ToastAndroid.show('Start Backup', ToastAndroid.SHORT);
      return { 
        ...state, 
        syncing: true 
      };

    case BACKUP_SYNC_FINISH:
      //ToastAndroid.show('Finish Backup', ToastAndroid.SHORT);
      return { 
        ...state, 
        syncing: false
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
        username: '',
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
        username: '',
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