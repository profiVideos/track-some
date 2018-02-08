import * as tsEmoji from './actions/EmojiRealm';
import * as tsCards from './actions/CardRealm';
import * as tsNotes from './actions/NoteRealm';
import * as tsCategory from './actions/CategoryRealm';

export default {
  ...tsEmoji,
  ...tsCards,
  ...tsNotes,
  ...tsCategory
};
