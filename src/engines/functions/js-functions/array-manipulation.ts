import * as R from "ramda";

/**
 * Merging array and remove duplication
 * 
 * @example
 * const collection = [
        [{ _id: 1, eyes: "blue" }],
        [{ _id: 2, eyes: "brown" }, { _id: 1, eyes: "blue" }],
        [{ _id: 3, eyes: "green" }],
        [{ _id: 4, eyes: "blue" }],
    ];
    const result = arrayMergeNoDup("_id", collection);
    //* result: 
    [ { _id: 1, eyes: 'blue' },
      { _id: 2, eyes: 'brown' },
      { _id: 3, eyes: "green" }
      { _id: 4, eyes: 'blue' }]

 * @version 0.7.4
 */
export function arrayMergeNoDup(filterKey: string, collection: any[]) {
  const smartMerging = R.pipe(
    //@ts-ignore
    R.map(R.indexBy(R.prop(filterKey))),
    R.reduce(R.mergeWith(R.merge), {}),
    R.values
  );
  //@ts-ignore
  return smartMerging(collection);
}
