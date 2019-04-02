import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import api from 'api'
import TreeView from 'components/TreeView'
import LeftWrapper from './LeftWrapper'
import TestPanel from './TestPanel'

const MainPanel = ({ executions, stressExecutions, history }) => {
  const [structure, setStructure] = useState()
  const [cursor, setCursor] = useState()

  const queryPath = queryString.parse(history.location.search)

  useEffect(() => {
    api('/folders').then(data => {
      setStructure(data)
      if (queryPath) {
        setCursor(queryPath)
      }
    })
  }, [])

  const onToggle = node => {
    if (node.type === 'file') {
      history.push({
        pathname: '/tests',
        search: `?name=${node.name}&path=${node.path}`
      })
      setCursor(node)
    }
  }

  return (
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="row">
        <div className="col-3">
          <LeftWrapper>
            <h5 className="mc-text-h5 mc-mb-3">Directories</h5>
            {structure && (
              <TreeView
                queryPath={queryPath.path}
                data={structure}
                executions={executions}
                onToggle={onToggle}
                activeNode={cursor && cursor.path}
                isExpanded
              />
            )}
          </LeftWrapper>
        </div>
        {cursor && (
          <TestPanel
            executions={executions}
            stressExecutions={stressExecutions}
            cursor={cursor}
          />
        )}
      </div>
    </div>
  )
}

MainPanel.propTypes = {
  executions: PropTypes.array.isRequired,
  stressExecutions: PropTypes.array.isRequired,
  history: PropTypes.object
}

export default MainPanel
