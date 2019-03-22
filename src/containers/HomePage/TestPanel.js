import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import TreeView from 'components/TreeView'
import RunTest from 'components/RunTest'
import Code from 'components/Code'
import Executions from './Executions'

const TestPanel = ({ executions }) => {
  const [structure, setStructure] = useState()
  const [cursor, setCursor] = useState()
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    api('/folders').then(setStructure)
  }, [])

  const onToggle = node => {
    if (node.type === 'file') {
      setCursor(node)
    }
  }

  const getTestExecutions = () =>
    executions.filter(({ test }) => test === cursor.path)

  const getTestStatus = () => {
    const testExecutions = getTestExecutions()
    const sortedExecutions = [...testExecutions].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    if (!sortedExecutions.length) {
      return 'Run this test to generate a status'
    }
    return sortedExecutions[0].status
  }

  return (
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="row">
        <div className="col-3">
          <h5 className="mc-text-h5 mc-mb-3">Directories</h5>
          {structure && (
            <TreeView
              data={structure}
              executions={executions}
              onToggle={onToggle}
              activeNode={cursor && cursor.path}
              isExpanded
            />
          )}
        </div>
        {cursor && (
          <div className="col-9">
            <div>
              <h5 className="mc-text-h5 mc-mb-3">{cursor.name}</h5>
              <p>Status: {getTestStatus()}</p>
              <div className="mc-mt-4">
                <a onClick={() => setShowCode(!showCode)}>
                  {showCode ? 'Hide source code' : 'Show source code'}
                </a>
                {showCode && <Code test={cursor.path} />}
              </div>
            </div>
            <Separator />
            <div className="mc-my-6">
              <h6 className="mc-text-h6">Run test</h6>
              <RunTest test={cursor.path} />
            </div>
            <Separator />
            <div className="mc-my-6">
              <h6 className="mc-text-h6">Executions</h6>
              <Executions executions={getTestExecutions()} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

TestPanel.propTypes = {
  executions: PropTypes.array.isRequired
}

export default TestPanel
