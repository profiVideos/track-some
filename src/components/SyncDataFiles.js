import { ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { finishBackupSync } from '../store/actions';
import realmDB from '../store';

var promises = [];
var cloudData = [];
var numAdded = 0;
var numUpdated = 0;
var numDeleted = 0;

//function SyncFilesWithCloud(userId, dispatch) {
  //---------------------------------------------------
  // ... determine which type of sync we are doing ...
  //---------------------------------------------------
  // 1) "Backup to Cloud" occurs when the last sync date in the cloud config file does not
  //    exist or has a date that is less than the last sync date on the mobile device.
  // 2) "Update to Cloud" occurs when the last data update date on the mobile device is
  //    greater than the last sync date on the mobile device.
  // 3) "Restore from Cloud" occurs when the mobile config file has no last sync date and
  //    the cloud config file for the logged in user has a last sync date.
  // 4) "Update from Cloud" occurs when the cloud config file has a last sync date that
  //    is more recent than the last sync date on the mobile device.
//}

const onEmojisList = (querySnapshot) => {
  cloudData = [];
  querySnapshot.forEach((doc) => {
    cloudData.push({
      key: doc.id
    });
  });
};

const onCategoryList = (querySnapshot) => {
  cloudData = [];
  querySnapshot.forEach((doc) => {
    cloudData.push({
      key: doc.id
    });
  });
};

const onNotesList = (querySnapshot) => {
  cloudData = [];
  querySnapshot.forEach((doc) => {
    cloudData.push({
      key: doc.id,
      updated: doc.get('updatedTimestamp')
    });
  });
};

function findDataKey(key) {
  return cloudData.findIndex((element) => { return element.key === key; });
}

function backupEmojiData(userData, debug) {
  //---------------------------
  // ... backup the emojis ...
  //---------------------------
  numAdded = 0;
  numUpdated = 0;
  numDeleted = 0;
  let newPromise = null;
  const myEmojis = realmDB.getMyEmojis();
  const emojiUnsubscribe = userData.collection('Emojis').onSnapshot(onEmojisList);
  if (debug) ToastAndroid.show(`Emojis: ${myEmojis.length}`, ToastAndroid.SHORT);
  //------------------------------------------------------------------
  // ... get the emojis loaded in cloud firestore & wait for them ...
  //------------------------------------------------------------------
  const emojiRef = userData.collection('Emojis');
  promises.push(emojiRef.get());
  Promise.all(promises).then(() => {
    emojiUnsubscribe();  // ... no more emoji updates please ...
    //-----------------------------------------------------------------
    // ... now add or update emojis from the mobile realm database ...
    //-----------------------------------------------------------------
    myEmojis.forEach(emoji => {
      if (findDataKey(emoji.key) >= 0) {
        // ... update the two fields that could have changed ...
        newPromise = userData.collection('Emojis').doc(emoji.key).set({
          selected: emoji.selected,
          numUsed: emoji.numUsed
        }, { merge: true });
        promises.push(newPromise);
        numUpdated++;
      } else {
        // ... add this emoji to the cloud firestore ...
        newPromise = userData.collection('Emojis').doc(emoji.key).set({
          emoji: emoji.emoji,
          name: emoji.name,
          selected: emoji.selected,
          numUsed: emoji.numUsed,
          createdTimestamp: emoji.createdTimestamp
        });
        promises.push(newPromise);
        numAdded++;
      }
    });
    //------------------------------------------------------------------------------- 
    // ... and finally delete emojis in the cloud that no longer exist on device ...
    //-------------------------------------------------------------------------------
    cloudData.forEach(emoji => {
      // ... check if this cloud emoji is still on the device ...
      const thisEmoji = realmDB.getEmoji(emoji.key);
      if (thisEmoji === undefined) {
        newPromise = userData.collection('Emojis').doc(emoji.key).delete();
        promises.push(newPromise);
        numDeleted++;
      }
    });    
  });
  //----------------------------------------------------------------------------
  // ... wait for promises to clear before dealing with the next data group ...
  //----------------------------------------------------------------------------
  Promise.all(promises).then(() => {
    if (debug) {
      ToastAndroid.show(`Adds: ${numAdded} Updates: ${numUpdated} Deletes: ${numDeleted}`, 
        ToastAndroid.SHORT);
    }
  });
}

function backupCategoryData(userData, debug) {
  //-------------------------------
  // ... backup the categories ...
  //-------------------------------
  numAdded = 0;
  numUpdated = 0;
  numDeleted = 0;
  let newPromise = null;
  const myCategories = realmDB.getAllCategories();
  const categoryUnsubscribe = userData.collection('Categories').onSnapshot(onCategoryList);
  if (debug) ToastAndroid.show(`Categories: ${myCategories.length}`, ToastAndroid.SHORT);
  //----------------------------------------------------------------------
  // ... get the categories loaded in cloud firestore & wait for them ...
  //----------------------------------------------------------------------
  const categoryRef = userData.collection('Categories');
  promises.push(categoryRef.get());
  Promise.all(promises).then(() => {
    categoryUnsubscribe();  // ... no more category updates please ...
    //---------------------------------------------------------------------
    // ... now add or update categories from the mobile realm database ...
    //---------------------------------------------------------------------
    myCategories.forEach(category => {
      if (findDataKey(category.key) >= 0) {
        // ... at the present time you cannot update a category ...
        //newPromise = userData.collection('Categories').doc(category.key).set({
        //  selected: category.selected
        //}, { merge: true });
        //promises.push(newPromise);
        numUpdated++;
      } else {
        // ... add this category to the cloud firestore ...
        newPromise = userData.collection('Categories').doc(category.key).set({
          name: category.name,
          list: category.list,
          desc: category.desc,
          icon: category.icon,
          selected: category.selected,
          createdTimestamp: category.createdTimestamp
        });
        promises.push(newPromise);
        numAdded++;
      }
    });
    //----------------------------------------------------------------------------------- 
    // ... and finally delete categories in the cloud that no longer exist on device ...
    //-----------------------------------------------------------------------------------
    cloudData.forEach(category => {
      // ... check if this cloud category is still on the device ...
      const thisCategory = realmDB.getCategory(category.key);
      if (thisCategory === undefined) {
        newPromise = userData.collection('Categories').doc(category.key).delete();
        promises.push(newPromise);
        numDeleted++;
      }
    });    
  });
  //----------------------------------------------------------------------------
  // ... wait for promises to clear before dealing with the next data group ...
  //----------------------------------------------------------------------------
  Promise.all(promises).then(() => {
    if (debug) {
      ToastAndroid.show(`Adds: ${numAdded} Updates: ${numUpdated} Deletes: ${numDeleted}`, 
        ToastAndroid.SHORT);
    }
  });
}

function backupNotesData(userData, debug) {
  //--------------------------
  // ... backup the notes ...
  //--------------------------
  numAdded = 0;
  numUpdated = 0;
  numDeleted = 0;
  let newPromise = null;
  const myNotes = realmDB.getAllNotes();
  const noteUnsubscribe = userData.collection('Notes').onSnapshot(onNotesList);
  if (debug) ToastAndroid.show(`Notes: ${myNotes.length}`, ToastAndroid.SHORT);
  //-----------------------------------------------------------------
  // ... get the notes loaded in cloud firestore & wait for them ...
  //-----------------------------------------------------------------
  const noteRef = userData.collection('Notes');
  promises.push(noteRef.get());
  Promise.all(promises).then(() => {
    noteUnsubscribe();  // ... no more note updates please ...
    //--------------------------------------------------------------------
    // ... now add or update the notes from the mobile realm database ...
    //--------------------------------------------------------------------
    myNotes.forEach(note => {
      const indexPos = findDataKey(note.key);
      if (indexPos >= 0) {
        // ... do a check on the date fields to see if the note has changed ...
        if (note.updatedTimestamp > cloudData[indexPos].updated) {
          newPromise = userData.collection('Notes').doc(note.key).set({
            list: note.list,
            card: note.card,
            title: note.title,
            note: note.note,
            color: note.color,
            priority: note.priority,
            selected: note.selected,
            updatedTimestamp: note.updatedTimestamp
          }, { merge: true });
          promises.push(newPromise);
          numUpdated++;
        }
      } else {
        // ... add this note to the cloud firestore ...
        newPromise = userData.collection('Notes').doc(note.key).set({
          list: note.list,
          card: note.card,
          title: note.title,
          note: note.note,
          color: note.color,
          priority: note.priority,
          selected: note.selected,
          updatedTimestamp: note.updatedTimestamp,
          createdTimestamp: note.createdTimestamp
        });
        promises.push(newPromise);
        numAdded++;
      }
    });
    //------------------------------------------------------------------------------ 
    // ... and finally delete notes in the cloud that no longer exist on device ...
    //------------------------------------------------------------------------------
    cloudData.forEach(note => {
      // ... check if this cloud note is still on the device ...
      const thisNote = realmDB.getNote(note.key);
      if (thisNote === undefined) {
        newPromise = userData.collection('Notes').doc(note.key).delete();
        promises.push(newPromise);
        numDeleted++;
      }
    });    
  });
  //----------------------------------------------------------------------------
  // ... wait for promises to clear before dealing with the next data group ...
  //----------------------------------------------------------------------------
  Promise.all(promises).then(() => {
    if (debug) {
      ToastAndroid.show(`Adds: ${numAdded} Updates: ${numUpdated} Deletes: ${numDeleted}`, 
        ToastAndroid.SHORT);
    }
  });
}

function BackupMainFiles(userId, dispatch) {
  //----------------------------------------------------------------
  // ... backup all the realm data files to the firestore cloud ...
  //----------------------------------------------------------------
  const userData = firebase.firestore().collection('photoDrops').doc(userId);
  //backupEmojiData(userData, true);
  Promise.all(promises).then(() => {
    //backupCategoryData(userData, true);
    Promise.all(promises).then(() => {
      backupNotesData(userData, true);
      //------------------------------------------------------------------------  
      // ... update the realm config file with the current sync date & time ...
      // ... and then update the config file in the firestore cloud storage ...
      //------------------------------------------------------------------------  
      //--------------------------------------------------------------------
      // ... once all the promises are kept - indicate that we are done ...
      //--------------------------------------------------------------------
      Promise.all(promises).then(() => {
        dispatch(finishBackupSync());
        ToastAndroid.show('Sync Complete!', ToastAndroid.SHORT);
      });
    });
  });
}
export default BackupMainFiles;

/*
    .onSnapshot(
      querySnapshot => {
        console.log(querySnapshot.metadata);
        let bottles = {};
        querySnapshot.forEach(doc => {
          bottles[doc.id] = { ...doc.data() };
        });
        //dispatch({ type: BOTTLES_SUCCESS, payload: bottles });
      }//,
      //error => dispatch({ type: BOTTLES_FAILURE, payload: error })
    );

  //ToastAndroid.show(`Promise: ${JSON.stringify(newPromise.id)}`, ToastAndroid.LONG);

  newPromise = emojiRef.update({
    selected: false,
    numUsed: 969
  })
  .catch((error) => { 
    const { code, message } = error;
    //ToastAndroid.show(`Error: ${code} - ${message}`, ToastAndroid.LONG);
    ToastAndroid.show(`Error: ${code}`, ToastAndroid.LONG);
    emojiFound = false; 
  });

  //------------------------
  // ... then the lists ...
  //------------------------
  const myLists = realmDB.getAllLists();
  ToastAndroid.show(`Lists: ${myLists.length}`, ToastAndroid.LONG);
  myLists.forEach(list => {
    const thisPromise = userData.collection('Lists').doc(list.key).set({ list })
    .catch(error => {
      const { code, message } = error;
      ToastAndroid.show(`Error: ${code} - ${message}`, ToastAndroid.SHORT);
    });
    promises.push(thisPromise);
  });
  //-------------------------------
  // ... and finally the cards ...
  //-------------------------------
  const myCards = realmDB.getAllCards();
  ToastAndroid.show(`Cards: ${myCards.length}`, ToastAndroid.LONG);
  myCards.forEach(card => {
    const thisPromise = userData.collection('Cards').doc(card.key).set({ card })
    .catch(error => {
      const { code, message } = error;
      ToastAndroid.show(`Error: ${code} - ${message}`, ToastAndroid.SHORT);
    });
    promises.push(thisPromise);
  });
  */
