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

class EmojiData extends Realm.Object {}
EmojiData.schema = {
  name: 'EmojiData',
  primaryKey: 'emoji',
  properties: {
    cat: 'string', 
    emoji: 'string',    // ... contains the two char international emoji string ...
    sort: 'int',
    name: 'string'
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

//-----------------------------------------------------------
// ... 15.03.2018 - MG - Image is not used at the moment ...
//-----------------------------------------------------------
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
    list: 'string?',   // ... (key) to which 'list' does this note belong or '' for all ...
    card: 'string?',   // ... (key) to which 'card' does this note belong or '' for all ...
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
    list: 'string',   // ... (key) to which 'list' does this card belong or '' for all ...
    name: { type: 'string', indexed: true },
    desc: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    iconType: { type: 'string', optional: true },   // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    rating: { type: 'int', optional: true },
    category: { type: 'string', optional: true },   // ... stores full category string ...
    imageThumb: { type: 'string', optional: true }, // ... base64 encoded thumbnail ...
    mimeType: { type: 'string', optional: true },   // ... same as full image in imageRealm ...
    barcode: 'string?',                             // ... definition same as one above ...
    tags: 'string?',                                // ... JSON tags entered for this card ...
    notes: 'string?[]',                             // ... optional keys (links) to 'notes' ...
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date',
    updatedTimestamp: 'date'
  }
};

class List extends Realm.Object {}
List.schema = {
  name: 'List',
  primaryKey: 'key',
  properties: {
    key: 'string',
    name: { type: 'string', indexed: true },
    desc: 'string?',
    icon: 'string?',
    iconType: 'string?',            // ... 'ICO', 'PHO', 'BAR', 'QRC' ...
    imageThumb: 'string?',          // ... base64 encoded thumbnail (256x256) ...
    mimeType: 'string?',            // ... same as full image in imageRealm ...
    barcode: 'string?',             // ... definition same as one above ...
    notes: 'string?[]',             // ... keys (links) to 'notes' - not really needed ...
    numCards: { type: 'int', default: 0 },
    numNotes: { type: 'int', default: 0 },
    selected: { type: 'bool', default: false },
    createdTimestamp: 'date',
    updatedTimestamp: 'date'
  }
};

class Config extends Realm.Object {}
Config.schema = {
  name: 'Config',
  primaryKey: 'userid',
  properties: {
    userid: 'string',
    nickname: 'string?',
    email: 'string?',
    phone: 'string?',
    photoURI: 'string?',
    dbVersion: 'float',
    signup: 'string',
    created: 'date',
    lastSync: 'date?'
  }
};

class AppConfig extends Realm.Object {}
AppConfig.schema = {
  name: 'AppConfig',
  primaryKey: 'profileKey',
  properties: {
    profileKey: 'string',
    noteTitle: { type: 'bool', default: false },
    updatedTimestamp: 'date'
  }
};

export const tsRealm = new Realm({ 
  schema: [Emoji, Category, Note, Card, List],
  schemaVersion: 1
});

export const cfgRealm = new Realm({ 
  path: 'config.realm', 
  schema: [Config, AppConfig],
  deleteRealmIfMigrationNeeded: true 
});

export const emjRealm = new Realm({
  path: 'emoji.realm', 
  schema: [EmojiData],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true 
});
