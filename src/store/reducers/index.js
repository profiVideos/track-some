import { combineReducers } from 'redux';
//import TagReducer from './TagReducer';
//import RootReducer from './RootReducer';
import { root } from './RootReducer';
import EmojiReducer from './EmojiReducer';
import LoginInfo from './LoginReducer';
import CardReducer from './CardReducer';
import CategoryReducer from './CategoryReducer';

const MainReducer = combineReducers({
  root,  
  login: LoginInfo,
  cards: CardReducer,
  emojis: EmojiReducer,
  categories: CategoryReducer
  //tag: TagReducer,
});

export default MainReducer;
