import { combineReducers } from 'redux';
//import TagReducer from './TagReducer';
//import CardReducer from './CardReducer';
//import LoginReducer from './LoginReducer';
import CategoryReducer from './CategoryReducer';
import Characters from './Characters';

const rootReducer = combineReducers({
  //tag: TagReducer,
  //card: CardReducer,
  //login: LoginReducer,
  characters: Characters,
  categories: CategoryReducer
});

export default rootReducer;
