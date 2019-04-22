import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Environment = ({ match }) => {
  const { repositoryName, repositoryOwner, repositoryRef } = match.params
  return (
    <div className="container mc-mt-5 mc-p-1">
      <p>Repository: {`${repositoryOwner}/${repositoryName}`}</p>
      <p>Ref: {repositoryRef}</p>
    </div>
  )
}

Environment.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(Environment)
