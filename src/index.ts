export {};

function convertObject<V>(original: Object): Map<String, V> {
  const newlyCreated = new Map<String, V>();
  for (const [itemKey, itemValue] of Object.entries(original)) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.set(itemKey, convertObject(itemValue) as unknown as V);
      } else if (itemValue.constructor == Map) {
        newlyCreated.set(itemKey, convertMap(itemValue) as unknown as V);
      } else if (itemValue.constructor == Array) {
        newlyCreated.set(itemKey, convertArray(itemValue) as unknown as V);
      } else if (itemValue.constructor == Set) {
        newlyCreated.set(itemKey, convertSet(itemValue) as unknown as V);
      } else {
        newlyCreated.set(itemKey, itemValue);
      }
    } else {
      newlyCreated.set(itemKey, itemValue);
    }
  }
  return newlyCreated;
}

function convertMap<K, V>(original: Map<K, V>): Map<K, V> {
  const newlyCreated = new Map<K, V>();
  for (const [itemKey, itemValueV] of original.entries()) {
    const itemValue = itemValueV as any;
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.set(itemKey, convertObject(itemValue) as unknown as V);
      } else if (itemValue.constructor == Map) {
        newlyCreated.set(itemKey, convertMap(itemValue) as unknown as V);
      } else if (itemValue.constructor == Array) {
        newlyCreated.set(itemKey, convertArray(itemValue) as unknown as V);
      } else if (itemValue.constructor == Set) {
        newlyCreated.set(itemKey, convertSet(itemValue) as unknown as V);
      } else {
        newlyCreated.set(itemKey, itemValue);
      }
    } else {
      newlyCreated.set(itemKey, itemValue);
    }
  }
  return newlyCreated;
}

function convertArray<V>(original: Array<V>): Array<V> {
  const newlyCreated = new Array<V>();
  for (const itemValue of original as any) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.push(convertObject(itemValue) as unknown as V);
      } else if (itemValue.constructor == Map) {
        newlyCreated.push(convertMap(itemValue) as unknown as V);
      } else if (itemValue.constructor == Array) {
        newlyCreated.push(convertArray(itemValue) as unknown as V);
      } else if (itemValue.constructor == Set) {
        newlyCreated.push(convertSet(itemValue) as unknown as V);
      } else {
        newlyCreated.push(itemValue);
      }
    } else {
      newlyCreated.push(itemValue);
    }
  }
  return newlyCreated;
}

function convertSet<V>(original: Set<V>): Set<V> {
  const newlyCreated = new Set<V>();
  for (const itemValue of original as any) {
    if (itemValue != null) {
      if (itemValue.constructor == Object) {
        newlyCreated.add(convertObject(itemValue) as unknown as V);
      } else if (itemValue.constructor == Map) {
        newlyCreated.add(convertMap(itemValue) as unknown as V);
      } else if (itemValue.constructor == Array) {
        newlyCreated.add(convertArray(itemValue) as unknown as V);
      } else if (itemValue.constructor == Set) {
        newlyCreated.add(convertSet(itemValue) as unknown as V);
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
    asMap<V>(): Map<String, V>;
  }
  interface Map<K, V> {
    asMap<K, V>(): Map<K, V>;
  }
  interface Array<T> {
    asMap<V>(): Array<V>;
  }
  interface Set<T> {
    asMap<V>(): Set<V>;
  }
}

Object.prototype.asMap = function <V>() {
  // @ts-ignore
  return convertObject<V>(this);
};
Map.prototype.asMap = function <K, V>() {
  // @ts-ignore
  return convertMap<K, V>(this);
};
Array.prototype.asMap = function <V>() {
  // @ts-ignore
  return convertArray<V>(this);
};
Set.prototype.asMap = function <V>() {
  // @ts-ignore
  return convertSet<V>(this);
};
