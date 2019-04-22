import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'

import RouteFromPath from 'components/RouteFromPath'
import routes from '../routes'
import theme from '../constants/theme'

const App = ({ authenticated, checked }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet>
        <title>Browser Automation | MasterClass</title>
      </Helmet>
      <Router>
        {checked && (
          <Switch>
            {routes.map((route, index) => (
              <RouteFromPath
                key={`route${index}`}
                {...route}
                authenticated={authenticated}
              />
            ))}
          </Switch>
        )}
      </Router>
    </Fragment>
  </ThemeProvider>
)

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired
}

const mapState = state => ({
  checked: state.session.checked,
  authenticated: state.session.authenticated
})

export default connect(mapState)(App)
