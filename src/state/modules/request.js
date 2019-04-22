import { formatRequestData } from 'api'
import { CALL_API } from 'state/middleware/api'

// ACTIONS
export default (endpoint, { method = 'GET', body, normalizer, ...opt }) => {
  const options = { ...formatRequestData(method, body), ...opt }
  return {
    [CALL_API]: {
      endpoint,
      options,
      normalizer
    }
  }
}
