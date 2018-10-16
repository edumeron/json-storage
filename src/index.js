import objectPath from 'object-path'
import isFunction from 'lodash.isfunction'

function createStorage (namespace, ls = global.localStorage) {
  const fallbackStorage = {}

  function getStorage () {
    try {
      const data = ls.getItem(namespace)

      if (data) {
        return JSON.parse(data)
      }

      ls.setItem(namespace, '{}')

      return {}
    } catch (err) {
      fallbackStorage[namespace] = fallbackStorage[namespace] || {}
      return fallbackStorage[namespace]
    }
  }

  function update (value) {
    try {
      ls.setItem(namespace, JSON.stringify(value))
    } catch (err) {
      fallbackStorage[namespace] = value
    }
  }

  return {
    set (keypath, value) {
      const storage = getStorage(namespace)
      const newValue = isFunction(value)
        ? value(this.get(keypath))
        : value

      objectPath.set(
        storage,
        keypath,
        newValue
      )

      update(storage)
      return newValue
    },

    get (keypath, fallback) {
      return objectPath.get(
        getStorage(),
        keypath,
        fallback
      )
    },

    clear () {
      update({})
      return this
    },

    toJSON () {
      return getStorage()
    }
  }
}

export default createStorage
