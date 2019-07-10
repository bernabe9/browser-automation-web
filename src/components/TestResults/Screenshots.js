import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Modal, ModalClose, ModalContent } from 'mc-components'

import Anchor from 'components/Anchor'
import Screenshot from './Screenshot'

const Screenshots = ({ index, screenshots, onRerun }) => {
  const [toggleRerun, setToggleRerun] = useState(
    onRerun && screenshots.current && screenshots.new && screenshots.diff
  )
  const [showScreenshots, setShowScreenshots] = useState(false)
  const currentScreenshotCn = cn('col-6', { 'offset-3': !screenshots.new })

  const handleAcceptAndRerun = () => {
    onRerun(true, index)
    setToggleRerun(false)
  }

  return (
    <Fragment>
      <Anchor onClick={() => setShowScreenshots(true)}>Show Screenshots</Anchor>
      {toggleRerun && (
        <Anchor className="mc-mt-1" onClick={handleAcceptAndRerun}>
          Accept new screenshot and rerun
        </Anchor>
      )}
      <Modal onClose={() => setShowScreenshots(false)} show={showScreenshots}>
        <ModalClose />
        <div className="container">
          <ModalContent>
            <div className="mc-my-10">
              <div className="row mc-mb-4">
                {screenshots.current && (
                  <div className={currentScreenshotCn}>
                    <Screenshot
                      title="Current screenshot"
                      src={`${screenshots.current}?${new Date().getTime()}`}
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
  index: PropTypes.number,
  screenshots: PropTypes.object,
  onRerun: PropTypes.func
}

export default Screenshots
