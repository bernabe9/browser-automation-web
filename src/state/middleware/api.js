import fetch from 'api'
// import normalize from 'json-api-normalizer'

export const API_DATA_REQUEST = '@@API_DATA_REQUEST'
export const API_DATA_SUCCESS = '@@API_DATA_SUCCESS'
export const API_DATA_FAILURE = '@@API_DATA_FAILURE'

const callApi = async (endpoint, options = {}, normalizer) => {
  const response = await fetch(endpoint, options)
  const normalizedData = normalizer(response)
  return normalizedData.entities
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { options, normalizer } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  const actionWith = data => {
    const finalAction = { ...action, ...data }
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith({ type: `${API_DATA_REQUEST}_${endpoint}`, endpoint }))

  return callApi(endpoint, options, normalizer).then(
    response =>
      next(
        actionWith({
          response,
          type: `${API_DATA_SUCCESS}_${endpoint}`,
          endpoint
        })
      ),
    error =>
      next(
        actionWith({
          type: `${API_DATA_FAILURE}_${endpoint}`,
          error: error.message || 'Something bad happened'
        })
      )
  )
}
