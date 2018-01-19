import { combineReducers } from 'redux';
//import TagReducer from './TagReducer';
//import CardReducer from './CardReducer';
//import RootReducer from './RootReducer';
import { root } from './RootReducer';
import EmojiReducer from './EmojiReducer';
import LoginInfo from './LoginReducer';
import CategoryReducer from './CategoryReducer';

const MainReducer = combineReducers({
  root,  
  login: LoginInfo,
  emojis: EmojiReducer,
  categories: CategoryReducer
  //tag: TagReducer,
  //card: CardReducer,
});

export default MainReducer;
