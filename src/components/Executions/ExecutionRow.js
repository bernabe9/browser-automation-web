import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

import StatusBadge from 'components/StatusBadge'
import TestResults from 'components/TestResults'
import Timer from 'components/Timer'
import ResultWrapper from './ResultsWrapper'

const ExecutionRow = ({
  id,
  test,
  url,
  status,
  errorMessage,
  startedAt,
  endedAt,
  testResults
}) => {
  const [showData, setShowData] = useState(false)

  const getDistance = () =>
    distanceInWords(new Date(startedAt), {
      includeSeconds: true
    })

  const [distance, setDistance] = useState(getDistance())

  useEffect(() => {
    const interval = setInterval(() => setDistance(getDistance()), 60000)
    return () => clearInterval(interval)
  })

  const onToggle = () => setShowData(!showData)

  return (
    <Fragment>
      <div className="mc-mb-3">
        <div className="mc-mb-4">
          {distance && <p>{`${distance} ago`}</p>}
          <div>
            <span>status: </span>
            <StatusBadge status={status} small />
          </div>
          {startedAt && (
            <Timer startDate={startedAt} endDate={endedAt}>
              {(minutes, seconds) => (
                <p>
                  duration: {minutes}:{seconds}
                </p>
              )}
            </Timer>
          )}
        </div>
        <p>{`id: ${id}`}</p>
        <p>{`test: ${test}`}</p>
        <p>
          URL:{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </p>
      </div>
      {!!testResults && (
        <Fragment>
          <a
            className="mc-text-h8 mc-text--uppercase mc-text--muted"
            onClick={onToggle}
          >
            Toggle results
          </a>
          {showData && (
            <ResultWrapper className="mc-p-4 mc-my-3">
              <TestResults testResults={JSON.parse(testResults)} />
              {errorMessage && (
                <Fragment>
                  <p>Error:</p>
                  <p style={{ whiteSpace: 'pre' }}>{unescape(errorMessage)}</p>
                </Fragment>
              )}
            </ResultWrapper>
          )}
        </Fragment>
      )}
      <Separator />
    </Fragment>
  )
}

ExecutionRow.propTypes = {
  id: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  startedAt: PropTypes.number.isRequired,
  testResults: PropTypes.string,
  endedAt: PropTypes.number,
  errorMessage: PropTypes.string
}

export default ExecutionRow
