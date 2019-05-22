import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import StatusBadge from 'components/StatusBadge'
import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'
import TestSuiteRowWrapper from './TestSuiteRowWrapper'

const TestSuiteRow = ({
  id,
  name,
  url,
  description,
  production,
  tests,
  lastSuiteExecution,
  match
}) => {
  const { repositoryName, repositoryOwner, repositoryRef } = match.params
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
        {production && <p>Only for production</p>}
        <Link
          to={{
            pathname: routes.editTestSuite({
              repositoryName,
              repositoryOwner,
              repositoryRef,
              id
            }),
            state: {
              name,
              url,
              description,
              production,
              tests
            }
          }}
        >
          <Anchor className="mc-mt-2">EDIT</Anchor>
        </Link>
      </div>
    </TestSuiteRowWrapper>
  )
}

TestSuiteRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  production: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tests: PropTypes.array.isRequired,
  lastSuiteExecution: PropTypes.object,
  match: PropTypes.object
}

export default TestSuiteRow
