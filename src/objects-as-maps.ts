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

declare global {
  interface Object {
    asMaps(): Map<string, any>;
  }
  interface Map<K, V> {
    asMaps(): Map<K, any>;
  }
  interface Array<T> {
    asMaps(): Array<any>;
  }
  interface Set<T> {
    asMaps(): Set<any>;
  }
}

Object.prototype.asMaps = function () {
  if (this.constructor == Object) {
    return convertObject(this);
  } else {
    throw new TypeError(
      "'asMaps' method can only be used on Object, Map, Array, Set types."
    );
  }
};
Map.prototype.asMaps = function () {
  return convertMap(this);
};
Array.prototype.asMaps = function () {
  return convertArray(this);
};
Set.prototype.asMaps = function () {
  return convertSet(this);
};

export default { convertObject, convertMap, convertArray, convertSet };
