import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

import TestSuiteRowWrapper from './TestSuiteRowWrapper'

const TestSuiteRow = ({ id, name, tests, lastRunAt }) => {
  const testsCount = Object.keys(tests).length
  const getCount = status =>
    Object.keys(tests).filter(key => tests[key].status === status).length
  const passingCount = getCount('success')
  const failingCount = getCount('error')
  const runningCount = getCount('running')
  const readyCount = getCount('ready')

  return (
    <TestSuiteRowWrapper className="mc-p-3 mc-my-3">
      <div>
        <Link className="mc-text-h6" to={`/test-suites/${id}`}>
          {name}
        </Link>
        <p>{`${testsCount} tests`}</p>
        {lastRunAt && <p>{format(new Date(lastRunAt), 'MM/DD/YYYY HH:mm')}</p>}
      </div>
      <div>
        <p className="mc-text--right">{`${passingCount} tests passing`}</p>
        <p className="mc-text--right">{`${failingCount} tests failing`}</p>
        <p className="mc-text--right">{`${runningCount} tests running`}</p>
        <p className="mc-text--right">{`${readyCount} tests ready`}</p>
      </div>
    </TestSuiteRowWrapper>
  )
}

TestSuiteRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tests: PropTypes.object.isRequired,
  lastRunAt: PropTypes.number
}

export default TestSuiteRow
