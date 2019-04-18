import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import theme from '../constants/theme'
import PrivateRoute from './PrivateRoute'
import { publicRoutes, privateRoutes } from '../routes'

const App = () => (
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
          {privateRoutes.map((route, index) => (
            <PrivateRoute key={`route${index}`} {...route} />
          ))}
        </Switch>
      </Router>
    </Fragment>
  </ThemeProvider>
)

export default App
