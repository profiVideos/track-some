import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SET_SAVE_MODE
} from '../actions/actionTypes';

const INITIAL_STATE = { 
  email: '',
  password: '',
  error: '',
  user: null,
  loading: false,
  saveMode: 'local',    // ... none, local, cloud ...
  didLogin: false
};

export default (state = INITIAL_STATE, action) => { 
  switch (action.type) { 

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SET_SAVE_MODE:
      return { ...state, saveMode: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed!', password: '', loading: false };

    default: 
      return state;
  }
};
