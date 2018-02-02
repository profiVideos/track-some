import { tsRealm } from '../data/tsObjects';
import { UniqueId } from '../../components/common/UniqueId';

// ... Realm supports the following basic types: bool, int, float, double, string, data, and date.
// ... Each property has a name and is described by either a string containing the property’s type, 
// ... or an object with name, type, objectType, optional, default, and indexed fields.

export const getAllCategories = () => {
  const catItems = tsRealm.objects('Category').sorted('name');  // + ,true for reverse sorting ...
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

export const updateCategory = (key, name, desc, icon, selected) => {
  tsRealm.write(() => {
    // ... update this category based on the key ...
    tsRealm.create('Category', { key, name, desc, icon, selected }, true);
  });
};

export const createCategory = (catName, catDesc, catIcon) => {
  tsRealm.write(() => {
    tsRealm.create('Category', {
      key: UniqueId(),
      name: catName,
      desc: catDesc,
      icon: catIcon,
      selected: false,
      createdTimestamp: new Date()
    });
  });
};

export const deleteSelectedCategories = () => {
  tsRealm.write(() => {
    const allSelected = tsRealm.objects('Category').filtered('selected = true');
    tsRealm.delete(allSelected);
  });
};

export const deleteCategory = (key) => {
  tsRealm.write(() => {
    tsRealm.delete(key);  // ... check on the correct syntax for this ...
  });
};
