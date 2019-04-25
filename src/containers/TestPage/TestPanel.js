import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator, Button } from 'mc-components'

import { testStatus as getTestStatus } from 'utils/helpers'
import StatusBadge from 'components/StatusBadge'
import RunTest from 'components/RunTest'
import RunStressTest from 'components/RunStressTest'
import Code from 'components/Code'
import Executions from 'components/Executions'
import Spinner from 'components/Spinner'

const TestPanel = ({
  testExecutions,
  stressExecutions,
  fetchExecutions,
  fetchStressExecutions,
  cursor,
  loadingExecutions,
  loadingStress
}) => {
  const [showCode, setShowCode] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)

  useEffect(() => {
    fetchExecutions()
    fetchStressExecutions()
  }, [cursor])

  const onToggleCode = () => {
    if (!showCode) {
      setLoadingCode(true)
    }
    setShowCode(!showCode)
  }

  const onCodeLoaded = () => setLoadingCode(false)

  const onSuccessRun = () => {
    fetchExecutions()
    fetchStressExecutions()
  }

  const testStatus = getTestStatus(testExecutions)

  return (
    <div className="col-8">
      <div>
        <span className="mc-text-h5 mc-mb-3 mc-mr-3">{cursor.name}</span>
        {testStatus && <StatusBadge status={testStatus} />}
        <div className="mc-mt-5">
          <Button
            kind="tertiary"
            className="mc-mb-4"
            onClick={onToggleCode}
            loading={loadingCode}
          >
            {showCode ? 'Hide source code' : 'Show source code'}
          </Button>
          {showCode && <Code test={cursor.path} onCodeLoaded={onCodeLoaded} />}
        </div>
      </div>
      <Separator />
      <div className="mc-my-6">
        <h6 className="mc-text-h6">Run test</h6>
        <RunTest test={cursor.path} onSuccess={onSuccessRun} />
      </div>
      <Separator />
      <div className="mc-my-6">
        <h6 className="mc-text-h6">Stress Testing</h6>
        <p>Run this test multiple times to check how stable it is</p>
        <RunStressTest
          test={cursor.path}
          lastStressExecution={stressExecutions && stressExecutions[0]}
          onSuccess={onSuccessRun}
        />
      </div>
      <Separator />
      <div className="mc-my-6">
        <h6 className="mc-text-h6 mc-mb-4">Stress Executions</h6>
        {loadingStress && <Spinner />}
        {!loadingExecutions && !loadingStress && !stressExecutions && (
          <p>This test doesn&#39;t have any stress execution yet.</p>
        )}
        {stressExecutions && (
          <Executions executions={stressExecutions} stress />
        )}
      </div>
      <Separator />
      <div className="mc-my-6">
        <h6 className="mc-text-h6 mc-mb-4">Executions</h6>
        {loadingExecutions && <Spinner />}
        {!loadingExecutions && !testExecutions.length && (
          <p>This test doesn&#39;t have any execution yet.</p>
        )}
        {testExecutions && <Executions executions={testExecutions} />}
      </div>
    </div>
  )
}

TestPanel.propTypes = {
  testExecutions: PropTypes.array.isRequired,
  stressExecutions: PropTypes.array,
  cursor: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default TestPanel
