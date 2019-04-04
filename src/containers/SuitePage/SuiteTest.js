import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Button, Separator } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

const SuiteTest = ({
  test: { path, status, lastRunAt },
  handleRunSingleTest,
  loading
}) => {
  const getDistance = () => {
    if (!lastRunAt) {
      return 'Not ran yet'
    }
    return distanceInWords(new Date(lastRunAt), {
      includeSeconds: true
    })
  }

  const [distance, setDistance] = useState(getDistance())

  useEffect(() => {
    const interval = setInterval(() => setDistance(getDistance()), 60000)
    return () => clearInterval(interval)
  })

  return (
    <Fragment>
      <div className="mc-pb-4">
        <p style={{ color: 'black' }}>
          Test:
          <Link className="mc-text-h6" to={`/tests?path=${path}`}>
            {' '}
            {path}
          </Link>
        </p>
        <p>Status: {status}</p>
        <p>Last run at: {distance}</p>
      </div>
      <Button onClick={handleRunSingleTest(path)} loading={loading}>
        Run Test
      </Button>
      <Separator />
    </Fragment>
  )
}

SuiteTest.propTypes = {
  test: PropTypes.shape({
    path: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastRunAt: PropTypes.number
  }),
  handleRunSingleTest: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SuiteTest
