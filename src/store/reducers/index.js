import { combineReducers } from 'redux';
//import TagReducer from './TagReducer';
//import CardReducer from './CardReducer';
//import LoginReducer from './LoginReducer';
import CategoryReducer from './CategoryReducer';

const rootReducer = combineReducers({
  //tag: TagReducer,
  //card: CardReducer,
  //login: LoginReducer,
  category: CategoryReducer
});

export default rootReducer;
