import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, matchPath } from 'react-router-dom'
import { sessionService } from 'redux-react-session'

import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'
import Flex from 'components/Flex'
import ColWrapper from './ColWrapper'
import Avatar from './Avatar'
import Logo from './Logo'
import Wordmark from './Wordmark'

const isActive = path =>
  !!matchPath(window.location.pathname, {
    path,
    exact: true,
    strict: false
  })

const Header = ({ user, fetchUser, environment, showLinks = true }) => {
  useEffect(() => {
    !user && fetchUser()
  }, [])

  const logout = () => {
    sessionService.deleteSession()
  }

  return (
    <Fragment>
      <Logo
        src={require('assets/logo_invert.png')}
        alt="browser automation logo"
      />
      <Wordmark className="mc-text-large mc-mb-4 mc-mt-2 mc-text--center">
        Browser Automation
      </Wordmark>
      <Flex
        justifyContent="space-between"
        className="container mc-mt-5 mc-px-5 mc-py-4 mc-invert mc-background--color-light"
      >
        <ColWrapper>
          {showLinks && (
            <div>
              <NavLink to={routes.dashboard(environment)}>
                <Anchor
                  isActive={isActive(routes.dashboard())}
                  className="d-inline-block mc-pr-3"
                >
                  Dashboard
                </Anchor>
              </NavLink>
              <NavLink to={routes.test(environment)}>
                <Anchor
                  isActive={isActive(routes.test())}
                  className="d-inline-block mc-pr-3"
                >
                  Tests
                </Anchor>
              </NavLink>
              <NavLink to={routes.createTestSuite(environment)}>
                <Anchor
                  isActive={isActive(routes.createTestSuite())}
                  className="d-inline-block mc-pr-3"
                >
                  Create Suite
                </Anchor>
              </NavLink>
            </div>
          )}
        </ColWrapper>
        {user && (
          <ColWrapper>
            <NavLink to={routes.index}>
              <Anchor
                isActive={isActive(routes.index)}
                className="d-inline-block mc-pr-3"
              >
                Repositories
              </Anchor>
            </NavLink>
            <Anchor onClick={logout} className="d-inline-block mc-pr-3">
              LOGOUT
            </Anchor>
            <Avatar src={user.avatarUrl} alt="github avatar" />
          </ColWrapper>
        )}
      </Flex>
    </Fragment>
  )
}

Header.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  environment: PropTypes.object,
  showLinks: PropTypes.bool
}

export default Header
