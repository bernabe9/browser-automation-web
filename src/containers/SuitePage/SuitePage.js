import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator, FormGroup, Input, Button } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import StatusBadge from 'components/StatusBadge'
import { applyQueryParams } from 'utils/helpers'
import ConcurrencyInput from './ConcurrencyInput'
import SuiteExecutionRow from './SuiteExecutionRow'

const SuitePage = ({
  fetchSuite,
  fetchSuiteExecutions,
  suite,
  suiteExecutions
}) => {
  const [inputURL, setInputURL] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [concurrency, setConcurrency] = useState()
  const [concurrencyEnabled, setConcurrencyEnabled] = useState(false)

  useEffect(() => {
    fetchSuite()
  }, [])

  useEffect(() => {
    fetchSuiteExecutions()
  }, [])

  const handleRunSuite = () => {
    setLoading(true)
    const params = {
      suite: suite.id,
      url
    }
    if (concurrencyEnabled && concurrency) {
      params.concurrencyCount = parseInt(concurrency, 10)
    }
    api(applyQueryParams('/run-suite', params)).then(async () => {
      const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
      await timeout(1000)
      setLoading(false)
      fetchSuiteExecutions()
    })
  }

  return (
    <div>
      <Header />
      {suite && suite.tests && (
        <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
          <div className="mc-mb-4">
            <div>
              <h5 className="d-inline mc-text-h5 mc-text--uppercase mc-mr-2">
                {suite.name}
              </h5>
              {suite.lastSuiteExecution && (
                <StatusBadge status={suite.lastSuiteExecution.status} small />
              )}
            </div>
            <p>{suite.description}</p>
            <p className="mc-text--hinted">
              Default URL:{' '}
              <a href={suite.url} target="_blank" rel="noopener noreferrer">
                {suite.url}
              </a>
            </p>
          </div>
          <ConcurrencyInput
            enabled={concurrencyEnabled}
            onToggle={() => setConcurrencyEnabled(!concurrencyEnabled)}
            concurrency={concurrency}
            onChange={setConcurrency}
          />
          <FormGroup name="url">
            <div className="row align-items-center">
              <div className="col-auto">
                <Button onClick={handleRunSuite} loading={loading}>
                  Run Entire suite
                </Button>
              </div>
              <div className="col-12 col-sm-3">
                {inputURL ? (
                  <Input
                    onChange={e => setUrl(e.target.value)}
                    value={url}
                    placeholder={suite.url}
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
          <h5 className="mc-text-h5 mc-my-4">Suite Executions</h5>
          <div>
            {suiteExecutions.map(suiteExecution => (
              <SuiteExecutionRow key={suiteExecution.id} {...suiteExecution} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

SuitePage.propTypes = {
  fetchSuite: PropTypes.func.isRequired,
  fetchSuiteExecutions: PropTypes.func.isRequired,
  suite: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    tests: PropTypes.array
  }),
  suiteExecutions: PropTypes.array
}

export default SuitePage
