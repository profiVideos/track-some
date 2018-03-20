import { ToastAndroid } from 'react-native';
import { tsRealm } from '../data/tsObjects';

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

export const getMatchingNotes = (activeList = '', searchFor) => {
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

export const getAllNotes = () => {
  const noteList = tsRealm.objects('Note').sorted('updatedTimestamp', true);
  return noteList;
};

export const getCardNotes = (cardKey) => {
  const noteList = tsRealm.objects('Note')
    .filtered('card = $0', cardKey)
    .sorted('updatedTimestamp', true);  
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

export const restoreNote = (noteKey, note) => {
  tsRealm.write(() => {
    tsRealm.create('Note', {
      key: noteKey,
      list: note.list,
      card: note.card,
      icon: note.icon,
      title: note.title,
      note: note.note,
      color: note.color,
      priority: note.priority,
      reminder: note.reminder,
      selected: note.selected,
      createdTimestamp: note.createdTimestamp,
      updatedTimestamp: note.updatedTimestamp
    }, true);
  });
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
        numNotes: thisListItem.numNotes + 1,
        updatedTimestamp: new Date()
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
export const deleteNote = (noteKey, listKey = '') => {
  tsRealm.write(() => {
    const queryResult = tsRealm.objectForPrimaryKey('Note', noteKey);
    if (queryResult !== undefined) {
      // ... delete the note itself ...
      tsRealm.delete(queryResult);
      // ... decrement the total notes counter in the lists object ...
      if (listKey !== '') {
        const thisListItem = tsRealm.objectForPrimaryKey('List', listKey);
        if (thisListItem !== undefined) {
          tsRealm.create('List', {
            key: listKey,
            numNotes: thisListItem.numNotes - 1,
            updatedTimestamp: new Date()
          }, true);   // ... key based update of list item ...
        }
      }
    }
  });
};

export const deleteCardNotes = (cardKey, listKey = '') => {
  tsRealm.write(() => {
    const allCardNotes = tsRealm.objects('Note')
      .filtered('card = $0 AND list = $1', cardKey, listKey);
    if (allCardNotes !== undefined) {
      //ToastAndroid.show(`Notes: ${allCardNotes.length}`, ToastAndroid.SHORT);
      const numNotes = allCardNotes.length;
      tsRealm.delete(allCardNotes);
      // ... decrement the total notes counter in the lists object ...
      if (listKey !== '') {
        const thisListItem = tsRealm.objectForPrimaryKey('List', listKey);
        if (thisListItem !== undefined) {
          tsRealm.create('List', {
            key: listKey,
            numNotes: thisListItem.numNotes - numNotes,
            updatedTimestamp: new Date()
          }, true);   // ... key based update of list item ...
        }
      }
    }
  });
};

// ... fix this function to work with lists (i.e. selected cards within a list) ...
// ... and to update the list item with the reduced number of cards ...
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
