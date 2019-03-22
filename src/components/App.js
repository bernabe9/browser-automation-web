import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import routes from '../routes'
import theme from '../constants/theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet>
        <title>Browser Automation | MasterClass</title>
      </Helmet>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route key={`route${index}`} {...route} />
          ))}
        </Switch>
      </Router>
    </Fragment>
  </ThemeProvider>
)

export default App
