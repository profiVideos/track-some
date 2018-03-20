import { ToastAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { 
  loadMyEmojis,
  finishBackupSync,
  categoryRestoreSuccess
} from '../store/actions';
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

const onDateList = (querySnapshot) => {
  cloudData = [];
  querySnapshot.forEach((doc) => {
    cloudData.push({
      key: doc.id,
      updated: doc.get('updatedTimestamp')
    });
  });
};

const onEmojisRestore = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    realmDB.restoreEmoji(doc.id, doc.data());
  });
};

const onCategoriesRestore = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    realmDB.restoreCategory(doc.id, doc.data());
  });
};

const onNotesRestore = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // ... if the note in the cloud is newer then restore it ...
    realmDB.restoreNote(doc.id, doc.data());
  });
};

function findDataKey(key) {
  return cloudData.findIndex((element) => { return element.key === key; });
}

function restoreEmojiData(userData, dispatch) {
  //------------------------------------------------------------------
  // ... get the emojis loaded in cloud firestore & wait for them ...
  //------------------------------------------------------------------
  const emojiUnsubscribe = userData.collection('Emojis').onSnapshot(onEmojisRestore);
  const emojiRef = userData.collection('Emojis');
  promises.push(emojiRef.get());
  Promise.all(promises).then(() => {
    emojiUnsubscribe();  // ... no more emoji updates please ...
    dispatch(loadMyEmojis());
  });
}

function restoreCategoryData(userData, dispatch) {
  //----------------------------------------------------------------------
  // ... get the categories loaded in cloud firestore & wait for them ...
  //----------------------------------------------------------------------
  const categoryUnsubscribe = userData.collection('Categories').onSnapshot(onCategoriesRestore);
  const categoryRef = userData.collection('Categories');
  promises.push(categoryRef.get());
  Promise.all(promises).then(() => {
    categoryUnsubscribe();  // ... no more category updates please ...
    dispatch(categoryRestoreSuccess());
  });
}

