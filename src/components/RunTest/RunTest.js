import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Button } from 'mc-components'

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
    const path = applyQueryParams(`${process.env.API_URL}/trigger`, {
      test,
      url
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
      <FormGroup label="URL" name="url" error={urlError} touched={!!urlError}>
        <Input
          onChange={e => setUrl(e.target.value)}
          value={url}
          placeholder="https://beta.masterclass.com"
          error={urlError}
          touched={!!urlError}
        />
      </FormGroup>
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
