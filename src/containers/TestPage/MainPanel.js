import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import api from 'api'
import { applyQueryParams } from 'utils/helpers'
import routes from 'constants/routesPaths'
import TreeView from 'components/TreeView'
import Spinner from 'components/Spinner'
import LeftWrapper from './LeftWrapper'
import TestPanel from './TestPanelConnected'

const MainPanel = ({ history, match }) => {
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
    <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="row">
        <div className="col-4">
          <LeftWrapper>
            <h5 className="mc-text-h5 mc-mb-3">Directories</h5>
            {!structure && <Spinner />}
            {structure && (
              <TreeView
                queryPath={queryPath.path}
                data={structure}
                executions={[]}
                onToggle={onToggle}
                activeNode={cursor && cursor.path}
                isExpanded
              />
            )}
          </LeftWrapper>
        </div>
        {cursor && <TestPanel cursor={cursor} match={match} />}
      </div>
    </div>
  )
}

MainPanel.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default MainPanel
