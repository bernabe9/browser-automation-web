import React, { Fragment } from 'react'
import { NavLink, matchPath } from 'react-router-dom'

import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'
import Logo from './Logo'

const isActive = path =>
  matchPath(window.location.pathname, {
    path,
    exact: true,
    strict: false
  })

const Header = () => (
  <Fragment>
    <Logo className="mc-mt-3" />
    <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <NavLink to={routes.index}>
        <Anchor
          isActive={isActive(routes.index)}
          className="d-inline-block mc-pr-3"
        >
          Dashboard
        </Anchor>
      </NavLink>
      <NavLink to={routes.test}>
        <Anchor
          isActive={isActive(routes.test)}
          className="d-inline-block mc-pr-3"
        >
          Tests
        </Anchor>
      </NavLink>
      <NavLink to={routes.createTestSuite}>
        <Anchor
          isActive={isActive(routes.createTestSuite)}
          className="d-inline-block mc-pr-3"
        >
          Create Suite
        </Anchor>
      </NavLink>
    </div>
  </Fragment>
)

export default Header