function restoreNotesData(userData, dispatch) {
  //-----------------------------------------------------------------
  // ... get the notes loaded in cloud firestore & wait for them ...
  //-----------------------------------------------------------------
  const notesUnsubscribe = userData.collection('Notes').onSnapshot(onNotesRestore);
  const notesRef = userData.collection('Notes');
  promises.push(notesRef.get());
  Promise.all(promises).then(() => {
    notesUnsubscribe();  // ... no more category updates please ...
    dispatch(categoryRestoreSuccess());
  });
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
  const noteUnsubscribe = userData.collection('Notes').onSnapshot(onDateList);
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

function backupListsData(userData, debug) {
  //--------------------------
  // ... backup the lists ...
  //--------------------------
  numAdded = 0;
  numUpdated = 0;
  numDeleted = 0;
  let newPromise = null;
  const myLists = realmDB.getAllLists();
  const listUnsubscribe = userData.collection('Lists').onSnapshot(onDateList);
  if (debug) ToastAndroid.show(`Lists: ${myLists.length}`, ToastAndroid.SHORT);
  //-----------------------------------------------------------------
  // ... get the lists loaded in cloud firestore & wait for them ...
  //------------------------------------------------ -----------------
  const listRef = userData.collection('Lists');
  promises.push(listRef.get());
  Promise.all(promises).then(() => {
    listUnsubscribe();  // ... no more list updates please ...
    //--------------------------------------------------------------------
    // ... now add or update the lists from the mobile realm database ...
    //--------------------------------------------------------------------
    myLists.forEach(list => {
      const indexPos = findDataKey(list.key);
      if (indexPos >= 0) {
        // ... do a check on the date fields to see if the list has changed ...
        if (list.updatedTimestamp > cloudData[indexPos].updated) {
          newPromise = userData.collection('Lists').doc(list.key).set({
            name: list.name,
            desc: list.desc,
            icon: list.icon,
            iconType: list.iconType,
            imageThumb: list.imageThumb,
            mimeType: list.mimeType,
            numCards: list.numCards,
            numNotes: list.numNotes,
            selected: list.selected,
            updatedTimestamp: list.updatedTimestamp
          }, { merge: true });
          promises.push(newPromise);
          numUpdated++;
        }
      } else {
        // ... add this list to the cloud firestore ...
        newPromise = userData.collection('Lists').doc(list.key).set({
          name: list.name,
          desc: list.desc,
          icon: list.icon,
          iconType: list.iconType,
          imageThumb: list.imageThumb,
          mimeType: list.mimeType,
          numCards: list.numCards,
          numNotes: list.numNotes,
          selected: list.selected,
          updatedTimestamp: list.updatedTimestamp,
          createdTimestamp: list.createdTimestamp
        });
        promises.push(newPromise);
        numAdded++;
      }
    });
    //------------------------------------------------------------------------------ 
    // ... and finally delete lists in the cloud that no longer exist on device ...
    //------------------------------------------------------------------------------
    cloudData.forEach(list => {
      // ... check if this cloud list is still on the device ...
      const thisList = realmDB.getList(list.key);
      if (thisList === undefined) {
        newPromise = userData.collection('Lists').doc(list.key).delete();
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

function backupCardsData(userData, debug) {
  //--------------------------
  // ... backup the cards ...
  //--------------------------
  numAdded = 0;
  numUpdated = 0;
  numDeleted = 0;
  let newPromise = null;
  const myCards = realmDB.getAllCards();
  const cardUnsubscribe = userData.collection('Cards').onSnapshot(onDateList);
  if (debug) ToastAndroid.show(`Cards: ${myCards.length}`, ToastAndroid.SHORT);
  //-----------------------------------------------------------------
  // ... get the cards loaded in cloud firestore & wait for them ...
  //------------------------------------------------ -----------------
  const cardRef = userData.collection('Cards');
  promises.push(cardRef.get());
  Promise.all(promises).then(() => {
    cardUnsubscribe();  // ... no more card updates please ...
    //--------------------------------------------------------------------
    // ... now add or update the cards from the mobile realm database ...
    //--------------------------------------------------------------------
    myCards.forEach(card => {
      const indexPos = findDataKey(card.key);
      if (indexPos >= 0) {
        // ... do a check on the date fields to see if the card has changed ...
        if (card.updatedTimestamp > cloudData[indexPos].updated) {
          newPromise = userData.collection('Cards').doc(card.key).set({
            list: card.list,
            name: card.name,
            desc: card.desc,
            icon: card.icon,
            iconType: card.iconType,
            rating: card.rating,
            category: card.category,
            imageThumb: card.imageThumb,
            mimeType: card.mimeType,
            tags: card.tags,
            notes: card.notes,
            selected: card.selected,
            updatedTimestamp: card.updatedTimestamp
          }, { merge: true });
          promises.push(newPromise);
          numUpdated++;
        }
      } else {
        // ... add this card to the cloud firestore ...
        newPromise = userData.collection('Cards').doc(card.key).set({
          list: card.list,
          name: card.name,
          desc: card.desc,
          icon: card.icon,
          iconType: card.iconType,
          rating: card.rating,
          category: card.category,
          imageThumb: card.imageThumb,
          mimeType: card.mimeType,
          tags: card.tags,
          notes: card.notes,
          selected: card.selected,
          updatedTimestamp: card.updatedTimestamp,
          createdTimestamp: card.createdTimestamp
        });
        promises.push(newPromise);
        numAdded++;
      }
    });
    //------------------------------------------------------------------------------ 
    // ... and finally delete cards in the cloud that no longer exist on device ...
    //------------------------------------------------------------------------------
    cloudData.forEach(card => {
      // ... check if this cloud card is still on the device ...
      const thisCard = realmDB.getCard(card.key);
      if (thisCard === undefined) {
        newPromise = userData.collection('Cards').doc(card.key).delete();
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

function backupConfigData(userId) {
  //------------------------------------------------------------------------  
  // ... update the realm config file with the current sync date & time ...
  // ... and then update the config file in the firestore cloud storage ...
  //------------------------------------------------------------------------  
  let newPromise = null;
  const syncDate = new Date();
  realmDB.updateUserConfig(userId, syncDate);
  const myConfig = realmDB.getUserConfig(userId);
  //ToastAndroid.show(`Config: ${JSON.stringify(myConfig)}`, ToastAndroid.LONG);
  const userData = firebase.firestore().collection('users');
  newPromise = userData.doc(userId).set({
    userid: userId,
    nickname: myConfig.nickname,
    email: myConfig.email,
    phone: myConfig.phone,
    photoURI: myConfig.photoURI,
    dbVersion: myConfig.dbVersion,
    signup: myConfig.signup,
    created: myConfig.created,
    lastSync: syncDate
  }, { merge: true });
  promises.push(newPromise);
  //--------------------------------------------------------
  // ... backup the app configuration data in AppConfig ...
  //--------------------------------------------------------
}

export function RestoreMainFiles(userId, dispatch) {
  //-------------------------------------------------------------------
  // ... restore all the cloud data files to the realm local files ...
  //-------------------------------------------------------------------
  //const debugShow = false;  // ... display debugging info ...
  const userData = firebase.firestore().collection('photoDrops').doc(userId);
  //ToastAndroid.show('Sync Started!', ToastAndroid.SHORT);
  restoreEmojiData(userData, dispatch);
  Promise.all(promises).then(() => {
    restoreCategoryData(userData, dispatch);
    Promise.all(promises).then(() => {
      restoreNotesData(userData, dispatch);
      Promise.all(promises).then(() => {
        dispatch(finishBackupSync());
        ToastAndroid.show('Sync Complete!', ToastAndroid.SHORT);
      });
    });
  });
}

export function BackupMainFiles(userId, dispatch) {
  //----------------------------------------------------------------
  // ... backup all the realm data files to the firestore cloud ...
  //----------------------------------------------------------------
  const debugShow = false;  // ... display debugging info ...
  const userData = firebase.firestore().collection('photoDrops').doc(userId);
  backupEmojiData(userData, debugShow);
  Promise.all(promises).then(() => {
    backupCategoryData(userData, debugShow);
    Promise.all(promises).then(() => {
      backupNotesData(userData, debugShow);
      Promise.all(promises).then(() => {
        backupListsData(userData, debugShow);
        Promise.all(promises).then(() => {
          backupCardsData(userData, debugShow);
          Promise.all(promises).then(() => {
            backupConfigData(userId);
            //--------------------------------------------------------------------
            // ... once all the promises are kept - indicate that we are done ...
            //--------------------------------------------------------------------
            Promise.all(promises).then(() => {
              dispatch(finishBackupSync());
              ToastAndroid.show('Sync Complete!', ToastAndroid.SHORT);
            });
          });
        });
      });
    });
  });
}

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
*/
