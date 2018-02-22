//import { ToastAndroid } from 'react-native';
import { tsRealm } from '../data/tsObjects';
//import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

export const getAllLists = () => {
  let listOfLists = '';
  //searchFor = '';
  //if (searchFor !== null && searchFor !== undefined) {
    //ToastAndroid.show(`Matching Lists: ${queryStr}\n${foundCards}`, ToastAndroid.SHORT);
  //  ToastAndroid.show(`Getting Lists: ${searchFor}`, ToastAndroid.SHORT);
  //  listList = tsRealm.objects('List')
  //    .filtered('list CONTAINS[c] $0 OR title CONTAINS[c] $0', searchFor)
  //    .sorted('updatedTimestamp', true);
  //} else {
    listOfLists = tsRealm.objects('List').sorted('name');  
  //}
  return listOfLists;
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

export const getList = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('List', key);
  return thisItem;
};

export const createList = (cKey, cName, cDesc, cIcon, cType, cThumb, cMime, cBcode) => {
  console.log('saving list: ', cKey);
  tsRealm.write(() => {
    tsRealm.create('List', {
      key: cKey,
      name: cName,
      desc: cDesc,
      icon: cIcon,
      iconType: cType,
      imageThumb: cThumb,
      mimeType: cMime,
      barcode: cBcode,
      numCards: 0,
      numNotes: 0,
      selected: false,
      createdTimestamp: new Date(),
      updatedTimestamp: new Date()
    });
  });
};

export const updateList = (item) => {
  tsRealm.write(() => {
    // ... update this list based on the key ...
    tsRealm.create('List', {
      key: item.key,
      name: item.name, 
      desc: item.desc,
      icon: item.icon, 
      iconType: item.iconType, 
      imageThumb: item.imageThumb,
      mimeType: item.mimeType, 
      barcode: item.barcode, 
      numCards: item.numCards, 
      numNotes: item.numNotes, 
      updatedTimestamp: new Date()
    }, true);
  });
};

//-----------------------------------------------------------------------------
// ... we should really do this within a transaction so we could roll back ...
//-----------------------------------------------------------------------------
export const deleteList = (key) => {
  tsRealm.write(() => {
    const queryResult = tsRealm.objectForPrimaryKey('List', key);
    if (queryResult !== undefined) {
      tsRealm.delete(queryResult);
    }
  });
};

//-----------------------------------------------------------------------
// ... not really used as I don't anticipate massive list operations ...
//-----------------------------------------------------------------------
export const updateListSelected = (key, isSelected) => {
  tsRealm.write(() => {
    // ... update this list based on the key ...
    tsRealm.create('List', { key, selected: isSelected }, true);
  });
};

/* ... we would NEVER EVER DO THIS ...
export const deleteSelectedLists = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('List').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};

// ... not really needed as the update function could handle this ...
export const updateListColor = (key, newColor) => {
  tsRealm.write(() => {
    // ... update this list based on the key ...
    tsRealm.create('List', { key, color: newColor }, true);
  });
};
*/
