import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Environment from 'components/Environment'
import MainPanel from './MainPanel'

const TestPage = ({ history, match }) => (
  <div>
    <Header />
    <Environment />
    <Fragment>
      <MainPanel history={history} match={match} />
    </Fragment>
  </div>
)

TestPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default TestPage
