import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import StatusBadge from 'components/StatusBadge'
import routes from 'constants/routesPaths'
import TestSuiteRowWrapper from './TestSuiteRowWrapper'

const TestSuiteRow = ({ id, name, tests, lastSuiteExecution, match }) => {
  const testsCount = tests.length

  return (
    <TestSuiteRowWrapper className="mc-p-3 mc-my-3">
      <div>
        <Link
          className="mc-text-h6 mc-mr-2"
          to={routes.suite({ id, ...match.params })}
        >
          {name}
        </Link>
        {lastSuiteExecution && (
          <StatusBadge status={lastSuiteExecution.status} small />
        )}
        <p>{`${testsCount} tests`}</p>
        {lastSuiteExecution && (
          <p>
            Last run at:{' '}
            {format(new Date(lastSuiteExecution.createdAt), 'MM/DD/YYYY HH:mm')}
          </p>
        )}
      </div>
    </TestSuiteRowWrapper>
  )
}

TestSuiteRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tests: PropTypes.array.isRequired,
  lastSuiteExecution: PropTypes.object
}

export default TestSuiteRow
