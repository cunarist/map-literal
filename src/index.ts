import objectsToMaps from "./as-map-tree";
import mapsToObjects from "./as-object-tree";

export { objectsToMaps, mapsToObjects };

export function jsonParse(json: string): any {
  const parsed = JSON.parse(json);
  if (parsed.constructor == Object) {
    return parsed.asMapTree();
  } else if (parsed.constructor == Array) {
    return parsed.asMapTree();
  } else {
    return parsed;
  }
}

export function jsonStringify(original: any): string {
  if (original.constructor == Map) {
    return JSON.stringify(mapsToObjects.convertMap(original));
  } else if (original.constructor == Array) {
    return JSON.stringify(mapsToObjects.convertArray(original));
  } else {
    return JSON.stringify(original);
  }
}
