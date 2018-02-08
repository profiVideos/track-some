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
    emoji: 'string',    // ... contains the two char international emoji string ...
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
    // ... to which 'list' does this category belong or '' for all ...
    list: { type: 'string', optional: true },   
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
    card: 'string',                             // ... to which 'card' does this image belong ...
    uri: { type: 'string', optional: true },    // ... stored on image server and url goes here ...
    size: 'double',
    width: 'int', 
    // ... also include EXIF record data when coming from camera ...
    height: 'int',
    base64: 'string',       // ... base64 String ...
    mimeType: 'string',
    createdTimestamp: 'date'
  }
};

class Note extends Realm.Object {}
Note.schema = {
  name: 'Note',
  primaryKey: 'key',
  properties: {
    key: 'string',    // ... unique GUID() ...
    //list: 'string',   // ... to which 'list' does this note belong or '' for all ...
    //card: 'string',   // ... to which 'card' does this note belong or '' for all ...
    icon: 'string?',
    title: { type: 'string', indexed: true },
    note: 'string',
    color: 'string?',
    priority: 'int?',
    reminder: 'date?',
    selected: 'bool',
    createdTimestamp: 'date',
    updatedTimestamp: 'date'
  }
};

class Card extends Realm.Object {}
Card.schema = {
  name: 'Card',
  primaryKey: 'key',
  properties: {
    key: 'string',
    list: 'string',   // ... to which 'list' does this card belong or '' for all ...
    name: { type: 'string', indexed: true },
    desc: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    iconType: { type: 'string', optional: true },   // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    rating: { type: 'int', optional: true },
    category: { type: 'string', optional: true },   // ... stores full category string ...
    imageThumb: { type: 'string', optional: true }, // ... base64 encoded thumbnail ...
    mimeType: { type: 'string', optional: true },   // ... same as full image in imageRealm ...
    barcode: 'string?',                             // ... definition same as one above ...
    tags: 'string?[]',                              // ... optional tags entered for this card ...
    notes: 'Note[]',                                // ... array of 'notes' (not optional) ...
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date'
  }
};

export const tsRealm = new Realm({ schema: [Emoji, Category, Note, Card] });
//export const imageRealm = new Realm({ schema: [Image] });
