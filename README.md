![npm](https://img.shields.io/npm/v/map-literal)
![npm](https://img.shields.io/npm/dt/map-literal)
![npm bundle size](https://img.shields.io/bundlephobia/min/map-literal)
![NPM](https://img.shields.io/npm/l/map-literal)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# About

Convenient way to use Maps with Object-like syntax in JavaScript and TypeScript

```typescript
import "map-literal"; // Just import it and everything is ready

// This is a Map tree, not an Object tree
const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
    deeper: {
      give: true,
      me: 777,
      some: "What",
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree(); // Just add this at the end!

// Works well on nested structures
someMap.get("secondKey"); // 66
someMap.get("inner").get("deeper").get("me"); // 777
someMap.get("inner").get("firstArray")[2]; // 12
someMap.get("inner").set("newKey", "newValue");
someMap.get("inner").get("newKey"); // 'newValue'
```

- `Map` literal syntax
- Full support for nested structures
- Full integration with all collection types: `Array`, `Map`, `Set`
- Full TypeScript support
- JSON to `Map` tree, `Map` tree to JSON conversion

# Why This was Made

`Object` in JavaScript and TypeScript shouldn't be treated as dictionary!

There are 3 collection types in JavaScript and TypeScript:

- `Array`: Indexed with numbers
- `Map`: Stored with key-value pairs
- `Set`: Indexed with numbers without duplicates

`Object` is never a collection type. Rather it's a data structure for storing attributes of class instances. Although historically `Object` was recognized as a way to store data with names, it is not a proper way to store key-value pairs of data. Let's look at an example.

```typescript
const someObject = {
  firstProperty: 33,
  secondProperty: 66,
  thirdProperty: 99,
};

console.log(someObject.firstProperty); // 33 - Okay
console.log(someObject.secondProperty); // 66 - Okay
console.log(someObject.thirdProperty); // 99 - Okay
console.log(someObject.house); // undefined - Okay
console.log(someObject.hasOwnProperty); // [Function: hasOwnProperty] - Huh?
```

As you can see, all objects have underlying attributes even if we haven't explicitly added it. Basically all attributes of an object are mixed with prototype attributes.

Unlike `Object`, `Map` type provides high performance and convenient utility methods for dictionary operations. If you're used to Python or other object-oriented languages, this notion might look familiar.

```typescript
const someMap = new Map();
someMap.set("firstKey", 33);
someMap.set("secondKey", 66);
someMap.has("someKey"); // false
someMap.values(); // [33, 66]
```

So now we know that `Map` is the proper dictionary type. However, manually creating a `Map` tree via its normal syntax is quite cumbersome and not so intuitive.

```typescript
const someMap = new Map();
someMap.set("firstKey", 33);
someMap.set("secondKey", 66);
someMap.set("thirdKey", 99);
const innerMap = new Map();
someMap.set("inner", innerMap);
// This goes on and on...
```

That's where map literal comes into play. We need a way to use `Map` type conveniently just like when we use `Object`. This library aims to provide map literal feature as well as JSON conversion functions, which are not included in ECMAScript standard.

# Glossary

- Map tree: Structure made up of `Map`, `Array` and possibly `Set`. This is the recommended way of storing complex data.
- Object tree: Structure made up of `Object`, `Array` and possibly `Set`. Not recommended since `Object` is not appropriate for storing key-value pairs of data.

# Installation

```bash
npm install map-literal
```

# Usage

## General Situation

This is the basic map literal syntax.

```typescript
import "map-literal";

// We meet again
const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
    deeper: {
      give: true,
      me: 777,
      some: "What",
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();
```

Also works well on `Array`...

```typescript
import "map-literal";

const someArray = [
  {
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  },
  {
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  },
  {
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  },
  {
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  },
].asMapTree();
```

and even `Set`!

```typescript
import "map-literal";

const someSet = new Set([
  {
    firstKey: 33,
    secondKey: 66,
    thirdKey: 99,
  },
  {
    firstKey: 22,
    secondKey: 55,
    thirdKey: 88,
  },
]).asMapTree();
```

You can convert the `Map` tree into `Object` tree if you want.

```typescript
import "map-literal";

// Map tree
const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
}.asMapTree();

// Object tree
const someObject = someMap.asObjectTree();
```

If you already have any `Object` tree variable from somewhere else such as API functions, you can convert it into `Map` tree with the same method. Opposite is also possible.

```typescript
...
someObject; // Object Tree from somewhere else
const someMap = someObject.asMapTree(); // Map Tree
const someNewObject = someMap.asObjectTree(); // Object Tree
```

## Dealing with JSON

Parsing JSON is easy.

```typescript
import { jsonToTree, treeToJson } from "map-literal";

// string
const jsonString =
  '{ "glossary": { "title": "example glossary", "GlossDiv": { "title": "S", "GlossList": { "GlossEntry": { "ID": "SGML", "SortAs": "SGML", "GlossTerm": "Standard Generalized Markup Language", "Acronym": "SGML", "Abbrev": "ISO 8879:1986", "GlossDef": { "para": "A meta-markup language, used to create markup languages such as DocBook.", "GlossSeeAlso": ["GML", "XML"] }, "GlossSee": "markup" } } } } }';

// Map tree
const someMap = jsonToTree(jsonString);
```

Stringifying to JSON is also easy.

```typescript
import { jsonToTree, treeToJson } from "map-literal";

// Map tree
const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
    deeper: {
      give: true,
      me: 777,
      some: "What",
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();

// string
const jsonString = treeToJson(someMap);
```

Even if the input is an `Object` tree, JSON conversion still works well.

```typescript
// string
const jsonString = treeToJson({
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
});
```

## Using TypeScript

Contents of the `Map` tree have `any` type.

```typescript
import "map-literal";

const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
  },
}.asMapTree();

const varOne = someMap; // Map<string, any>
```

Therefore, if you need to clarify types of items extracted from the tree, you have to manually perform type assertion.

```typescript
import "map-literal";

const someMap = {
  firstKey: 33,
  secondKey: 66,
  thirdKey: 99,
  inner: {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
  },
}.asMapTree();

const varOne = someMap.get("inner"); // any
const varTwo = someMap.get("inner") as Map<string, any>; // Map<string, any>
```

Alternatively, if the tree is simple enough you can perform type assertion directly on the tree.

```typescript
import "map-literal";

const someMap = [
  {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
  },
  {
    firstArray: [4, 8, 12, 16, 20],
    secondArray: [24, 28, 32, 36, 40],
    thirdArray: [44, 48, 52, 56, 60],
  },
].asMapTree() as Array<Map<string, Array<Number>>>;

const varOne = someMap[0]; // Map<string,Array<Number>>
const varTwo = someMap[0].get("thirdArray")![4]; // Number
```
