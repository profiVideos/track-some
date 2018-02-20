import * as tsEmoji from './actions/EmojiRealm';
import * as tsCards from './actions/CardRealm';
import * as tsNotes from './actions/NoteRealm';
import * as tsLists from './actions/ListRealm';
import * as tsCategory from './actions/CategoryRealm';

export default {
  ...tsEmoji,
  ...tsCards,
  ...tsNotes,
  ...tsLists,
  ...tsCategory
};
