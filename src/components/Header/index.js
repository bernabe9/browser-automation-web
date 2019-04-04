import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'
import Logo from './Logo'

const Header = () => (
  <Fragment>
    <Logo className="mc-mt-3" />
    <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <Link to={routes.index}>
        <Anchor className="d-inline-block mc-pr-2">Dashboard</Anchor>
      </Link>
      <Link to={routes.test}>
        <Anchor className="d-inline-block mc-pr-2">Tests</Anchor>
      </Link>
      <Link to={routes.createTestSuite}>
        <Anchor className="d-inline-block mc-pr-2">Create Suite</Anchor>
      </Link>
    </div>
  </Fragment>
)

export default Header
