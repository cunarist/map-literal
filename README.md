[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

# About

Convenient way to use maps with object-like syntax in Javascript and Typescript

# Why This was Made

Objects in Javascript and Typescript shouldn't be used as dictionary purposes!

There are 3 container types in Javascript and Typescript:

- `Array`: Storage for sequencial items as we all know
- `Map`: Hashmap where data are stored in key-value pairs
- `Set`: Storage for sequencial items without any duplicated value

`Object` is not a container type. Rather it's a data structure for storing attributes of instances of classes(Constructor functions). That's why all non-primitive types in Javascript and Typescript inherit properties and methods of `Object` type. Although `Object` was recognized as storing data with names, it is not a proper way to store key-value pairs of data.

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
