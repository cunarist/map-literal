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

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type Flip<T> = IfAny<T, any, Object>;

declare global {
  interface Object {
    asObjectTree(): Flip<this>;
  }
  interface Map<K, V> {
    asObjectTree(): Object;
  }
  interface Array<T> {
    asObjectTree(): Array<any>;
  }
  interface Set<T> {
    asObjectTree(): Set<any>;
  }
}

Object.prototype.asObjectTree = function () {
  if (this.constructor == Object) {
    return convertObject(this);
  } else {
    throw new TypeError(
      "'asObjectTree' method can only be used on Object, Map, Array, Set types."
    );
  }
};
Map.prototype.asObjectTree = function () {
  return convertMap(this);
};
Array.prototype.asObjectTree = function () {
  return convertArray(this);
};
Set.prototype.asObjectTree = function () {
  return convertSet(this);
};

export default { convertObject, convertMap, convertArray, convertSet };
