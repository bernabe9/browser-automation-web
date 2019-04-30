import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from 'state/modules'
import api from 'state/middleware/api'
import websockets from 'state/middleware/websockets'

export default function configureStore(initialState) {
  const middewares = [thunkMiddleware, api, websockets]

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middewares))
  )
}
