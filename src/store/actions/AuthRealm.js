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

    const snapShot = devConfig.snapshot();
    snapShot.forEach(config => {
      found += `"${config.userid}"`;
    });

*/

export const getConfig = () => {
  //-----------------------------------------------------------------------
  // ... this is the device config file specific to this mobile device ...
  //-----------------------------------------------------------------------
  //ToastAndroid.show(`Look for Key: ${key}`, ToastAndroid.SHORT);
  try {
    const devConfig = cfgRealm.objects('Config')[0];
    //ToastAndroid.show(`Config: ${found}`, ToastAndroid.SHORT);
    return devConfig;
  } catch (error) {
    // Handle the error here if something went wrong
    ToastAndroid.show(`Get Config Error: ${error}`, ToastAndroid.LONG);
  }
};

/*
    // ...use the realm instance here
    const devConfig = realm.objects('Config');
    const snapShot = devConfig.snapshot();
    snapShot.forEach(config => {
      found += `"${config.userid}"`;
    });
    ToastAndroid.show(`Config: ${found}`, ToastAndroid.SHORT);
    /*
    if (devConfig !== undefined) {
      //const myConfig = devConfig.userid;
      //const devConfig = realm.objectForPrimaryKey('Config');
      ToastAndroid.show(`Inside GET Config: ${devConfig.userid}`, ToastAndroid.SHORT);
      return devConfig;
    }
*/

export const saveConfig = (firebaseUser) => {
  // ... add or update this user's information in realm file ...
  try {
    cfgRealm.write(() => {
      cfgRealm.create('Config', {
        userid: firebaseUser.uid,
        nickname: firebaseUser.displayName,
        email: firebaseUser.email,
        dbVersion: 1.0,
        signup: firebaseUser.providerId,
        //created: new Date(firebaseUser.metadata.creationTime),
        created: new Date()
      }, true);  // ... update based on user id ...
    });
  } catch (error) {
    // Handle the error here if something went wrong
    ToastAndroid.show(`Create Error: ${error}`, ToastAndroid.LONG);
  }
  // ... clean up and go home ...
};

/*
    userid: 'string',
    nickname: 'string',
    email: 'string?',
    phone: 'string?',
    photoURI: 'string?',
    dbVersion: 'string',
    signup: 'string',
    created: 'date',
    lastSync: 'date'
*/
