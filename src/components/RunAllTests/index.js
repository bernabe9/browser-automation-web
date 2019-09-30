import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Input, FormGroup, Button } from 'mc-components'

import routes from 'constants/routesPaths'
import { applyQueryParams, getFiles } from 'utils/helpers'
import api from 'api'
import Anchor from 'components/Anchor'

const RunAllTests = ({ history, match }) => {
  const [url, setUrl] = useState('')
  const [concurrency, setConcurrency] = useState(5)
  const [forceParams, setForceParams] = useState('')
  const [urlError, setUrlError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }

    setLoading(true)
    const { repositoryName, repositoryOwner, repositoryRef } = match.params
    const path = applyQueryParams('/folders', {
      repositoryName,
      repositoryOwner,
      repositoryRef,
      exclude: process.env.EXCLUDE_FOLDER
    })

    api(path)
      .then(structure => {
        const tests = getFiles(structure)
        const path = applyQueryParams('/run-suite', {
          concurrencyCount: concurrency,
          repositoryName,
          repositoryOwner,
          repositoryRef,
          tests: tests.join(','),
          forceParams,
          url
        })
        return api(applyQueryParams(path))
      })
      .then(res => {
        setLoading(false)
        history.push(
          routes.suiteExecution({
            repositoryOwner,
            repositoryName,
            repositoryRef,
            id: res.suiteExecution.id
          })
        )
      })
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions)
    // clean values
    setForceParams('')
  }

  return (
    <div className="mc-my-4">
      <div className="row mc-my-2">
        <div className="col-8">
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
          <Anchor className="mc-my-4" onClick={toggleOptions}>
            {!showOptions ? 'More Options' : 'Less Options'}
          </Anchor>
          {showOptions && (
            <div className="mc-mb-4">
              <FormGroup label="Force Params" name="forceParams">
                <Input
                  onChange={e => setForceParams(e.target.value)}
                  value={forceParams}
                  placeholder="experiment_a=variation&experiment_b=control"
                />
              </FormGroup>
            </div>
          )}
          <Button className="mc-mt-2" onClick={onSubmit} loading={loading}>
            RUN
          </Button>
        </div>
        <div className="col-3">
          <FormGroup label="Concurrency" name="concurrency">
            <Input
              type="number"
              min={1}
              onChange={e => setConcurrency(e.target.value)}
              value={concurrency}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  )
}

RunAllTests.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(RunAllTests)
