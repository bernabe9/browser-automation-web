import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { getUserData } from 'utils/authentication'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!getUserData()
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute
