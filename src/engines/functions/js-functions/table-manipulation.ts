import * as R from "ramda";

/**
 * Filter collection based on values in array
 *
 * @example
 *  const array = [1, 2, 4];
    const collection = [
      { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 3, eyes: 'green' },
      { _id: 4, eyes: 'blue' },
    ];
    const result = filterByValues('_id', array, collection);
    //* result: 
    [  { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 4, eyes: 'blue' },]
    
      * @param filterKey - Filter Key (e.g. _id)
      * @param filteredList - List of filtered value
      * @param collection - Collection of raw data
      *
 * @see https://stackoverflow.com/questions/50161078/filter-collection-based-on-values-in-array-in-ramda
 * @version 0.7.1
 */
export function filterByValues(
  filterKey: string,
  filteredList: string[] | boolean[],
  collection: {}[]
) {
  const joinByType = R.innerJoin((o, type) => o[filterKey] === type);
  return joinByType(collection, filteredList);
}

/**
 * Filter collection based on values in array
 *
 * @example
    const collection = [
      { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 3, eyes: 'green' },
      { _id: 4, eyes: 'blue' },
    ];
    const result = vLookup(collection, '_id');
    //* result: [1,2,3,4]
    
 * @param collection - Collection of raw data
 * @param key - Filter Key (e.g. _id)
 *
 * @see https://ramdajs.com/docs/#pluck
 * @version 0.7.1
 */
export function vLookup(collection: any[], key: string) {
  var getValue = R.pluck(key);
  return getValue(collection);
}

/**
 * Filter collection based on key's value (e.g. _id)
 *
 * @example
    const collection = [
      { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 3, eyes: 'green' },
      { _id: 4, eyes: 'blue' },
    ];
    const result = hLookup('_id', 4, collection);
    //* result: [{ _id: 4, eyes: 'blue' }]
 *
 * @see https://ramdajs.com/docs/#propEq
 * @version 0.7.1
 */
export function hLookup(
  lookupKey: string,
  lookupKeyValue: string,
  collection: any[]
) {
  return R.filter(R.propEq(lookupKey, lookupKeyValue), collection);
}

/**
 * Filter collection based on key's value (e.g. _id)
 *
 * @example
    const collection = [
      { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 3, eyes: 'green' },
      { _id: 4, eyes: 'blue' },
    ];
    const result = xLookup('_id', 4, 'eyes', collection);
    //* result: ['blue']
 *
 * @see https://ramdajs.com/docs/#propEq
 * @version 0.7.1
 */
export function xLookup(
  lookupKey: string,
  lookupKeyValue: string,
  returnKey: string,
  collection: any[]
) {
  const ARR = hLookup(lookupKey, lookupKeyValue, collection);
  let RES = [];
  ARR.forEach((item) => {
    RES.push(item[returnKey]);
  });
  return RES;
}
