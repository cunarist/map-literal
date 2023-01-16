import './object-to-map';
import mapToObject from './map-to-object';

export function jsonParse(json: string): any {
  const parsed = JSON.parse(json);
  if (parsed.constructor == Object) {
    return parsed.asMap();
  } else if (parsed.constructor == Array) {
    return parsed.asMap();
  } else {
    return parsed;
  }
}

export function jsonStringify(original: any): any {
  if (original.constructor == Map) {
    return JSON.stringify(mapToObject.convertMap(original));
  } else if (original.constructor == Array) {
    return JSON.stringify(mapToObject.convertArray(original));
  } else {
    return JSON.stringify(original);
  }
}
