import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Input, FormGroup, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'
import api from 'api'
import Anchor from 'components/Anchor'

const RunTest = ({ test, onSuccess, match }) => {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [forceParams, setForceParams] = useState('')

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }
    setLoading(true)
    const { repositoryName, repositoryOwner, repositoryRef } = match.params
    const path = applyQueryParams(`/trigger`, {
      test,
      url,
      repositoryName,
      repositoryOwner,
      repositoryRef,
      forceParams
    })
    api(path)
      .then(async () => {
        setLoading(false)
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        await timeout(1000)
        onSuccess()
      })
      .catch(() => setLoading(false))
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions)
    // clean values
    setForceParams('')
  }

  return (
    <div>
      <div className="row mc-mt-2">
        <div className="col-6">
          <FormGroup
            label="URL"
            name="url"
            error={urlError}
            touched={!!urlError}
          >
            <Input
              onChange={e => setUrl(e.target.value)}
              value={url}
              placeholder="https://beta.masterclass.com"
              error={urlError}
              touched={!!urlError}
            />
          </FormGroup>
        </div>
      </div>
      <Anchor className="mc-my-4" onClick={toggleOptions}>
        {!showOptions ? 'More Options' : 'Less Options'}
      </Anchor>
      {showOptions && (
        <div className="row mc-mb-4">
          <div className="col-6">
            <FormGroup label="Force Params" name="forceParams">
              <Input
                onChange={e => setForceParams(e.target.value)}
                value={forceParams}
                placeholder="experiment_a=variation&experiment_b=control"
              />
            </FormGroup>
          </div>
        </div>
      )}
      <Button onClick={onSubmit} loading={loading}>
        RUN
      </Button>
    </div>
  )
}

RunTest.propTypes = {
  test: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  onSuccess: PropTypes.func
}

export default withRouter(RunTest)
