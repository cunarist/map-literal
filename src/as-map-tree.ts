function convert(original: any): any {
  if (original != null) {
    if (original.constructor == Object) {
      return convertObject(original);
    } else if (original.constructor == Map) {
      return convertMap(original);
    } else if (original.constructor == Array) {
      return convertArray(original);
    } else if (original.constructor == Set) {
      return convertSet(original);
    } else {
      return original;
    }
  } else {
    return original;
  }
}

function convertObject(original: Object): Map<string, any> {
  const newlyCreated = new Map<string, any>();
  for (const [itemKey, itemValue] of Object.entries(original)) {
    newlyCreated.set(itemKey, convert(itemValue));
  }
  return newlyCreated;
}

function convertMap<K>(original: Map<K, any>): Map<K, any> {
  const newlyCreated = new Map<K, any>();
  for (const [itemKey, itemValue] of original.entries()) {
    newlyCreated.set(itemKey, convert(itemValue));
  }
  return newlyCreated;
}

function convertArray(original: Array<any>): Array<any> {
  const newlyCreated = new Array<any>();
  for (const itemValue of original) {
    newlyCreated.push(convert(itemValue));
  }
  return newlyCreated;
}

function convertSet(original: Set<any>): Set<any> {
  const newlyCreated = new Set<any>();
  for (const itemValue of original) {
    newlyCreated.add(convert(itemValue));
  }
  return newlyCreated;
}

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type Flip<T> = IfAny<T, any, Map<string, any>>;

declare global {
  interface Object {
    asMapTree(): Flip<this>;
  }
  interface Map<K, V> {
    asMapTree(): Map<K, any>;
  }
  interface Array<T> {
    asMapTree(): Array<any>;
  }
  interface Set<T> {
    asMapTree(): Set<any>;
  }
}

Object.prototype.asMapTree = function () {
  if (this.constructor == Object) {
    return convertObject(this);
  } else {
    throw new TypeError(
      "'asMapTree' method can only be used on Object, Map, Array, Set types."
    );
  }
};
Map.prototype.asMapTree = function () {
  return convertMap(this);
};
Array.prototype.asMapTree = function () {
  return convertArray(this);
};
Set.prototype.asMapTree = function () {
  return convertSet(this);
};

export default { convertObject, convertMap, convertArray, convertSet };
