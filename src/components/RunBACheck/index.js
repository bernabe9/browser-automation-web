import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Input, FormGroup, Button } from 'mc-components'
import Anchor from 'components/Anchor'
import api from 'api'

const RunGithubCheck = ({ match }) => {
  const [url, setUrl] = useState('')
  const [sha, setSha] = useState('')
  const [prNumber, setPrNumber] = useState('')
  const [urlError, setUrlError] = useState('')
  const [shaError, setShaError] = useState('')
  const [prNumberError, setPrNumberError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { repositoryName, repositoryOwner } = match.params

  const gotoPR = () => {
    window.location = `https://github.com/${repositoryOwner}/${repositoryName}/pull/${prNumber}`
  }

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ")
      return
    }
    if (!prNumber) {
      setPrNumberError("PR can't be empty ")
      return
    }
    if (!sha) {
      setShaError("SHA can't be empty ")
      return
    }
    setSuccess(false)
    setLoading(true)

    return api('/web-trigger', {
      method: 'post',
      url: 'githubBA',
      body: {
        url,
        prNumber,
        sha,
        repositoryName,
        repositoryOwner
      }
    }).then(() => {
      setLoading(false)
      setSuccess(true)
    })
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
      <div className="row">
        <div className="col-8">
          <FormGroup
            label="SHA"
            name="sha"
            error={shaError}
            touched={!!shaError}
          >
            <Input
              onChange={e => setSha(e.target.value)}
              value={sha}
              placeholder="Commit sha"
              error={shaError}
              touched={!!shaError}
            />
          </FormGroup>
        </div>
        <div className="col-4">
          <FormGroup
            label="PR"
            name="prNumber"
            error={prNumberError}
            touched={!!prNumberError}
          >
            <Input
              type="number"
              onChange={e => setPrNumber(e.target.value)}
              value={prNumber}
              placeholder="PR number"
              error={prNumberError}
              touched={!!prNumberError}
            />
          </FormGroup>
        </div>
      </div>
      <Button onClick={onSubmit} loading={loading}>
        RUN
      </Button>

      {success && (
        <p className="mc-mt-4 mc-text-small">
          Github Check was successfully added, go to the PR to see the status:{' '}
          <Anchor onClick={gotoPR}>
            {`https://github.com/${repositoryOwner}/${repositoryName}/pull/${prNumber}`}
          </Anchor>
        </p>
      )}
    </div>
  )
}

RunGithubCheck.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(RunGithubCheck)
