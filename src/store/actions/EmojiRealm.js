import { ToastAndroid } from 'react-native';
import { tsRealm, emjRealm } from '../data/tsObjects';
import sortedEmojiData from '../data/sorted-emojis.json';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

export const getMyEmojis = () => {
  const emojiItems = tsRealm.objects('Emoji').sorted('numUsed', true);
  return emojiItems;
};

/*
// ... proper way to write values ...
try {
  realm.write(() => {
    realm.create('Car', {make: 'Honda', model: 'Accord', drive: 'awd'});
  });
} catch (e) {
  console.log("Error on creation");
}
*/

export const loadEmojiData = () => {
  //ToastAndroid.show(`Emojis in Source: ${sortedEmojiData.length}`, ToastAndroid.LONG);
  emjRealm.write(() => {
    sortedEmojiData.forEach(emoji => {
      emjRealm.create('EmojiData', { 
        cat: emoji.cat, 
        emoji: emoji.emoji, 
        sort: emoji.sort, 
        name: emoji.name 
      });
    });
  });
};

export const getEmojiData = (category) => {
  //const thisGroup = emjRealm.objects('EmojiData').filtered('cat = $0', category).sorted('sort');
  const thisGroup = emjRealm.objects('EmojiData').filtered('cat = $0', category);
  return thisGroup;
};

export const getEmoji = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('Emoji', key);
  return thisItem;
};

export const updateEmoji = (key, selected, numUsed) => {
  tsRealm.write(() => {
    // ... update this emoji based on the key ...
    tsRealm.create('Emoji', { key, selected, numUsed }, true);
  });
};

export const createEmoji = (addEmoji, addName) => {
  tsRealm.write(() => {
    tsRealm.create('Emoji', {
      key: UniqueId(),
      emoji: addEmoji,
      name: addName,
      selected: false,
      numUsed: 1,
      createdTimestamp: new Date()
    });
  });
};

export const restoreEmoji = (myKey, emoji) => {
  tsRealm.write(() => {
    tsRealm.create('Emoji', {
      key: myKey,
      emoji: emoji.emoji,
      name: emoji.name,
      selected: emoji.selected,
      numUsed: emoji.numUsed,
      createdTimestamp: emoji.createdTimestamp
    }, true);   // ... in case this is an update ...
  });
};

export const clearSelectedEmojis = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Emoji').filtered('selected = true');
    if (allSelected !== undefined) {
      const snapShot = allSelected.snapshot();
      snapShot.forEach(emoji => {
        tsRealm.create('Emoji', { key: emoji.key, selected: false }, true);
      });
    }
  });
};

export const deleteSelectedEmojis = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Emoji').filtered('selected = true');
    if (allSelected !== undefined) {
      tsRealm.delete(allSelected);
    }
  });
};

/*
export const deleteAllEmojis = () => {
  tsRealm.write(() => {
    const purgeEmojis = tsRealm.objects('Emoji');
    if (purgeEmojis !== undefined) {
      tsRealm.delete(purgeEmojis);
    }
  });
};

export const deleteEmoji = (key) => {
  tsRealm.write(() => {
    tsRealm.delete(key);  // ... check on the correct syntax for this ...
  });
};
*/
