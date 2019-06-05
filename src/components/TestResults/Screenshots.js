import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalClose, ModalContent } from 'mc-components'

import Anchor from 'components/Anchor'
import Screenshot from './Screenshot'

const Screenshots = ({ screenshots }) => {
  const [showScreenshots, setShowScreenshots] = useState(false)

  return (
    <Fragment>
      <Anchor onClick={() => setShowScreenshots(true)}>Show Screenshots</Anchor>
      <Modal onClose={() => setShowScreenshots(false)} show={showScreenshots}>
        <ModalClose />
        <div className="container">
          <ModalContent>
            <div className="mc-my-10">
              <div className="row mc-mb-4">
                {screenshots.current && (
                  <div className={`col-6 ${screenshots.new ? '' : 'offset-3'}`}>
                    <Screenshot
                      title="Current screenshot"
                      src={screenshots.current}
                    />
                  </div>
                )}
                {screenshots.new && (
                  <div className="col-6">
                    <Screenshot title="New screenshot" src={screenshots.new} />
                  </div>
                )}
              </div>
              {screenshots.diff && (
                <Screenshot title="Diff" src={screenshots.diff} />
              )}
            </div>
          </ModalContent>
        </div>
      </Modal>
    </Fragment>
  )
}

Screenshots.propTypes = {
  screenshots: PropTypes.object
}

export default Screenshots
