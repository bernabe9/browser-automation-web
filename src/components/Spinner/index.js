import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './Wrapper'
import Icon from './Icon'

const Spinner = ({ width = '3em', height = '3em', ...props }) => (
  <Wrapper width={width} height={height}>
    <Icon
      width={height}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM5.25 12a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 6a.75.75 0 0 1 .75-.75A6.75 6.75 0 0 1 18.75 12a.75.75 0 0 1-1.5 0c0-2.9-2.35-5.25-5.25-5.25a.75.75 0 0 1-.75-.75z"
        fill="currentColor"
      />
    </Icon>
  </Wrapper>
)

Spinner.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default Spinner
