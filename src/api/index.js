import humps from 'humps'

const api = async (path, opt = {}) => {
  const response = await fetch(`${process.env.API_URL}${path}`, opt)
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
