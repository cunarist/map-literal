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

function convertObject(original: Object): Object {
  const newlyCreated: { [index: string]: any } = new Object();
  for (const [itemKey, itemValue] of Object.entries(original)) {
    newlyCreated[itemKey] = convert(itemValue);
  }
  return newlyCreated;
}

function convertMap(original: Map<string, any>): Object {
  const newlyCreated: { [index: string]: any } = new Object();
  for (const [itemKey, itemValue] of original.entries()) {
    newlyCreated[itemKey] = convert(itemValue);
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
