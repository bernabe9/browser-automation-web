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

const TreeView = ({ data, activeNode, onToggle }) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = node => {
    setExpanded(!expanded)
    onToggle(node)
  }

  const isActive = activeNode === data.path

  return (
    <div>
      <div onClick={() => handleToggle(data)}>
        <a style={{ fontWeight: isActive ? 'bold' : 'normal' }}>
          <span>{getIcon(data.type === 'file', expanded)}</span>
          <span>{data.name}</span>
        </a>
      </div>
      {expanded && data.children && (
        <div className="mc-ml-3">
          {data.children.map(node => (
            <TreeView
              key={node.path}
              data={node}
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
  activeNode: PropTypes.string
}

export default TreeView
