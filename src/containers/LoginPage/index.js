import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'mc-components'
import queryString from 'query-string'
import { sessionService } from 'redux-react-session'

import api from 'api'
import { applyQueryParams } from 'utils/helpers'
import routes from 'constants/routesPaths'
import GitHubIcon from './GitHubIcon'

const LoginPage = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const { code } = queryString.parse(history.location.search)
    if (code) {
      setLoading(true)
      const path = applyQueryParams('/authenticate', { code })
      api(path)
        .then(async session => {
          await sessionService.saveSession(session)
          await sessionService.saveUser(session)
          setLoading(false)
          history.push(routes.index)
        })
        .catch(() => {
          setLoading(false)
          setError('Ups! Something went wrong...')
        })
    }
  }, [])

  return (
    <div>
      <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h3 className="mc-text-h3 mc-mb-4">Welcome to Browser Automation</h3>
        <h5 className="mc-text-h5 mc-my-3">Login with GitHub to continue</h5>
        {error && <p>{error}</p>}
        <a href="https://github.com/login/oauth/authorize?scope=repo%20user%20read:org&client_id=3a749ceca76d3116e27e">
          <Button kind="secondary" loading={loading}>
            <GitHubIcon />
            LOGIN WITH GITHUB
          </Button>
        </a>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default LoginPage
