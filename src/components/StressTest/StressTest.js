import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Button } from 'mc-components'

import { applyQueryParams } from 'utils/helpers'

const StressTest = ({ test, fetchExecutions }) => {
  const [url, setUrl] = useState('')
  const [times, setTimes] = useState(1)
  const [urlError, setUrlError] = useState('')
  const [timesError, setTimesError] = useState('')
  const [loading, setLoading] = useState(false)

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
        }
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="mc-my-4">
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

StressTest.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired
}

export default StressTest
