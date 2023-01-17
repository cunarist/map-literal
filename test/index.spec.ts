import { jsonStringify, jsonParse } from '../src';

let a = [{ dsfd: 623 }, { ashgeh: 3, sdga: 33 }];
let b = a.asMaps();
let c = b.asObjects();

console.log(a);

let jsonMap = jsonStringify(a);
console.log(jsonMap);

let parsed = jsonParse(jsonMap);
console.log(parsed);

let z = 3;
let za = z.asMaps();

function dothis(yes: boolean) {
  if (yes) {
    return 3;
  } else {
    return 'Dfsdf';
  }
}

let sdgads = dothis(true);
