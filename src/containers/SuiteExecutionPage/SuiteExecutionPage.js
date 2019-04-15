import React, { useEffect } from 'react'
import format from 'date-fns/format'
import { Separator } from 'mc-components'

import Header from 'components/Header'
import StatusBadge from 'components/StatusBadge'
import ExecutionRow from 'components/Executions/ExecutionRow'

const SuiteExecutionPage = ({ suiteExecution, fetchSuiteExecution }) => {
  useEffect(() => {
    fetchSuiteExecution()
  }, [])

  const { id, status, suiteId, url, createdAt, executions } = suiteExecution

  return (
    <div>
      <Header />
      {suiteExecution && (
        <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
          <div className="mc-mb-4">
            <span className="d-inline mc-text-h5 mc-mr-2">{id}</span>
            <StatusBadge status={status} />
          </div>
          <p>suite id: {suiteId}</p>
          <p>URL: {url}</p>
          <p>created at: {format(new Date(createdAt), 'MM/DD/YYYY HH:mm')}</p>
          <Separator />
          <div className="mc-my-4">
            <h5 className="mc-text-h5 mc-my-5">Test Executions</h5>
            {executions.map(execution => (
              <ExecutionRow key={execution.id} {...execution} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SuiteExecutionPage
