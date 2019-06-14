import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator, Button } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

import { applyQueryParams } from 'utils/helpers'
import api from 'api'
import statuses from 'constants/status'
import StatusBadge from 'components/StatusBadge'
import TestResults from 'components/TestResults'
import Timer from 'components/Timer'
import Anchor from 'components/Anchor'
import Flex from 'components/Flex'
import Avatar from 'components/Header/Avatar'
import ResultWrapper from './ResultsWrapper'

const ExecutionRow = ({
  id,
  test,
  url,
  status,
  errorMessage,
  startedAt,
  endedAt,
  testResults,
  repositoryName,
  repositoryOwner,
  repositoryRef,
  rerunEnabled = false,
  onRerunSuccess,
  user,
  production
}) => {
  const [showData, setShowData] = useState(false)
  const [loadingRerun, setLoadingRerun] = useState(false)

  const getDistance = startedAt =>
    distanceInWords(new Date(startedAt), {
      includeSeconds: true
    })

  const [distance, setDistance] = useState()

  useEffect(() => {
    if (!distance && startedAt) {
      setDistance(getDistance(startedAt))
    }
    if (startedAt) {
      const interval = setInterval(
        () => setDistance(getDistance(startedAt)),
        10000
      )
      return () => clearInterval(interval)
    }
  })

  const onToggle = () => setShowData(!showData)

  const onRerun = (replaceScreenshots = false) => {
    const path = applyQueryParams(`/rerun`, {
      id,
      replaceScreenshots
    })
    setLoadingRerun(true)
    api(path)
      .then(async () => {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        await timeout(1000)
        setLoadingRerun(false)
        onRerunSuccess()
      })
      .catch(() => setLoadingRerun(false))
  }

  return (
    <Fragment>
      <div className="mc-mb-3">
        <div className="mc-mb-4">
          {startedAt && <p>{`${distance} ago`}</p>}
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
          <a
            className="mc-text--link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </a>
        </p>
        {repositoryName && repositoryOwner && (
          <p>repository: {`${repositoryOwner}/${repositoryName}`}</p>
        )}
        {repositoryRef && <p>ref: {repositoryRef}</p>}
        {user && (
          <Flex>
            <span>user: </span>
            {user && (
              <Fragment>
                <Avatar
                  className="mc-mx-2"
                  src={`https://github.com/${user}.png`}
                  width="26px"
                  height="26px"
                />
                <a
                  className="mc-text--link"
                  href={`https://github.com/${user}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user}
                </a>
              </Fragment>
            )}
          </Flex>
        )}
        {production && <p className="mc-mt-4">Only for production</p>}
        {rerunEnabled && (
          <Button className="mc-mt-4" onClick={onRerun} loading={loadingRerun}>
            RERUN
          </Button>
        )}
      </div>
      {!!testResults && (
        <Fragment>
          <Anchor onClick={onToggle}>Toggle results</Anchor>
          {showData && (
            <ResultWrapper className="mc-p-4 mc-my-3">
              <TestResults
                testResults={JSON.parse(testResults)}
                onRerun={status === statuses.error ? onRerun : undefined}
              />
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
  user: PropTypes.string,
  startedAt: PropTypes.number,
  testResults: PropTypes.string,
  endedAt: PropTypes.number,
  errorMessage: PropTypes.string,
  rerunEnabled: PropTypes.bool,
  onRerunSuccess: PropTypes.func,
  repositoryName: PropTypes.string,
  repositoryOwner: PropTypes.string,
  repositoryRef: PropTypes.string,
  production: PropTypes.bool
}

export default ExecutionRow
