//import { ToastAndroid } from 'react-native';
//import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { tsRealm } from '../data/tsObjects';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.
//  else foundCards += `key = "${note.card}"`;
//      .filtered('name CONTAINS[c] $0 OR tags CONTAINS[c] $0', searchFor)
//      .filtered('name CONTAINS[c] $0 OR desc CONTAINS[c] $0', searchFor)

export const getAllCards = (activeList = '', lookFor) => {
  let cardList = '';
  let foundCards = '';
  //searchFor = '';
  if (lookFor !== null && lookFor !== undefined) {
    // ... find any card notes that may have this search term ...
    const tempList = tsRealm.objects('Note')
      .filtered('note CONTAINS[c] $0 OR title CONTAINS[c] $0 AND card != ""', lookFor);
    const snapShot = tempList.snapshot();
    snapShot.forEach(note => {
       foundCards += ` OR key = "${note.card}"`;
    });
    const queryStr = 
`name CONTAINS[c] '${lookFor}' OR tags CONTAINS[c] '${lookFor}' OR desc CONTAINS[c] '${lookFor}'`;
    ToastAndroid.show(`Matching Notes: ${queryStr}\n${foundCards}`, ToastAndroid.SHORT);
    //Alert.alert(`Matching Notes: ${queryStr}\n${foundCards}`);
    cardList = tsRealm.objects('Card')
      //.filtered('name CONTAINS[c] $0 OR desc CONTAINS[c] $0', searchFor)
      .filtered(`${queryStr}${foundCards}`)
      .sorted('name');  // + ,true for reverse sorting ...
  } else {
    //ToastAndroid.show(`Cards: ${activeList}`, ToastAndroid.SHORT);
    foundCards = 'NONE';
    //if (activeList !== null && activeList !== undefined && activeList !== '') {
      //ToastAndroid.show(`Get Cards: ${activeList}`, ToastAndroid.SHORT);
      cardList = tsRealm.objects('Card')
        .filtered('list = $0', activeList)
        .sorted('name');  // + ,true for reverse sorting ...
    //}      
  }
  return cardList;
};

//export default connect(whatDoYouNeed)(getAllCards);
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
  (cList, cName, cDesc, cIcon, cType, cRating, cCat, cThumb, cMime, cBarcode, cTags, cNotes) => {
  tsRealm.write(() => {
    tsRealm.create('Card', {
      key: UniqueId(),
      list: cList,
      name: cName,
      desc: cDesc,
      icon: cIcon,
      iconType: cType,
      rating: cRating,
      category: cCat,
      imageThumb: cThumb,
      mimeType: cMime,
      barcode: cBarcode,
      tags: JSON.stringify(cTags),
      notes: cNotes,
      selected: false,
      createdTimestamp: new Date()
    });
    // ... increment the total cards counter in the lists object ...
    const thisListItem = tsRealm.objectForPrimaryKey('List', cList);
    if (thisListItem !== undefined) {
      tsRealm.create('List', {
        key: cList,
        numCards: thisListItem.numCards + 1
      }, true);   // ... key based update of list item ...
    }
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
    tsRealm.create('Card', { key, tags: JSON.stringify(newTags) }, true);
  });
};

export const updateCardNotes = (key, newNotes) => {
  tsRealm.write(() => {
    // ... update this card based on the key ...
    tsRealm.create('Card', { key, notes: newNotes }, true);
  });
};

export const updateCard = 
  (key, list, name, desc, icon, type, rating, cat, thumb, mime, bcode, cTags, notes) => {
  tsRealm.write(() => {
    // ... update this card based on the key ...
    tsRealm.create('Card', {
      key, 
      list,
      name,
      desc,
      icon,
      iconType: type,
      rating,
      category: cat,
      imageThumb: thumb,
      mimeType: mime,
      barcode: bcode,
      tags: JSON.stringify(cTags),
      notes
    }, true);  // ... update based on unique key ...
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
      // ... decrement the total cards counter in the lists object ...
    }
  });
};

export const deleteSelectedCards = () => {
  tsRealm.write(() => {
    // .... need to fix this to be list specific ...
    //const allSelected = tsRealm.objects('Card').filtered('selected = true');
    //tsRealm.delete(allSelected);
  });
};
