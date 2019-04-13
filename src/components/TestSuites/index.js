import React from 'react'
import PropTypes from 'prop-types'

import TestSuiteRow from './TestSuiteRow'

const TestSuites = ({ testSuites }) => (
  <div>
    {testSuites &&
      testSuites.map(suite => <TestSuiteRow key={suite.id} {...suite} />)}
  </div>
)

TestSuites.propTypes = {
  testSuites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tests: PropTypes.array.isRequired
    }).isRequired
  )
}

export default TestSuites
