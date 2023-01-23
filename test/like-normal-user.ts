import { treeToJson } from "../src/index";

const someObject = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
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
} as any;
const someMap = someObject.asMapTree();
const someNewObject = someMap.asObjectTree();
console.log(someMap);
console.log(someNewObject);
console.log(
  treeToJson({
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  })
);
