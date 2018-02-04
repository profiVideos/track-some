import * as tsEmoji from './actions/EmojiRealm';
import * as tsCards from './actions/CardsRealm';
import * as tsCategory from './actions/CategoryRealm';

export default {
  ...tsEmoji,
  ...tsCards,
  ...tsCategory
};
