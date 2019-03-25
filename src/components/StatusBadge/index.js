import React from 'react'
import PropTypes from 'prop-types'
import cc from 'classnames'
import Wrapper from './Wrapper'

const StatusBadge = ({ status, small = false }) => {
  const className = cc(
    'mc-text--uppercase',
    { 'mc-text-h7': !small },
    { 'mc-text-h8': !!small }
  )
  return (
    <Wrapper status={status} className={className}>
      {status}
    </Wrapper>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['running', 'success', 'error']).isRequired,
  small: PropTypes.bool
}

export default StatusBadge
