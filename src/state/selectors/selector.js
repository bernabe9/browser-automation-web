import { denormalize } from 'normalizr'

export default class Selector {
  constructor({ topLevelObj = 'data', objName = 'none', schema } = {}) {
    this.topLevelObj = topLevelObj
    this.objName = objName
    this.schema = schema
  }

  // extend this function with memoization to boost performance
  getAll = state => this.all(state)

  all = (state = {}) => {
    if (!state[this.topLevelObj]) {
      return undefined
    }

    if (!state[this.topLevelObj][this.objName]) {
      return undefined
    }

    const result = denormalize(
      Object.keys(state[this.topLevelObj][this.objName]),
      this.schema,
      state.data
    )

    return result
  }

  filter = (state, options = {}) => {
    if (state === undefined) {
      return []
    }

    if (Array.isArray(state)) {
      return state.filter(options)
    }

    return this.getAll(state).filter(options)
  }

  find = (state, fn) => {
    if (state === undefined) {
      return null
    }

    if (Array.isArray(state)) {
      return state.find(fn)
    }

    const data = this.getAll(state)
    if (Array.isArray(data)) {
      return data.find(fn)
    }
    return null
  }

  sortByFn = (state, fn) => {
    if (state === undefined) {
      return []
    }

    if (Array.isArray(state)) {
      return state.sort(fn)
    }

    const data = this.getAll(state)
    if (Array.isArray(data)) {
      return data.sort(fn)
    }
    return []
  }

  sortByDate = (state, dateField) => {
    const sortFn = (a, b) => new Date(b[dateField]) - new Date(a[dateField])
    return this.sortByFn(state, sortFn)
  }
}
