import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer, setConfig } from 'react-hot-loader'
import { sessionService } from 'redux-react-session'

import configureStore from 'state/store/configureStore'
import App from 'components/App'
import 'styles/styles.scss'

require('./favicon.ico') // Tell webpack to load favicon.ico

// Load service worker
if (process.env.ENABLE_PWA) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/main-sw.js')
  })
}

const store = configureStore()

const renderApp = Component => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  )
}

sessionService.initSessionService(store).then(() => {
  sessionService.saveSession({
    accessToken: '9188448dbd40b002aa89cb0e0037684b93cb99cb',
    scope: 'repo,user:email',
    tokenType: 'bearer'
  })
  sessionService.saveUser({
    accessToken: '9188448dbd40b002aa89cb0e0037684b93cb99cb',
    scope: 'repo,user:email',
    tokenType: 'bearer'
  })
  renderApp(App)
})

setConfig({ logLevel: 'no-errors-please' })

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App)
  })
}
