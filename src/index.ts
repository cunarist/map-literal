import "./as-map-tree";
import "./as-object-tree";

export function jsonToTree(
  jsonString: string
): Map<string, any> | Array<any> | string | number | boolean | null {
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

export function treeToJson(
  original:
    | Object
    | Map<any, any>
    | Array<any>
    | string
    | number
    | boolean
    | null
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
