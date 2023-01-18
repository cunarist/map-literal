import "./as-map-tree";
import "./as-object-tree";

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
    return JSON.stringify(original.asObjectTree());
  } else if (original.constructor == Array) {
    return JSON.stringify(original.asObjectTree());
  } else {
    return JSON.stringify(original);
  }
}
