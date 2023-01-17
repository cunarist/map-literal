function convertObject(original: Object): Map<string, any> {
  const newlyCreated = new Map<string, any>();
  for (const [itemKey, itemValue] of Object.entries(original)) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.set(itemKey, convertObject(itemValue));
      } else if (itemValue.constructor == Map) {
        newlyCreated.set(itemKey, convertMap(itemValue));
      } else if (itemValue.constructor == Array) {
        newlyCreated.set(itemKey, convertArray(itemValue));
      } else if (itemValue.constructor == Set) {
        newlyCreated.set(itemKey, convertSet(itemValue));
      } else {
        newlyCreated.set(itemKey, itemValue);
      }
    } else {
      newlyCreated.set(itemKey, itemValue);
    }
  }
  return newlyCreated;
}

function convertMap<K>(original: Map<K, any>): Map<K, any> {
  const newlyCreated = new Map<K, any>();
  for (const [itemKey, itemValue] of original.entries()) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.set(itemKey, convertObject(itemValue));
      } else if (itemValue.constructor == Map) {
        newlyCreated.set(itemKey, convertMap(itemValue));
      } else if (itemValue.constructor == Array) {
        newlyCreated.set(itemKey, convertArray(itemValue));
      } else if (itemValue.constructor == Set) {
        newlyCreated.set(itemKey, convertSet(itemValue));
      } else {
        newlyCreated.set(itemKey, itemValue);
      }
    } else {
      newlyCreated.set(itemKey, itemValue);
    }
  }
  return newlyCreated;
}

function convertArray(original: Array<any>): Array<any> {
  const newlyCreated = new Array<any>();
  for (const itemValue of original) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.push(convertObject(itemValue));
      } else if (itemValue.constructor == Map) {
        newlyCreated.push(convertMap(itemValue));
      } else if (itemValue.constructor == Array) {
        newlyCreated.push(convertArray(itemValue));
      } else if (itemValue.constructor == Set) {
        newlyCreated.push(convertSet(itemValue));
      } else {
        newlyCreated.push(itemValue);
      }
    } else {
      newlyCreated.push(itemValue);
    }
  }
  return newlyCreated;
}

function convertSet(original: Set<any>): Set<any> {
  const newlyCreated = new Set<any>();
  for (const itemValue of original) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.add(convertObject(itemValue));
      } else if (itemValue.constructor == Map) {
        newlyCreated.add(convertMap(itemValue));
      } else if (itemValue.constructor == Array) {
        newlyCreated.add(convertArray(itemValue));
      } else if (itemValue.constructor == Set) {
        newlyCreated.add(convertSet(itemValue));
      } else {
        newlyCreated.add(itemValue);
      }
    } else {
      newlyCreated.add(itemValue);
    }
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
