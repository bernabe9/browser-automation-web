import React, { useEffect, useState } from 'react'
import { Separator } from 'mc-components'

import api from 'api'
import TreeView from 'components/TreeView'

const NavigationPanel = () => {
  const [structure, setStructure] = useState()
  const [cursor, setCursor] = useState()

  useEffect(() => {
    api('/folders').then(setStructure)
  }, [])

  const onToggle = node => {
    if (node.type === 'file') {
      setCursor(node)
    }
  }

  return (
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="row">
        <div className="col-3">
          <h5 className="mc-text-h5 mc-mb-3">Directories</h5>
          {structure && <TreeView data={structure} onToggle={onToggle} />}
        </div>
        {cursor && (
          <div className="col-9">
            <div>
              <h5 className="mc-text-h5 mc-mb-3">{cursor.name}</h5>
              <p>Status:</p>
            </div>
            <Separator />
          </div>
        )}
      </div>
    </div>
  )
}

export default NavigationPanel
