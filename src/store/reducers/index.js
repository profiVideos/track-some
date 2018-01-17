import { combineReducers } from 'redux';
//import TagReducer from './TagReducer';
//import CardReducer from './CardReducer';
import EmojiReducer from './EmojiReducer';
import LoginInfo from './LoginReducer';
import CategoryReducer from './CategoryReducer';

const rootReducer = combineReducers({
  //tag: TagReducer,
  //card: CardReducer,
  login: LoginInfo,
  emojis: EmojiReducer,
  categories: CategoryReducer
});

export default rootReducer;
