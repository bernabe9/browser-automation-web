import humps from 'humps'

const api = async (path, opt = {}) => {
  const { remote, ...options } = opt
  const url = remote ? process.env.API_URL_REMOTE : process.env.API_URL
  const response = await fetch(`${url}${path}`, {
    ...options,
    ...(options.body && { body: JSON.stringify(options.body) })
  })
  const json = await response.json()
  return humps.camelizeKeys(json)
}

const formatBodyData = data => JSON.stringify(humps.decamelizeKeys(data))

export const formatRequestData = (method, data) => {
  const requestData = { method }
  if (data) {
    requestData.body = formatBodyData(data)
  }
  return requestData
}

export default api
