// @flow
import expect from 'expect'
import createStorage from '../src'

describe('json-storage', () => {
  let storage

  it('should create a storage', () => {
    window.localStorage.clear()
    storage = createStorage('my_apps')
  })

  it('should be an empty object', () => {
    expect(storage.toJSON()).toEqual({})
  })

  it('should set a `user` object', () => {
    const user = {
      id: 1,
      name: 'Peter Parker'
    }

    expect(storage.set('user', user)).toEqual(user)
    expect(storage.get('user')).toEqual(user)
    expect(storage.get('user.id')).toEqual(user.id)
  })

  it('should set a value from any keypath', () => {
    const avatarUrl = 'http://placehold.it/150x150'
    expect(storage.set('user.avatar.url', avatarUrl)).toEqual(avatarUrl)
    expect(storage.get('user.avatar')).toEqual({
      url: avatarUrl
    })
  })

  it('should set a new value', () => {
    storage.set('a.b.c', 'abc')
    expect(storage.get('a')).toEqual({
      b: {
        c: 'abc'
      }
    })
  })

  it('should fallback to the given value', () => {
    expect(storage.get('nonexistingprop', 'value')).toEqual('value')
  })

  it('set should support an function as value parameter', () => {
    expect(storage.set('user.permissions', ['create'])).toEqual(['create'])
    expect(storage.set('user.permissions', permissions => {
      expect(permissions).toEqual(['create'])
      return permissions.concat('read')
    })).toEqual(['create', 'read'])
  })

  it('should return the whole storage as an object', () => {
    expect(storage.toJSON()).toEqual({
      user: {
        id: 1,
        name: 'Peter Parker',
        permissions: ['create', 'read'],
        avatar: {
          url: 'http://placehold.it/150x150'
        }
      },
      a: {
        b: {
          c: 'abc'
        }
      }
    })
  })

  it('should clear the storage', () => {
    storage.clear()
    expect(storage.toJSON()).toEqual({})
  })

  it('should work without localStorage', () => {
    storage = createStorage('another_storage', {})

    storage.set('user.name', 'Clark Kent')
    expect(storage.get('user')).toEqual({
      name: 'Clark Kent'
    })

    storage.clear()
    expect(storage.toJSON()).toEqual({})
  })
})
