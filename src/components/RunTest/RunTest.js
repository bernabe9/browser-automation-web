import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Button } from 'mc-components'
import queryString from 'query-string'

import { applyQueryParams } from 'utils/helpers'

const RunTest = ({ test, fetchExecutions }) => {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }
    setLoading(true)
    const {
      repositoryName,
      repositoryOwner,
      repositoryRef
    } = queryString.parse(window.location.search)
    const path = applyQueryParams(`${process.env.API_URL}/trigger`, {
      test,
      url,
      repositoryName,
      repositoryOwner,
      repositoryRef
    })
    fetch(path)
      .then(async res => {
        setLoading(false)
        if (res.ok) {
          const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
          await timeout(1000)
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
      </div>
      <Button onClick={onSubmit} loading={loading}>
        RUN
      </Button>
    </div>
  )
}

RunTest.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired
}

export default RunTest
