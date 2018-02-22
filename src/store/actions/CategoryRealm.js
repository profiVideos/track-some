import { tsRealm } from '../data/tsObjects';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

export const getAllCategories = (activeList = '', searchFor) => {
  let catItems = '';
  if (searchFor !== null && searchFor !== undefined) {
    //ToastAndroid.show(`Matching Notes: ${queryStr}\n${foundCards}`, ToastAndroid.SHORT);
    //ToastAndroid.show(`Getting Notes: ${searchFor}`, ToastAndroid.SHORT);
    //catItems = tsRealm.objects('Category')
    //  .filtered('name CONTAINS[c] $0 OR desc CONTAINS[c] $0', searchFor)
    //  .sorted('name');
  } else {
    //ToastAndroid.show(`Notes: ${activeList}`, ToastAndroid.SHORT);
    //if (activeList !== null && activeList !== undefined && activeList !== '') {
      //ToastAndroid.show(`Get Notes: ${activeList}`, ToastAndroid.SHORT);
      // ... MG - 22.02.2018 - filtered will retrieve "list" notes and others not yet assigned ...
      catItems = tsRealm.objects('Category')
        .filtered('list = $0 OR list = ""', activeList)
        .sorted('name');  // + ,true for reverse sorting ...
    //}      
  }
  return catItems;
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

export const getCategory = (key) => {
  const thisItem = tsRealm.objectForPrimaryKey('Category', key);
  return thisItem;
};

export const updateCatSelected = (key, isSelected) => {
  tsRealm.write(() => {
    // ... update this category based on the key ...
    tsRealm.create('Category', { key, selected: isSelected }, true);
  });
};

export const createCategory = (catList, catName, catDesc, catIcon) => {
  tsRealm.write(() => {
    tsRealm.create('Category', {
      key: UniqueId(),
      name: catName,
      list: catList,
      desc: catDesc,
      icon: catIcon,
      selected: false,
      createdTimestamp: new Date()
    });
  });
};

export const updateCategory = (item) => {
  tsRealm.write(() => {
    // ... update this category based on the key ...
    // ... update this note based on the key ...
    tsRealm.create('Category', {
      key: item.key,
      name: item.name,
      list: item.list, 
      desc: item.desc,
      icon: item.icon, 
      selected: item.selected
    }, true);
  });
};

//-----------------------------------------------------------------------------
// ... we should really do this within a transaction so we could roll back ...
//-----------------------------------------------------------------------------
export const deleteCategory = (key) => {
  tsRealm.write(() => {
    const queryResult = tsRealm.objectForPrimaryKey('Category', key);
    if (queryResult !== undefined) {
      tsRealm.delete(queryResult);
    }
  });
};

export const deleteSelectedCategories = (list) => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Note').filtered('list = $0 and selected = true', list);
    if (allSelected !== undefined) {
      tsRealm.delete(allSelected);
    }
  });
};
