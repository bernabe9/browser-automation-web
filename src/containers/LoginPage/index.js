import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'mc-components'
import queryString from 'query-string'
import { sessionService } from 'redux-react-session'

import api from 'api'
import { applyQueryParams } from 'utils/helpers'
import routes from 'constants/routesPaths'
import Flex from 'components/Flex'
import Logo from 'components/Header/Logo'
import Wordmark from 'components/Header/Wordmark'
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
    <div className="container">
      <div className="col-6 offset-3 mc-my-8 mc-p-5 mc-invert mc-background--color-light">
        <div>
          <Logo
            src={require('assets/logo.png')}
            alt="browser automation logo"
          />
          <Wordmark className="mc-text-large mc-mb-4 mc-mt-2 mc-text--center">
            Browser Automation
          </Wordmark>
        </div>
        <Flex flexDirection="column" className="mc-my-6">
          <h5 className="mc-text-large">Welcome</h5>
          <p className="mc-mb-3">Login with GitHub to continue</p>
          {error && <p>{error}</p>}
          <a href="https://github.com/login/oauth/authorize?scope=repo%20read:user%20read:org&client_id=3a749ceca76d3116e27e">
            <Button kind="secondary" loading={loading}>
              <GitHubIcon />
              LOGIN WITH GITHUB
            </Button>
          </a>
        </Flex>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default LoginPage
