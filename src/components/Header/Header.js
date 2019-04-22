import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, matchPath, withRouter } from 'react-router-dom'
import { sessionService } from 'redux-react-session'

import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'
import Flex from 'components/Flex'
import Logo from './Logo'
import Avatar from './Avatar'

const isActive = path =>
  !!matchPath(window.location.pathname, {
    path,
    exact: true,
    strict: false
  })

const Header = ({ user, accessToken, fetchUser, match, showLinks = true }) => {
  useEffect(() => {
    !user && fetchUser(accessToken)
  }, [])

  const logout = () => {
    sessionService.deleteSession()
  }

  return (
    <Fragment>
      <Logo className="mc-mt-3" />
      <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
      <Flex
        justifyContent="space-between"
        className="container mc-mt-5 mc-px-5 mc-py-4 mc-invert mc-background--color-light"
      >
        <div className="mc-py-1">
          {showLinks && (
            <div>
              <NavLink to={routes.dashboard(match.params)}>
                <Anchor
                  isActive={isActive(routes.dashboard())}
                  className="d-inline-block mc-pr-3"
                >
                  Dashboard
                </Anchor>
              </NavLink>
              <NavLink to={routes.test(match.params)}>
                <Anchor
                  isActive={isActive(routes.test())}
                  className="d-inline-block mc-pr-3"
                >
                  Tests
                </Anchor>
              </NavLink>
              <NavLink to={routes.createTestSuite(match.params)}>
                <Anchor
                  isActive={isActive(routes.createTestSuite())}
                  className="d-inline-block mc-pr-3"
                >
                  Create Suite
                </Anchor>
              </NavLink>
            </div>
          )}
        </div>
        {user && (
          <Flex>
            <Anchor onClick={logout} className="d-inline-block mc-pr-3">
              LOGOUT
            </Anchor>
            <Avatar src={user.avatarUrl} alt="github avatar" />
          </Flex>
        )}
      </Flex>
    </Fragment>
  )
}

Header.propTypes = {
  accessToken: PropTypes.string.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  match: PropTypes.object,
  showLinks: PropTypes.bool
}

export default withRouter(Header)
