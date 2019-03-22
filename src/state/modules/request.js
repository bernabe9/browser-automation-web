import { formatRequestData } from 'api'
import { CALL_API } from 'state/middleware/api'

// ACTIONS
export default (endpoint, { method = 'GET', body, normalizer }) => {
  const options = formatRequestData(method, body)
  return {
    [CALL_API]: {
      endpoint,
      options,
      normalizer
    }
  }
}
