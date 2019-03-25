import queryString from 'query-string'
import isEmpty from 'lodash/isEmpty'

export const parseInputErrors = error => {
  if (!error) {
    return
  }
  if (Array.isArray(error)) {
    return error[0]
  }
  return error
}

export const applyQueryParams = (url, params = {}) => {
  if (isEmpty(params)) {
    return url
  }
  const queryParams = queryString.stringify(params)
  return `${url}?${queryParams}`
}

export const testStatus = testExecutions => {
  const sortedExecutions = [...testExecutions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  if (!sortedExecutions.length) {
    return
  }
  return sortedExecutions[0].status
}
