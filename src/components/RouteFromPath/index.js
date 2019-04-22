import React from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'

const RouteFromPath = route =>
  route.private ? (
    <PrivateRoute {...route} authenticated={route.authenticated} />
  ) : (
    <Route {...route} />
  )

export default RouteFromPath
