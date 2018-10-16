# json-storage

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![standard][standard-badge]][standard]

A tiny module to manage localStorage.

## Installation

`yarn add @edumeron/json-storage object-path`

`npm install @edumeron/json-storage object-path --save`

## Getting Started

Create your storage:

```js
import createStorage from '@edumeron/json-storage'

const storage = createStorage('my_app_namespace')
```

Both `get` and `set` work with keypath as parameter:

```js
// Set user
storage.set('user', { id: 1, name: 'Peter Parker' })
storage.get('user.name') // Peter Parker

// The avatar object will be created automatically
storage.set('user.avatar.url', 'http://placehold.id/150x150')

storage.get('user')
// { id: 1, name: 'Peter Parker', avatar: { url: ''http://placehold.id/150x150' } }
```

You can use `toJSON` to retrieve all data from the storage:

```js
storage.toJSON()
/*
{
  user: {
    id: 1,
    name: 'Peter Parker',
    avatar: {
      url: 'http://placehold.id/150x150'
    }
  }
}
*/
```

Check out the full API methods below.

## API

The API consists of only 4 methods:

- [get](#getkeypath-string-fallback-any)
- [set](#setkeypath-string-value-any)
- [clear](#clear)
- [toJSON](#tojson)

### get(keypath: string, fallback: any)

Returns the value for the given keypath.

```js
storage.get('user.name') // Peter Parker

// Non-existing property
storage.get('user.age') // undefined

// You can also pass a fallback value
storage.get('user.age', 20) // 20
```

### set(keypath: string, value: any)

Sets a new value for the given keypath.

```js
storage.set('prop', 'some_value') // some_value

// You can pass a function to modify the current value
storage.set('user.permissions',  permissions => {
  return permissions.concat('read')
}) // ['create', 'read']
```

It always return the value you passed:

```js
console.log(storage.set('prop', 'some_value'))
// => some_value
```

### clear()

Removes all the values from the storage.

```js
storage.clear()

storage.toJSON() // {}
```

### toJSON()

Returns the whole storage as an object.

```js
storage.toJSON();
/*
{
  user: {
    id: 1,
    name: 'Peter Parker',
    avatar: {
      url: 'http://placehold.id/150x150'
    }
  }
}
*/
```

## Tests

`npm install`

`npm test`

[build-badge]: https://img.shields.io/travis/edumeron/json-storage/master.png?style=flat-square
[build]: https://travis-ci.org/edumeron/json-storage

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/edumeron/json-storage/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/edumeron/json-storage

[standard-badge]: https://img.shields.io/badge/code%20style-standard-green.svg?longCache=true&style=flat-square
[standard]: https://standardjs.com

## License

MIT
