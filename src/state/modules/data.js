import omit from 'lodash/omit'
import { API_DATA_REQUEST, API_DATA_SUCCESS } from 'state/middleware/api'

const initialState = {
  meta: {}
}

const mergeData = (state, response) => {
  if (!response) {
    return { ...state }
  }
  const newData = {}
  Object.keys(state).forEach(key => {
    newData[key] = { ...state[key], ...response[key] }
  })
  return {
    ...response,
    ...newData
  }
}

const API_DATA_SUCCESS_REGEXP = new RegExp(API_DATA_SUCCESS)
const API_DATA_REQUEST_REGEXP = new RegExp(API_DATA_REQUEST)
const API_DATA_REMOVED = 'API_DATA_REMOVED'

// ACTIONS
export const removeObject = object => ({
  type: API_DATA_REMOVED,
  object
})

// REDUCER
export default (state = initialState, action) => {
  const { response, endpoint } = action

  if (API_DATA_SUCCESS_REGEXP.test(action.type)) {
    return {
      ...mergeData(state, response),
      meta: {
        ...state.meta,
        [endpoint]: { loading: false, success: true }
      }
    }
  }

  if (API_DATA_REQUEST_REGEXP.test(action.type)) {
    return {
      ...state,
      meta: {
        ...state.meta,
        [endpoint]: {
          ...state.meta[endpoint],
          loading: true
        }
      }
    }
  }

  if (action.type === API_DATA_REMOVED) {
    const { objectType, objectId } = action.object
    return omit(state, [`${objectType}.${objectId}`])
  }

  return state
}
