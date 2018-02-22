import { ToastAndroid } from 'react-native';
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

export const getAllNotes = (activeList = '', searchFor) => {
  let noteList = '';
  //searchFor = '';
  if (searchFor !== null && searchFor !== undefined) {
    //ToastAndroid.show(`Matching Notes: ${queryStr}\n${foundCards}`, ToastAndroid.SHORT);
    ToastAndroid.show(`Getting Notes: ${searchFor}`, ToastAndroid.SHORT);
    noteList = tsRealm.objects('Note')
      .filtered('note CONTAINS[c] $0 OR title CONTAINS[c] $0', searchFor)
      .sorted('updatedTimestamp', true);
  } else {
    //ToastAndroid.show(`Notes: ${activeList}`, ToastAndroid.SHORT);
    //if (activeList !== null && activeList !== undefined && activeList !== '') {
      //ToastAndroid.show(`Get Notes: ${activeList}`, ToastAndroid.SHORT);
      // ... MG - 22.02.2018 - filtered will retrieve "list" notes and others not yet assigned ...
      noteList = tsRealm.objects('Note')
        .filtered('list = $0 OR list = ""', activeList)
        .sorted('updatedTimestamp', true);  
    //}      
  }
  return noteList;
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

export const getNote = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('Note', key);
  return thisItem;
};

export const createNote = (cKey, cList, cCard, cIcon, cTitle, cNote, cColor, cPrior, cRemind) => {
  console.log('saving note: ', cKey);
  tsRealm.write(() => {
    tsRealm.create('Note', {
      key: cKey,
      list: cList,
      card: cCard,
      icon: cIcon,
      title: cTitle,
      note: cNote,
      color: cColor,
      priority: cPrior,
      reminder: cRemind,
      selected: false,
      createdTimestamp: new Date(),
      updatedTimestamp: new Date()
    });
    // ... increment the total notes counter in the lists object ...
    const thisListItem = tsRealm.objectForPrimaryKey('List', cList);
    if (thisListItem !== undefined) {
      tsRealm.create('List', {
        key: cList,
        numNotes: thisListItem.numNotes + 1
      }, true);   // ... key based update of list item ...
    }
  });
};

export const updateNoteSelected = (key, isSelected) => {
  tsRealm.write(() => {
    // ... update this note based on the key ...
    tsRealm.create('Note', { key, selected: isSelected }, true);
  });
};

export const updateNote = (item) => {
  tsRealm.write(() => {
    // ... update this note based on the key ...
    tsRealm.create('Note', {
      key: item.key,
      list: item.list, 
      card: item.card,
      icon: item.icon, 
      title: item.title,
      note: item.note, 
      color: item.color, 
      priority: item.priority, 
      reminder: item.reminder,
      updatedTimestamp: new Date()
    }, true);
  });
};

//-----------------------------------------------------------------------------
// ... we should really do this within a transaction so we could roll back ...
//-----------------------------------------------------------------------------
export const deleteNote = (key) => {
  tsRealm.write(() => {
    const queryResult = tsRealm.objectForPrimaryKey('Note', key);
    if (queryResult !== undefined) {
      tsRealm.delete(queryResult);
      // ... decrement the total notes counter in the lists object ...
    }
  });
};

export const deleteSelectedNotes = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Note').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};

// ... not really needed as the update function could handle this ...
/*
export const updateNoteColor = (key, newColor) => {
  tsRealm.write(() => {
    // ... update this note based on the key ...
    tsRealm.create('Note', { key, color: newColor }, true);
  });
};
*/
