import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import api from 'api'
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
    const { repositoryName, repositoryOwner, repositoryRef } = match.params
    if (!repositoryRef && !!repositoryName && !!repositoryOwner) {
      api(`/repository?repository=${repositoryOwner}/${repositoryName}`).then(
        repository => {
          setEnvironment({
            repositoryName: repository.name,
            repositoryOwner: repository.owner,
            repositoryRef: repository.defaultRef
          })
        }
      )
    }
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
