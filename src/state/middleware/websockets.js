import { sessionService } from 'redux-react-session'
import humps from 'humps'

import { applyQueryParams } from 'utils/helpers'
import { API_DATA_SUCCESS } from 'state/middleware/api'
import { normalizeDataExecution } from 'state/schemas/execution'

// types
const WS_CONNECT = 'WS_CONNECT'
const WS_OPENED = 'WS_OPENED'
const GET_SESSION_SUCCESS = '@@redux-react-session/GET_SESSION_SUCCESS'

const websocketsMiddleware = (() => {
  let ws = null

  return store => next => action => {
    switch (action.type) {
      case GET_SESSION_SUCCESS: {
        const { authenticated } = store.getState().session
        !authenticated && store.dispatch({ type: 'WS_CONNECT' })
        break
      }
      case WS_CONNECT: {
        sessionService.loadSession().then(session => {
          const { accessToken } = session
          const props = { Auth: accessToken }
          const wsURL = applyQueryParams(process.env.WS_URL, props)
          ws = new WebSocket(wsURL)
          ws.onopen = () => {
            store.dispatch({ type: WS_OPENED })
          }
        })
        break
      }
      case WS_OPENED: {
        ws.onmessage = event => {
          const execution = humps.camelizeKeys(JSON.parse(event.data))
          const normalizedData = normalizeDataExecution(execution)
          store.dispatch({
            response: normalizedData.entities,
            type: `${API_DATA_SUCCESS}_${process.env.WS_URL}`,
            endpoint: process.env.WS_URL
          })
        }
        break
      }
      default:
        break
    }
    next(action)
  }
})()

export default websocketsMiddleware
