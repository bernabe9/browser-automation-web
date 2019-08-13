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
  const [showExpanded, setShowExpanded] = useState(false)
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

  const onExpand = () => setShowExpanded(!showExpanded)
  const onToggle = () => setShowData(!showData)

  const onRerun = (replaceScreenshots = false, index) => {
    const path = applyQueryParams(`/rerun`, {
      id,
      replaceScreenshots,
      index
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
      <Flex alignItems="flex-start" justifyContent="space-between">
        <div>
          <div className="mc-mb-3">
            <div className="mc-mb-4">
              {startedAt && <p>{`${distance} ago`}</p>}
              <p>{`test: ${test}`}</p>
              {startedAt && (
                <Timer startDate={startedAt} endDate={endedAt}>
                  {(minutes, seconds) => (
                    <p>
                      duration: {minutes}:{seconds}
                    </p>
                  )}
                </Timer>
              )}
              <Flex>
                <span>status: </span>
                <span className="mc-ml-2">
                  <StatusBadge status={status} small />
                </span>
              </Flex>
            </div>
          </div>

          <Anchor className="mc-my-4" onClick={onExpand}>
            {!showExpanded ? 'More' : 'Less'}
          </Anchor>
        </div>

        <div>
          <Flex>
            {rerunEnabled && (
              <Button onClick={onRerun} loading={loadingRerun}>
                Rerun
              </Button>
            )}
            {!!testResults && (
              <Button kind="secondary" className="mc-ml-2" onClick={onToggle}>
                Toggle Results
              </Button>
            )}
          </Flex>
        </div>
      </Flex>
      {showExpanded && (
        <div className="mc-mt-2">
          <p>{`id: ${id}`}</p>
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
        </div>
      )}
      {!!testResults && (
        <Fragment>
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
