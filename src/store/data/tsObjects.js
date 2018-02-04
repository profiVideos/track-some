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

class Image extends Realm.Object {}
Image.schema = {
  name: 'Image',
  primaryKey: 'key',
  properties: {
    key: 'string',
    uri: 'string',            // ... optionally stored on server and url goes here ...
    size: 'double',
    width: 'int', 
    // ... also include EXIF data when coming form camera ...
    height: 'int',
    base64: 'string',          // ... base64 String ...
    mimeType: 'string',
    createdTimestamp: 'date'
  }
};

/*
  image: {
    uri: action.payload.image.path, 
    width: action.payload.image.width, 
    height: action.payload.image.height,
    size: action.payload.image.size,
    mimeType: action.payload.image.mime,
    created: action.payload.image.modificationDate,
    base64: action.payload.image.data
  }, 
*/

class Card extends Realm.Object {}
Card.schema = {
  name: 'Card',
  primaryKey: 'key',
  properties: {
    key: 'string',
    name: { type: 'string', indexed: true },
    desc: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    iconType: { type: 'string', optional: true },  // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    rating: { type: 'int', optional: true },
    category: { type: 'string', optional: true },
    imageThumb: { type: 'string', optional: true },
    mimeType: { type: 'string', optional: true },
    barcode: { type: 'string', optional: true },
    tags: { type: 'string[]', optional: true },
    notes: { type: 'string[]', optional: true },
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date'
  }
};

export const tsRealm = new Realm({ schema: [Emoji, Category, Card] });
//export const imageRealm = new Realm({ schema: [Image] });
