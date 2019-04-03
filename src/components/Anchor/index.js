import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Anchor = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 1 !important;
  }
`

const StyledAnchor = ({ children, className = '' }) => (
  <Anchor
    className={`mc-text-h8 mc-text--uppercase mc-text--muted ${className}`}
  >
    {children}
  </Anchor>
)

StyledAnchor.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default StyledAnchor
