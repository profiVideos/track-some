import { ToastAndroid } from 'react-native';
import { cfgRealm } from '../data/tsObjects';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

/*

NEW:***********************************************************************

My First Realm Cloud Instance;
https://tracksome-live.us1.cloud.realm.io/

NEW:***********************************************************************

*/

export const getUserConfig = (userId) => {
  //---------------------------------------------------------
  // ... this is the device config file specific to this ... 
  // ... mobile device and the currently logged in user ...
  //---------------------------------------------------------
  try {
    const userConfig = cfgRealm.objectForPrimaryKey('Config', userId);
    return userConfig;
  } catch (error) {
    ToastAndroid.show(`User Config Error: ${error}`, ToastAndroid.LONG);
  }
};

export const addUserConfig = (firebaseUser) => {
  // ... add this user's information in realm file ...
  try {
    cfgRealm.write(() => {
      cfgRealm.create('Config', {
        userid: firebaseUser.uid,
        nickname: (firebaseUser.displayName !== null ? firebaseUser.displayName : null),
        email: firebaseUser.email,
        dbVersion: 1.0,
        signup: firebaseUser.providerId,
        created: new Date()
      });
    });
  } catch (error) {
    // Handle the error here if something went wrong
    ToastAndroid.show(`Add Config Error: ${error}`, ToastAndroid.LONG);
  }
  // ... clean up and go home ...
};

/*
export const restoreUserConfig = (userId, user) => {
  //-----------------------------------------------------
  // ... write the data back into the realm database ...
  //-----------------------------------------------------
  cfgRealm.write(() => {
    cfgRealm.create('Config', {
      userid: userId,   // ... primary key - needed for update ...
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      photoURI: user.photoURI,
      dbVersion: user.dbVersion,
      signup: user.signup,
      created: user.created,
      lastSync: user.lastSync
    }, true);
  });
};
*/

export const updateUserConfig = (userId, lastSync) => {
  // ... update this user's information in realm file ...
  try {
    cfgRealm.write(() => {
      cfgRealm.create('Config', {
        userid: userId,
        lastSync
      }, true);  // ... update based on user id ...
    });
  } catch (error) {
    // Handle the error here if something went wrong
    ToastAndroid.show(`Config Error: ${error}`, ToastAndroid.LONG);
  }
  // ... clean up and go home ...
};

/*
    userid: 'string',
    nickname: 'string',
    email: 'string?',
    phone: 'string?',
    photoURI: 'string?',
    dbVersion: 'float',
    signup: 'string',
    created: 'date',
    lastSync: 'date?'
*/
