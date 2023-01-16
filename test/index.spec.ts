import { jsonStringify, jsonParse } from '../src';

let a = [
  {
    dgsdgsd: 3,
    shgashehsehes: [1, 2, 3, 4, 5, 6, 7],
    sddsgsdhsdahsdfhf: { aeg: 2362, dsahgweahewh: 457237 },
  },
  5,
  6,
].asMap();

console.log(a);

let jsonMap = jsonStringify(a);
console.log(jsonMap);

let parsed = jsonParse(jsonMap);
console.log(parsed);
