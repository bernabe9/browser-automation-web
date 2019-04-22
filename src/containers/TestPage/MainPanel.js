import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import api from 'api'
import { applyQueryParams } from 'utils/helpers'
import routes from 'constants/routesPaths'
import TreeView from 'components/TreeView'
import LeftWrapper from './LeftWrapper'
import TestPanel from './TestPanel'

const MainPanel = ({ executions, stressExecutions, history, match }) => {
  const [structure, setStructure] = useState()
  const [cursor, setCursor] = useState()

  const queryPath = queryString.parse(history.location.search)

  useEffect(() => {
    const { repositoryName, repositoryOwner, repositoryRef } = match.params
    const path = applyQueryParams('/folders', {
      repositoryName,
      repositoryOwner,
      repositoryRef
    })
    api(path, { url: 'remote' }).then(setStructure)
  }, [])

  const onToggle = node => {
    const search = queryString.stringify({ ...queryPath, path: node.path })
    if (node.type === 'file') {
      history.push({
        pathname: routes.test(match.params),
        search
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
