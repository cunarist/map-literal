import { jsonParse } from "../src/index";

const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  insideStructure: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
    evenDeeper: {
      give: true,
      me: 777,
      some: "What",
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();
console.log(someMap);

console.log(jsonParse("null"));
console.log(null);