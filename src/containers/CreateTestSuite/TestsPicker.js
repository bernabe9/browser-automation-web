import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalClose, ModalContent } from 'mc-components'
import { withRouter } from 'react-router-dom'

import api from 'api'
import { applyQueryParams } from 'utils/helpers'
import TreeView from 'components/TreeView'
import Spinner from 'components/Spinner'
import Code from 'components/Code'

const TestsPicker = ({ onAddTest, onRemoveTest, selectedTests, match }) => {
  const [structure, setStructure] = useState()
  const [cursor, setCursor] = useState()
  const [showCode, setShowCode] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)

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
    if (node.type === 'file') {
      setCursor(node)
    }
  }

  const onToggleCode = () => {
    if (!showCode) {
      setLoadingCode(true)
    }
    setShowCode(!showCode)
  }

  const onCodeLoaded = () => setLoadingCode(false)
  const isSelected = cursor && selectedTests.has(cursor.path)

  return (
    <div className="row">
      <div className="col-5">
        <p className="mc-text-h8 mc-mb-3">Directories</p>
        {!structure && <Spinner />}
        {structure && (
          <TreeView
            data={structure}
            onToggle={onToggle}
            activeNode={cursor && cursor.path}
            isExpanded
          />
        )}
      </div>
      {cursor && (
        <div className="col-7">
          <div>
            <span className="mc-text-h5 mc-mb-3 mc-mr-3">{cursor.name}</span>
            {isSelected ? (
              <Button
                kind="secondary"
                onClick={() => onRemoveTest(cursor.path)}
              >
                Remove test
              </Button>
            ) : (
              <Button kind="primary" onClick={() => onAddTest(cursor.path)}>
                Add test
              </Button>
            )}
            <div className="mc-mt-5">
              <Button
                kind="tertiary"
                className="mc-mb-4"
                onClick={onToggleCode}
                loading={loadingCode}
              >
                Show source code
              </Button>
              <Modal onClose={onToggleCode} show={showCode}>
                <ModalClose />
                <div className="container">
                  <ModalContent>
                    <div className="mc-my-10">
                      <Code test={cursor.path} onCodeLoaded={onCodeLoaded} />
                    </div>
                  </ModalContent>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

TestsPicker.propTypes = {
  onAddTest: PropTypes.func.isRequired,
  onRemoveTest: PropTypes.func.isRequired,
  selectedTests: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(TestsPicker)
