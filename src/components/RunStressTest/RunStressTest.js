import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'

const RunStressTest = ({ test, fetchExecutions, fetchStressExecutions }) => {
  const [url, setUrl] = useState('')
  const [times, setTimes] = useState('1')
  const [urlError, setUrlError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }
    setLoading(true)
    const path = applyQueryParams(`${process.env.API_URL}/stress`, {
      test,
      url,
      times
    })
    fetch(path)
      .then(res => {
        setLoading(false)
        if (res.ok) {
          fetchExecutions()
          fetchStressExecutions()
        }
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="mc-my-4">
      <FormGroup label="URL" name="url" error={urlError} touched={!!urlError}>
        <div className="row">
          <div className="col-6">
            <Input
              onChange={e => setUrl(e.target.value)}
              value={url}
              placeholder="https://beta.masterclass.com"
              error={urlError}
              touched={!!urlError}
            />
          </div>
          <div className="col-3">
            <Input
              type="number"
              onChange={e => setTimes(e.target.value)}
              value={times}
              placeholder="1"
            />
          </div>
        </div>
      </FormGroup>
      <Button onClick={onSubmit} loading={loading}>
        RUN
      </Button>
    </div>
  )
}

RunStressTest.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  fetchStressExecutions: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired
}

export default RunStressTest
