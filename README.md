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

Convenient way to use Maps with Object-like syntax in Javascript and Typescript

```typescript
import 'map-literal'; // Just import it and everything is ready

// This is a Map, not an Object
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
      some: 'What',
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree(); // Just add this at the end!

// Works well on nested structures
console.log(someMap.get('secondKey')); // 66
console.log(someMap.get('inner').get('deeper').get('me')); //777
someMap.get('inner').set('newKey', 'newValue');
console.log(someMap.get('inner').get('newKey')); //'newValue'
```

- `Map` literal syntax
- Full support for nested structures
- Full integration with all container types: `Array`, `Map`, `Set`
- Full Typescript support
- JSON to `Map` structure, `Map` structure to JSON conversion

# Why This was Made

`Object` in Javascript and Typescript shouldn't be used as dictionary!

There are 3 container types in Javascript and Typescript:

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
someMap.set('firstKey', 33);
someMap.set('secondKey', 66);
someMap.has('someKey'); // false
someMap.values(); // [33, 66]
```

So now we know that `Map` is the proper dictionary type. However, manually creating a `Map` structure via its normal syntax is quite cumbersome and not so intuitive.

```typescript
const someMap = new Map();
someMap.set('firstKey', 33);
someMap.set('secondKey', 66);
someMap.set('thirdKey', 99);
const innerMap = new Map();
someMap.set('inner', innerMap);
// This goes on and on...
```

That's the reason this library exists. We need a way to use `Map` type conveniently just like when we use `Object`. This library aims to provide map literal feature as well as JSON conversion functions, which are not included in ECMAScript standard.

# Installation

```bash
npm install map-literal
```

# Usage

This is the basic map literal syntax.

```typescript
import 'map-literal';

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
      some: 'What',
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();
```

Also works well on `Array`...

```typescript
import 'map-literal';

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
import 'map-literal';

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

Parsing JSON is very convenient...

```typescript
import { jsonParse, jsonStringify } from 'map-literal';

const jsonString =
  '{ "glossary": { "title": "example glossary", "GlossDiv": { "title": "S", "GlossList": { "GlossEntry": { "ID": "SGML", "SortAs": "SGML", "GlossTerm": "Standard Generalized Markup Language", "Acronym": "SGML", "Abbrev": "ISO 8879:1986", "GlossDef": { "para": "A meta-markup language, used to create markup languages such as DocBook.", "GlossSeeAlso": ["GML", "XML"] }, "GlossSee": "markup" } } } } }';

// Structure comprised of Maps and Arrays
const someMap = jsonParse(jsonString);
```

as well as stringifying to JSON.

```typescript
import { jsonParse, jsonStringify } from 'map-literal';

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
      some: 'What',
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();

// JSON string
const jsonString = jsonStringify(someMap);
```

Though not encouraged, you can convert the structure into `Object` if you want.

```typescript
import 'map-literal';

// Map and Array Structure
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
      some: 'What',
      hamburger: null,
      now: 3.14159265,
    },
  },
}.asMapTree();

// Object and Array structure
const someObject = someMap.asObjectTree();
```
