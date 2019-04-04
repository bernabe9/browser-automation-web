import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Button, Separator, FormGroup, Input } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

import StatusBadge from 'components/StatusBadge'

const SuiteTest = ({
  test: { path, status, lastRunAt },
  defaultUrl,
  handleRunSingleTest,
  loading
}) => {
  const [inputURL, setInputURL] = useState(false)
  const [url, setUrl] = useState('')

  const getDistance = () => {
    if (!lastRunAt) {
      return 'Not ran yet'
    }
    return distanceInWords(new Date(lastRunAt), {
      includeSeconds: true
    })
  }

  const [distance, setDistance] = useState(getDistance())

  useEffect(() => {
    const interval = setInterval(() => setDistance(getDistance()), 60000)
    return () => clearInterval(interval)
  })

  return (
    <Fragment>
      <div className="mc-pb-4">
        <p>
          Test:{' '}
          <Link className="mc-text-h6" to={`/tests?path=${path}`}>
            {path}
          </Link>
        </p>
        <div>
          <span>Status: </span>
          <StatusBadge status={status} small />
        </div>
        <p>Last run at: {distance}</p>
      </div>
      <FormGroup name="url">
        <div className="row align-items-center">
          <div className="col-auto">
            <Button onClick={handleRunSingleTest(path, url)} loading={loading}>
              Run Test
            </Button>
          </div>
          <div className="col-12 col-sm-3">
            {inputURL ? (
              <Input
                onChange={e => setUrl(e.target.value)}
                value={url}
                placeholder={defaultUrl}
              />
            ) : (
              <a
                className="mc-text-h8 mc-text--uppercase mc-text--muted"
                onClick={() => setInputURL(true)}
              >
                Change url
              </a>
            )}
          </div>
        </div>
      </FormGroup>
      <Separator />
    </Fragment>
  )
}

SuiteTest.propTypes = {
  test: PropTypes.shape({
    path: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastRunAt: PropTypes.number
  }),
  defaultUrl: PropTypes.string.isRequired,
  handleRunSingleTest: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SuiteTest
