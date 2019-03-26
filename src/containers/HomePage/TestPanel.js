import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator, Button } from 'mc-components'

import { testStatus as getTestStatus } from 'utils/helpers'
import StatusBadge from 'components/StatusBadge'
import RunTest from 'components/RunTest'
import Code from 'components/Code'
import Executions from 'components/Executions'

const TestPanel = ({ executions, cursor }) => {
  const [showCode, setShowCode] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)

  const onToggleCode = () => {
    if (!showCode) {
      setLoadingCode(true)
    }
    setShowCode(!showCode)
  }

  const onCodeLoaded = () => setLoadingCode(false)

  const testExecutions = executions.filter(({ test }) => test === cursor.path)
  const testStatus = getTestStatus(testExecutions)

  return (
    <div className="col-9">
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
        <RunTest test={cursor.path} />
      </div>
      <Separator />
      <div className="mc-my-6">
        <h6 className="mc-text-h6 mc-mb-4">Executions</h6>
        <Executions executions={testExecutions} />
      </div>
    </div>
  )
}

TestPanel.propTypes = {
  executions: PropTypes.array.isRequired,
  cursor: PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default TestPanel
