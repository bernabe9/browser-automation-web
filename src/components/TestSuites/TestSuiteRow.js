import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import StatusBadge from 'components/StatusBadge'
import TestSuiteRowWrapper from './TestSuiteRowWrapper'

const TestSuiteRow = ({ id, name, status, tests, lastRunAt }) => {
  const testsCount = tests.length

  return (
    <TestSuiteRowWrapper className="mc-p-3 mc-my-3">
      <div>
        <Link className="mc-text-h6 mc-mr-2" to={`/test-suites/${id}`}>
          {name}
        </Link>
        <StatusBadge status={status} small />
        <p>{`${testsCount} tests`}</p>
        {lastRunAt && (
          <p>Last run at: {format(new Date(lastRunAt), 'MM/DD/YYYY HH:mm')}</p>
        )}
      </div>
    </TestSuiteRowWrapper>
  )
}

TestSuiteRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  tests: PropTypes.array.isRequired,
  lastRunAt: PropTypes.number
}

export default TestSuiteRow
