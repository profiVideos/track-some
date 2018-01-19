import Immutable from 'seamless-immutable';
import * as types from '../actions/actionTypes';

const initialState = Immutable({
  root: null   // 'login' / 'after-login'
});

// ... the App root reducer ...
export function root(state = initialState, action = {}) {
  switch (action.type) {

    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root
      });

    default:
      return state;
  }
}
