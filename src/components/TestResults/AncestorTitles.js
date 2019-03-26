import React from 'react'
import PropTypes from 'prop-types'

const AncestorTitles = ({ ancestors, index = 0, children }) => {
  if (index === ancestors.length) {
    return <div className="mc-ml-3">{children}</div>
  }

  return (
    <div className="mc-ml-3">
      <p>{ancestors[index]}</p>
      <AncestorTitles ancestors={ancestors} index={index + 1}>
        {children}
      </AncestorTitles>
    </div>
  )
}

AncestorTitles.propTypes = {
  ancestors: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default AncestorTitles
