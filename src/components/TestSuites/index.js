import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import TestSuiteRow from './TestSuiteRow'

const TestSuites = ({ testSuites, match }) => (
  <div>
    {testSuites &&
      testSuites.map(suite => (
        <TestSuiteRow key={suite.id} {...suite} match={match} />
      ))}
  </div>
)

TestSuites.propTypes = {
  testSuites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tests: PropTypes.array.isRequired
    }).isRequired
  ),
  match: PropTypes.object.isRequired
}

export default withRouter(TestSuites)
