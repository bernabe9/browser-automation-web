import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from 'state/modules'
import api from 'state/middleware/api'

export default function configureStore(initialState) {
  const middewares = [thunkMiddleware, api]

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middewares))
  )
}
