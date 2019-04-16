import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import theme from '../../constants/theme'
import PrivateRoute from '../../components/PrivateRoute'
import { publicRoutes, protectedRoutes } from '../../routes'
import { getUserData } from '../../utils/authentication'

const App = ({ authenticate, user }) => {
  if (!user.token) {
    // if no token present on redux
    // try to get it from the localstorage
    const data = getUserData()
    if (data) {
      // if a token is present on localstorage
      // store it on redux
      authenticate(data)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <title>Browser Automation | MasterClass</title>
        </Helmet>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={`route${index}`} {...route} />
            ))}
            {protectedRoutes.map((route, index) => (
              <PrivateRoute
                key={`route${index}`}
                {...route}
                isAuthenticated={!!user.token}
              />
            ))}
          </Switch>
        </Router>
      </Fragment>
    </ThemeProvider>
  )
}

export default App
