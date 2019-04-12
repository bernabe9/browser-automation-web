import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import cn from 'classnames'

const Anchor = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 1 !important;
  }
`

const StyledAnchor = ({
  children,
  isActive = false,
  className = '',
  ...props
}) => {
  const classNames = cn(
    'mc-text-h8 mc-text--uppercase',
    { 'mc-text--muted': !isActive },
    { [className]: !!className }
  )
  return (
    <Anchor className={classNames} {...props}>
      {children}
    </Anchor>
  )
}

StyledAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool
}

export default StyledAnchor
