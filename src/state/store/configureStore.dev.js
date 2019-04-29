// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /modules.

import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import _ from 'lodash'

import rootReducer from 'state/modules'
import api from 'state/middleware/api'
import websockets from 'state/middleware/websockets'

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, { type }) =>
      !_.startsWith(type, '@@router') && !_.startsWith(type, '@@redux-form')
  })

  const middewares = [thunkMiddleware, api, websockets, logger]

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('state/modules', () => {
      const nextReducer = require('state/modules').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
