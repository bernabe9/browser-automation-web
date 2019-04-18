import humps from 'humps'
import { getUserData, deleteUserData } from 'utils/authentication'
import routes from 'constants/routesPaths'

const handleError = status => {
  const page = window.location.pathname
  if (status === 401) {
    // token is expired or not valid
    // remove user data from localstorage
    deleteUserData()
    // redirect to login (if isn't there already)
    if (page !== routes.login) {
      window.location = routes.login
    }
  } else if (status === 409 && page === routes.register) {
    // user already exist (register)
    throw new Error('user already exists')
  }
}

const api = async (path, opt = {}) => {
  const user = getUserData()
  const response = await fetch(`${process.env.API_URL}${path}`, {
    ...opt,
    ...(user && { headers: { Authorization: `Bearer ${user.token}` } }),
    ...(opt.body && { body: JSON.stringify(opt.body) })
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
