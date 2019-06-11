import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Separator, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'
import api from 'api'
import StatusBadge from 'components/StatusBadge'
import ExecutionRow from 'components/Executions/ExecutionRow'

const statusesConst = {
  running: 'running',
  success: 'success',
  pending: 'pending',
  error: 'error'
}

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
  fetchSuiteExecution
}) => {
  const [loadingRerun, setLoadingRerun] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [suiteExecutionStatus, setSuiteExecutionStatus] = useState(status)

  const getGlobalStatus = statuses => {
    const statusCondition = {
      [statusesConst.running]: statuses.some(
        status => status === statusesConst.running
      ),
      [statusesConst.error]:
        statuses.some(status => status === statusesConst.error) &&
        statuses.every(status =>
          [statusesConst.error, statusesConst.success].includes(status)
        ),
      [statusesConst.success]: statuses.every(
        status => status === statusesConst.success
      ),
      [statusesConst.pending]: statuses.some(
        status => status === statusesConst.pending
      ),
      [statusesConst.queued]: statuses.some(
        status => status === statusesConst.queued
      ),
      [statusesConst.queuedForReTry]: statuses.some(
        status => status === statusesConst.queuedForReTry
      )
    }
    return Object.keys(statusCondition).find(key => statusCondition[key])
  }

  useEffect(() => {
    const globalStatus =
      status === 'cancelled'
        ? status
        : getGlobalStatus(executions.map(({ status }) => status))
    setSuiteExecutionStatus(globalStatus)
  })

  const onRerunAll = () => {
    const path = applyQueryParams(`/rerun-suite-execution`, { id })
    setLoadingRerun(true)
    api(path)
      .then(async () => {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        await timeout(1000)
        setLoadingRerun(false)
        fetchSuiteExecution()
      })
      .catch(() => setLoadingRerun(false))
  }

  const onCancel = () => {
    const path = applyQueryParams(`/cancel-suite-execution`, { id })
    setLoadingCancel(true)
    api(path)
      .then(async () => {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        await timeout(1000)
        setLoadingCancel(false)
        fetchSuiteExecution()
      })
      .catch(() => setLoadingCancel(false))
  }

  return (
    <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="mc-mb-4">
        <span className="d-inline mc-text-h5 mc-mr-2">{id}</span>
        <StatusBadge status={suiteExecutionStatus} />
      </div>
      {suiteId && <p>suite id: {suiteId}</p>}
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
      {!['running', 'pending'].includes(suiteExecutionStatus) && (
        <Button className="mc-my-3" onClick={onRerunAll} loading={loadingRerun}>
          RERUN ALL
        </Button>
      )}
      {['running', 'pending'].includes(suiteExecutionStatus) && (
        <Button
          className="mc-my-3"
          onClick={onCancel}
          loading={loadingCancel}
          kind="secondary"
        >
          CANCEL
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
            onRerunSuccess={fetchSuiteExecution}
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
  fetchSuiteExecution: PropTypes.func.isRequired,
  concurrencyCount: PropTypes.number,
  webhook: PropTypes.string,
  repositoryName: PropTypes.string,
  repositoryOwner: PropTypes.string,
  repositoryRef: PropTypes.string
}

export default SuiteExecution
