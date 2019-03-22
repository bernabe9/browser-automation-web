import React, { useState } from 'react'

import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'
import FolderOpenIcon from './FolderOpenIcon'

const getIcon = (isFile, expanded) => {
  if (isFile) {
    return <FileIcon />
  }
  return expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const TreeView = ({ data, onToggle }) => {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = node => {
    setExpanded(!expanded)
    onToggle(node)
  }

  return (
    <div>
      <div onClick={() => handleToggle(data)}>
        <span>{getIcon(data.type === 'file', expanded)}</span>
        <span>{data.name}</span>
      </div>
      {expanded && data.children && (
        <div className="mc-ml-3">
          {data.children.map(node => (
            <TreeView key={node.path} data={node} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeView
