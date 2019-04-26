import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Input, FormGroup, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'
import api from 'api'

const RunStressTest = ({ test, lastStressExecution, onSuccess, match }) => {
  const [url, setUrl] = useState('')
  const [times, setTimes] = useState(1)
  const [urlError, setUrlError] = useState('')
  const [timesError, setTimesError] = useState('')
  const [loading, setLoading] = useState(false)

  const getLastErrorRate = lastStressExecution => {
    const { errorCount, successCount } = lastStressExecution
    if (errorCount + successCount === 0) {
      return 0
    }
    return (errorCount * 100) / (errorCount + successCount)
  }

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }
    if (!times) {
      setTimesError("Times can't be empty")
      return
    }
    setLoading(true)
    const { repositoryOwner, repositoryName } = match.params
    const repository = `${repositoryOwner}/${repositoryName}`
    const path = applyQueryParams('/stress', {
      test,
      repository,
      url,
      times
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

  return (
    <div className="mc-my-4">
      {!!lastStressExecution && (
        <div className="mc-mb-4">
          <span>Last results error rate: </span>
          <span className="mc-text-h6">{`${getLastErrorRate(
            lastStressExecution
          )}%`}</span>
        </div>
      )}
      <div className="row">
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
        <div className="col-3">
          <FormGroup
            label="times"
            name="times"
            error={timesError}
            touched={!!timesError}
            min={1}
          >
            <Input
              onChange={e => setTimes(e.target.value)}
              value={times}
              error={timesError}
              touched={!!timesError}
              type="number"
            />
          </FormGroup>
        </div>
      </div>
      <Button onClick={onSubmit} loading={loading}>
        RUN
      </Button>
    </div>
  )
}

RunStressTest.propTypes = {
  test: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  lastStressExecution: PropTypes.object,
  match: PropTypes.object.isRequired
}

export default withRouter(RunStressTest)
