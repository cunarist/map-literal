import "./as-map-tree";
import "./as-object-tree";

export function jsonParse(
  jsonString: string
): Map<string, any> | Array<any> | String | Number | Boolean | null {
  const parsed = JSON.parse(jsonString);
  if (parsed == null) {
    return parsed;
  } else if (parsed.constructor == Object) {
    return parsed.asMapTree();
  } else if (parsed.constructor == Array) {
    return parsed.asMapTree();
  } else {
    return parsed;
  }
}

export function jsonStringify(
  original: Map<any, any> | Array<any> | String | Number | Boolean | null
): string {
  if (original == null) {
    return JSON.stringify(original);
  } else if (original.constructor == Map) {
    return JSON.stringify(original.asObjectTree());
  } else if (original.constructor == Array) {
    return JSON.stringify(original.asObjectTree());
  } else {
    return JSON.stringify(original);
  }
}
