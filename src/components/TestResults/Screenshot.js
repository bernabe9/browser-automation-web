import React from 'react'
import PropTypes from 'prop-types'

import ScreenshotImg from './ScreenshotImg'

const Screenshot = ({ title, src }) => (
  <div>
    <p>{title}</p>
    <ScreenshotImg src={src} alt={title} />
  </div>
)

Screenshot.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Screenshot
