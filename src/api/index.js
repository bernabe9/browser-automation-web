import humps from 'humps'
import { sessionService } from 'redux-react-session'

import routes from 'constants/routesPaths'

const getSessionHeaders = async () => {
  try {
    const session = await sessionService.loadSession()
    return { Authorization: `Bearer ${session.accessToken}` }
  } catch (err) {
    return {}
  }
}

const handleError = status => {
  if (status === 401) {
    // token is expired or not valid
    sessionService.deleteSession()
    // redirect to login (if isn't there already)
    window.location = routes.login
  }
}

const urls = {
  default: process.env.API_URL,
  remote: process.env.API_URL_REMOTE,
  github: 'https://api.github.com'
}

const api = async (path, opt = {}) => {
  const { remote, ...options } = opt
  const url = urls[opt.url || 'default']
  const sessionHeaders = await getSessionHeaders()
  const headers = { ...opt.headers, ...sessionHeaders }
  const response = await fetch(`${url}${path}`, {
    ...options,
    ...(options.body && { body: JSON.stringify(options.body) }),
    headers
  })
  if (!response.ok) {
    handleError(response.status)
  }
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
