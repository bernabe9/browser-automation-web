import React, { useState } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Separator, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'
import StatusBadge from 'components/StatusBadge'
import ExecutionRow from 'components/Executions/ExecutionRow'

const SuiteExecution = ({
  id,
  status,
  suiteId,
  url,
  createdAt,
  executions,
  concurrencyCount,
  webhook,
  repositoryName,
  repositoryOwner,
  repositoryRef,
  onRerunSuccess
}) => {
  const [loadingRerun, setLoadingRerun] = useState(false)

  const onRerunAll = () => {
    const path = applyQueryParams(
      `${process.env.API_URL}/rerun-suite-execution`,
      { id }
    )
    setLoadingRerun(true)
    fetch(path)
      .then(async res => {
        if (res.ok) {
          const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
          await timeout(1000)
          setLoadingRerun(false)
          onRerunSuccess()
        }
      })
      .catch(() => setLoadingRerun(false))
  }

  return (
    <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="mc-mb-4">
        <span className="d-inline mc-text-h5 mc-mr-2">{id}</span>
        <StatusBadge status={status} />
      </div>
      <p>suite id: {suiteId}</p>
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
      <p>created at: {format(new Date(createdAt), 'MM/DD/YYYY HH:mm')}</p>
      {repositoryOwner && repositoryName && (
        <p>repository: {`${repositoryOwner}/${repositoryName}`}</p>
      )}
      {repositoryRef && <p>ref: {repositoryRef}</p>}
      {concurrencyCount && <p>concurrency: {concurrencyCount}</p>}
      {webhook && <p>webhook: {webhook}</p>}
      {status !== 'running' && (
        <Button className="mc-my-3" onClick={onRerunAll} loading={loadingRerun}>
          RERUN ALL
        </Button>
      )}
      <Separator />
      <div className="mc-my-4">
        <h5 className="mc-text-h5 mc-my-5">Test Executions</h5>
        {executions.map(execution => (
          <ExecutionRow
            key={execution.id}
            {...execution}
            rerunEnabled
            onRerunSuccess={onRerunSuccess}
          />
        ))}
      </div>
    </div>
  )
}

SuiteExecution.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  suiteId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  executions: PropTypes.array.isRequired,
  onRerunSuccess: PropTypes.func.isRequired,
  concurrencyCount: PropTypes.number,
  webhook: PropTypes.string,
  repositoryName: PropTypes.string,
  repositoryOwner: PropTypes.string,
  repositoryRef: PropTypes.string
}

export default SuiteExecution
