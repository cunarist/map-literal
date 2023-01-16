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
  for (const [itemKey, itemValueV] of original.entries()) {
    const itemValue = itemValueV as any;
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

export default { convertObject, convertMap, convertArray, convertSet };
