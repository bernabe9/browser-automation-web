import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'
import FolderOpenIcon from './FolderOpenIcon'

const getIcon = (isFile, expanded) => {
  if (isFile) {
    return <FileIcon />
  }
  return expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const statusColors = {
  success: 'forestgreen',
  error: 'red',
  running: 'gold'
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

  const getTestStatusColor = () => {
    if (!isFile) {
      return
    }
    const testExecutions = executions.filter(({ test }) => test === data.path)
    const sortedExecutions = [...testExecutions].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    if (!sortedExecutions.length) {
      return
    }
    return statusColors[sortedExecutions[0].status]
  }

  const statusColor = getTestStatusColor()

  return (
    <div>
      <div onClick={() => handleToggle(data)}>
        <a
          style={{
            fontWeight: isActive ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span>{getIcon(isFile, expanded)}</span>
          <span style={{ color: statusColor }}>{data.name}</span>
          {statusColor && (
            <span
              style={{
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                backgroundColor: statusColor
              }}
              className="mc-ml-1"
            />
          )}
        </a>
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
