[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

[downloads-img]: https://img.shields.io/npm/dt/map-literal
[downloads-url]: https://www.npmtrends.com/map-literal
[npm-img]: https://img.shields.io/npm/v/map-literal
[npm-url]: https://www.npmjs.com/package/map-literal
[issues-img]: https://img.shields.io/github/issues/ryansonshine/map-literal
[issues-url]: https://github.com/ryansonshine/map-literal/issues
[codecov-img]: https://codecov.io/gh/ryansonshine/map-literal/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ryansonshine/map-literal
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

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
console.log(someMap.get("secondKey")); // 66
console.log(someMap.get("inner").get("deeper").get("me")); //777
someMap.get("inner").set("newKey", "newValue");
console.log(someMap.get("inner").get("newKey")); //'newValue'
```

- `Map` literal syntax
- Full support for nested structures
- Full integration with all container types: `Array`, `Map`, `Set`
- Full TypeScript support
- JSON to `Map` tree, `Map` tree to JSON conversion

# Why This was Made

`Object` in JavaScript and TypeScript shouldn't be used as dictionary!

There are 3 container types in JavaScript and TypeScript:

- `Array`: Storage type for sequencial items as we all know
- `Map`: Dictionary(Hashmap) type where data are stored in key-value pairs
- `Set`: Storage type for sequencial items without any duplicated value

`Object` is never a container type. Rather it's a data structure for storing attributes of instances of classes(Constructor functions). Although historically `Object` was recognized as a way to store data with names, it is not a proper way to store key-value pairs of data. Let's look at an example.

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

Unlike `Object`, `Map` type provides higher performance and convenient utility methods for dictionary operations. If you're used to Python or other object-oriented languages, this notion might look familiar.

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

Though not encouraged, you can convert the structure into `Object` if you want.

```typescript
import "map-literal";

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

// Object tree
const someObject = someMap.asObjectTree();
```

## Dealing with JSON

Parsing JSON is easy.

```typescript
import { jsonParse, jsonStringify } from "map-literal";

const jsonString =
  '{ "glossary": { "title": "example glossary", "GlossDiv": { "title": "S", "GlossList": { "GlossEntry": { "ID": "SGML", "SortAs": "SGML", "GlossTerm": "Standard Generalized Markup Language", "Acronym": "SGML", "Abbrev": "ISO 8879:1986", "GlossDef": { "para": "A meta-markup language, used to create markup languages such as DocBook.", "GlossSeeAlso": ["GML", "XML"] }, "GlossSee": "markup" } } } } }';

// Map tree
const someMap = jsonParse(jsonString);
```

Stringifying to JSON is also easy.

```typescript
import { jsonParse, jsonStringify } from "map-literal";

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

// JSON string
const jsonString = jsonStringify(someMap);
```

## Using TypeScript

Contents of the returned value has `any` type.

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
