import objectsToMaps from './objects-as-maps';
import mapsToObjects from './maps-as-objects';

export { objectsToMaps, mapsToObjects };

export function jsonParse(json: string): any {
  const parsed = JSON.parse(json);
  if (parsed.constructor == Object) {
    return parsed.asMaps();
  } else if (parsed.constructor == Array) {
    return parsed.asMaps();
  } else {
    return parsed;
  }
}

export function jsonStringify(original: any): any {
  if (original.constructor == Map) {
    return JSON.stringify(mapsToObjects.convertMap(original));
  } else if (original.constructor == Array) {
    return JSON.stringify(mapsToObjects.convertArray(original));
  } else {
    return JSON.stringify(original);
  }
}
