import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { testStatus } from 'utils/helpers'
import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'
import FolderOpenIcon from './FolderOpenIcon'
import Node from './Node'
import NodeName from './NodeName'
import StatusDot from './StatusDot'

const getIcon = (isFile, expanded) => {
  if (isFile) {
    return <FileIcon />
  }
  return expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const TreeView = ({
  data,
  activeNode,
  executions,
  isExpanded = false,
  onToggle
}) => {
  const [expanded, setExpanded] = useState(isExpanded)

  const handleToggle = node => {
    setExpanded(!expanded)
    onToggle(node)
  }

  const isFile = data.type === 'file'
  const isActive = activeNode === data.path

  const getTestStatus = () => {
    if (!isFile) {
      return
    }
    const testExecutions = executions.filter(({ test }) => test === data.path)
    return testStatus(testExecutions)
  }

  const status = getTestStatus()

  return (
    <div>
      <div onClick={() => handleToggle(data)}>
        <Node isActive={isActive}>
          <span>{getIcon(isFile, expanded)}</span>
          <NodeName status={status}>{data.name}</NodeName>
          {status && <StatusDot status={status} className="mc-ml-1" />}
        </Node>
      </div>
      {expanded && data.children && (
        <div className="mc-ml-3">
          {data.children.map(node => (
            <TreeView
              key={node.path}
              data={node}
              executions={executions}
              onToggle={onToggle}
              activeNode={activeNode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

TreeView.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  activeNode: PropTypes.string,
  isExpanded: PropTypes.bool,
  executions: PropTypes.array
}

export default TreeView
