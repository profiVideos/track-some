import Realm from 'realm';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

class Emoji extends Realm.Object {}
Emoji.schema = {
  name: 'Emoji',
  primaryKey: 'key',
  properties: {
    key: 'string',
    emoji: 'string',
    name: { type: 'string', indexed: true },
    selected: { type: 'bool', default: false },
    numUsed: { type: 'int', default: 1 },
    createdTimestamp: 'date'
  }
};

class Category extends Realm.Object {}
Category.schema = {
  name: 'Category',
  primaryKey: 'key',
  properties: {
    key: 'string',
    name: { type: 'string', indexed: true },
    desc: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date'
  }
};

export const tsRealm = new Realm({ schema: [Emoji, Category] });
