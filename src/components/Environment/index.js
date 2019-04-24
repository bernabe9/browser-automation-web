import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setEnvironment } from 'state/modules/environment'

const Environment = ({
  match,
  setEnvironment,
  repositoryName,
  repositoryOwner,
  repositoryRef
}) => {
  useEffect(() => {
    setEnvironment(match.params)
  }, [])

  return (
    <div className="container mc-mt-5 mc-p-1">
      <p>Repository: {`${repositoryOwner}/${repositoryName}`}</p>
      {repositoryRef && <p>Ref: {repositoryRef}</p>}
    </div>
  )
}

Environment.propTypes = {
  match: PropTypes.object.isRequired,
  setEnvironment: PropTypes.func.isRequired,
  repositoryName: PropTypes.string,
  repositoryOwner: PropTypes.string,
  repositoryRef: PropTypes.string
}

const mapState = state => ({
  repositoryName: state.environment.repositoryName,
  repositoryOwner: state.environment.repositoryOwner,
  repositoryRef: state.environment.repositoryRef
})

const mapDispatch = { setEnvironment }

export default connect(
  mapState,
  mapDispatch
)(withRouter(Environment))
