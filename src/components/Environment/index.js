import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'mc-components'

import api from 'api'
import { setEnvironment } from 'state/modules/environment'
import RefInput from './RefInput'

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

  const [changeReference, setChangeReference] = useState(false)
  const [ref, setRef] = useState(repositoryRef)

  const handleChangeRef = () => {
    window.location = window.location.pathname.replace(
      `${repositoryRef}`,
      `${ref}`
    )
  }

  return (
    <div className="container mc-mt-5 mc-p-1">
      <p>Repository: {`${repositoryOwner}/${repositoryName}`}</p>
      {repositoryRef && <p>Ref: {repositoryRef}</p>}
      <div className="mc-mt-4">
        <RefInput
          defaultRef={repositoryRef}
          enabled={changeReference}
          onToggle={() => setChangeReference(!changeReference)}
          repository={ref}
          onChange={setRef}
        />
        {changeReference && <Button onClick={handleChangeRef}>Change</Button>}
      </div>
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
