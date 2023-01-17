function convertObject(original: Object): Object {
  const newlyCreated = new Object();
  for (const [itemKey, itemValue] of Object.entries(original)) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        // @ts-ignore
        newlyCreated[itemKey] = convertObject(itemValue);
      } else if (itemValue.constructor == Map) {
        // @ts-ignore
        newlyCreated[itemKey] = convertMap(itemValue);
      } else if (itemValue.constructor == Array) {
        // @ts-ignore
        newlyCreated[itemKey] = convertArray(itemValue);
      } else if (itemValue.constructor == Set) {
        // @ts-ignore
        newlyCreated[itemKey] = convertSet(itemValue);
      } else {
        // @ts-ignore
        newlyCreated[itemKey] = itemValue;
      }
    } else {
      // @ts-ignore
      newlyCreated[itemKey] = itemValue;
    }
  }
  return newlyCreated;
}

function convertMap(original: Map<string, any>): Object {
  const newlyCreated = new Object();
  for (const [itemKey, itemValue] of original.entries()) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        // @ts-ignore
        newlyCreated[itemKey] = convertObject(itemValue);
      } else if (itemValue.constructor == Map) {
        // @ts-ignore
        newlyCreated[itemKey] = convertMap(itemValue);
      } else if (itemValue.constructor == Array) {
        // @ts-ignore
        newlyCreated[itemKey] = convertArray(itemValue);
      } else if (itemValue.constructor == Set) {
        // @ts-ignore
        newlyCreated[itemKey] = convertSet(itemValue);
      } else {
        // @ts-ignore
        newlyCreated[itemKey] = itemValue;
      }
    } else {
      // @ts-ignore
      newlyCreated[itemKey] = itemValue;
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
    asObjects(): Object;
  }
  interface Map<K, V> {
    asObjects(): Object;
  }
  interface Array<T> {
    asObjects(): Array<any>;
  }
  interface Set<T> {
    asObjects(): Set<any>;
  }
}

Object.prototype.asObjects = function () {
  if (this.constructor == Object) {
    return convertObject(this);
  } else {
    throw new TypeError(
      "'asObjects' method can only be used on Object, Map, Array, Set types."
    );
  }
};
Map.prototype.asObjects = function () {
  return convertMap(this);
};
Array.prototype.asObjects = function () {
  return convertArray(this);
};
Set.prototype.asObjects = function () {
  return convertSet(this);
};

export default { convertObject, convertMap, convertArray, convertSet };
