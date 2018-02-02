//import Realm from 'realm';
import { tsRealm } from '../data/tsObjects';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

/*
class Emoji {
  static get() { return tsRealm.objects(Emoji.schema.name); }
  static schema = {
    name: 'Emoji',
    primaryKey: 'key',
    properties: {
      key: 'string',
      emoji: 'string',
      name: { type: 'string', indexed: true },
      selected: 'bool',
      numUsed: 'int',
      createdTimestamp: 'date'
    }
  }
}
*/

export const getMyEmojis = () => {
  const emojiItems = tsRealm.objects('Emoji').sorted('numUsed', true);
  return emojiItems;
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

export const deleteSelectedEmojis = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Emoji').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};

export const deleteAllEmojis = () => {
  tsRealm.write(() => {
    const purgeEmojis = tsRealm.objects('Emoji');
    tsRealm.delete(purgeEmojis);
  });
};

export const deleteEmoji = (key) => {
  tsRealm.write(() => {
    tsRealm.delete(key);  // ... check on the correct syntax for this ...
  });
};

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

/*
class Category {
  static get() { return tsRealm.objects(Category.schema.name); }
  static schema = {
    name: 'Category',
    primaryKey: 'key',
    properties: {
      key: 'string',
      name: { type: 'string', indexed: true },
      desc: { type: 'string', optional: true },
      icon: { type: 'string', optional: true },
      selected: 'bool',
      createdTimestamp: 'date'
    }
  }
}
*/

//tsRealm.open({ schema: [Category] })
//  .then(/* ... */);

export const getAllCategories = () => {
  const catItems = tsRealm.objects('Category').sorted('name');  // + ,true for reverse sorting ...
  return catItems;
};

/*
export const categoryList = () => {
  return tsRealm.objects('Category');
};

try {
  realm.write(() => {
    realm.create('Car', {make: 'Honda', model: 'Accord', drive: 'awd'});
  });
} catch (e) {
  console.log("Error on creation");
}
*/


export const getCategory = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('Category', key);
  return thisItem;
};

export const updateCategory = (key, name, desc, icon, selected) => {
  tsRealm.write(() => {
    // ... update this category based on the key ...
    tsRealm.create('Category', { key, name, desc, icon, selected }, true);
  });
};

export const createCategory = (catName, catDesc, catIcon) => {
  tsRealm.write(() => {
    tsRealm.create('Category', {
      key: UniqueId(),
      name: catName,
      desc: catDesc,
      icon: catIcon,
      selected: false,
      createdTimestamp: new Date()
    });
  });
};

export const deleteSelectedCategories = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Category').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};

export const deleteCategory = (key) => {
  tsRealm.write(() => {
    tsRealm.delete(key);  // ... check on the correct syntax for this ...
  });
};

//const tsRealm = new Realm({ schema: [Emoji, Category] });
