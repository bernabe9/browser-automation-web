import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer, setConfig } from 'react-hot-loader'
import { sessionService } from 'redux-react-session'

import configureStore from 'state/store/configureStore'
import App from 'components/App'
import 'styles/styles.scss'

// Tell webpack to load favicon
require('assets/favicon/android-chrome-192x192.png')
require('assets/favicon/android-chrome-512x512.png')
require('assets/favicon/apple-touch-icon.png')
require('assets/favicon/favicon-16x16.png')
require('assets/favicon/favicon-32x32.png')
require('assets/favicon/favicon.ico')

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
    accessToken: '82f32065e7ea455de13a29436a51a1819c5d58f9'
  })
  sessionService.saveUser({
    accessToken: '82f32065e7ea455de13a29436a51a1819c5d58f9'
  })
  renderApp(App)
})

setConfig({ logLevel: 'no-errors-please' })

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App)
  })
}
