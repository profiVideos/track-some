import { tsRealm } from '../data/tsObjects';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

export const getAllCards = () => {
  const cardList = tsRealm.objects('Card').sorted('name');  // + ,true for reverse sorting ...
  return cardList;
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

export const getCard = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('Card', key);
  return thisItem;
};

export const createCard = 
  (cName, cDesc, cIcon, cType, cRating, cCategory, cThumb, cMime, cBarcode, cTags, cNotes) => {
  tsRealm.write(() => {
    tsRealm.create('Card', {
      key: UniqueId(),
      name: cName,
      desc: cDesc,
      icon: cIcon,
      iconType: cType,
      rating: cRating,
      category: cCategory,
      imageThumb: cThumb,
      mimeType: cMime,
      barcode: cBarcode,
      tags: cTags,
      notes: cNotes,
      selected: false,
      createdTimestamp: new Date()
    });
  });
};

export const updateCardSelected = (key, isSelected) => {
  tsRealm.write(() => {
    // ... update this card based on the key ...
    tsRealm.create('Card', { key, selected: isSelected }, true);
  });
};

export const updateCardTags = (key, newTags) => {
  tsRealm.write(() => {
    // ... update this card based on the key ...
    tsRealm.create('Card', { key, tags: newTags }, true);
  });
};

export const updateCard = (key, name, desc, icon, category) => {
  tsRealm.write(() => {
    // ... update this card based on the key ...
    tsRealm.create('Card', { key, name, desc, icon, category }, true);
  });
};

//-----------------------------------------------------------------------------
// ... we should really do this within a transaction so we could roll back ...
//-----------------------------------------------------------------------------
export const deleteCard = (key) => {
  tsRealm.write(() => {
    const queryResult = tsRealm.objectForPrimaryKey('Card', key);
    if (queryResult !== undefined) {
      tsRealm.delete(queryResult);
    }
  });
};

export const deleteSelectedCards = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Card').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};
