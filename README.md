[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

# About

Convenient way to use maps with object-like syntax in Javascript and Typescript

```typescript
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
}.asMaps(); // Just add this at the end!

console.log(someMap.get('secondKey')); // 66
console.log(someMap.get('inner').get('deeper').get('me')); //777

someMap.get('inner').set('newKey', 'newValue');
console.log(someMap.get('inner').get('newKey')); //'newValue'

console.log(someMap);
/*
Map(4) {
  'firstKey' => 33,
  'secondKey' => 66,
  'thirdKey' => 99,
  'insideStructure' => Map(4) {
    'firstArray' => [ 4, 8, 12, 16, 20 ],
    'secondArray' => [ 24, 28, 32, 36, 40 ],
    'thirdArray' => [ 44, 48, 52, 56, 60 ],
    'evenDeeper' => Map(5) {
      'give' => true,
      'me' => 777,
      'some' => 'What',
      'hamburger' => null,
      'now' => 3.14159265
    },
    'newKey' => 'newValue'
  }
}
*/
```

# Why This was Made

`Object` in Javascript and Typescript shouldn't be used as dictionary purposes!

There are 3 container types in Javascript and Typescript:

- `Array`: Storage type for sequencial items as we all know
- `Map`: Dictionary(Hashmap) type where data are stored in key-value pairs
- `Set`: Storage type for sequencial items without any duplicated value

`Object` is never a container type. Rather it's a data structure for storing attributes of instances of classes(Constructor functions). Although historically `Object` was recognized as a way to store data with names, it is not a proper way to store key-value pairs of data.

Why is it inappropriate to use `Object` as dictionary? Well, a picture is worth a thousand words...

```typescript
const someObject = {
  firstProperty: 33,
  secondProperty: 66,
  thirdProperty: 99,
};

console.log(someObject.firstProperty); // 33 - Okay
console.log(someObject.thirdProperty); // 99 - Okay
console.log(someObject.hasOwnProperty); // [Function: hasOwnProperty] - Huh?
```

As you can see, all objects have underlying attributes even if we haven't explicitly added it. Basically all key-value pairs of an object are mixed with prototype attributes.

However, manually creating a map structure is quite cumbersome and not intuitive.

```typescript
const someMap = new Map();
someMap.set('firstKey', 33);
someMap.set('secondKey', 66);
someMap.set('thirdKey', 99);
// This goes on and on...
```

That's the reason this library exists. We need a way to use `Map` type conveniently just like we use `Object`. This library aims to provide map literal feature as well as JSON conversion functions, which do not exist in ECMAScript standard.

# Installation

```bash
npm install map-assist
```

# Usage

```ts
import { jsonParse, jsonStringify } from 'map-assist';
```

[downloads-img]: https://img.shields.io/npm/dt/map-assist
[downloads-url]: https://www.npmtrends.com/map-assist
[npm-img]: https://img.shields.io/npm/v/map-assist
[npm-url]: https://www.npmjs.com/package/map-assist
[issues-img]: https://img.shields.io/github/issues/ryansonshine/map-assist
[issues-url]: https://github.com/ryansonshine/map-assist/issues
[codecov-img]: https://codecov.io/gh/ryansonshine/map-assist/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ryansonshine/map-assist
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
