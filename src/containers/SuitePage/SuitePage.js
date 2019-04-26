import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Separator, Button } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import Environment from 'components/Environment'
import StatusBadge from 'components/StatusBadge'
import Spinner from 'components/Spinner'
import { applyQueryParams } from 'utils/helpers'
import ConcurrencyInput from './ConcurrencyInput'
import TestList from './TestList'
import SuiteExecutionRow from './SuiteExecutionRow'
import URLInput from './URLInput'
import WebhookInput from './WebhookInput'

const SuitePage = ({
  fetchSuite,
  fetchSuiteExecutions,
  suite,
  suiteExecutions,
  loadingSuite,
  loadingSuiteExecutions,
  repositoryOwner,
  repositoryName,
  repositoryRef
}) => {
  const [url, setUrl] = useState()
  const [urlEnabled, setUrlEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [concurrency, setConcurrency] = useState()
  const [concurrencyEnabled, setConcurrencyEnabled] = useState(false)
  const [webhook, setWebhook] = useState()
  const [webhookEnabled, setWebhookEnabled] = useState(false)

  useEffect(() => {
    fetchSuite()
  }, [])

  useEffect(() => {
    fetchSuiteExecutions()
  }, [])

  const handleRunSuite = () => {
    setLoading(true)
    const params = { suite: suite.id, repositoryRef }
    if (concurrencyEnabled && concurrency) {
      params.concurrencyCount = parseInt(concurrency, 10)
    }
    if (urlEnabled && url) {
      params.url = url
    }
    if (webhookEnabled && webhook) {
      params.webhook = webhook
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
      <Environment />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        {loadingSuite && !suite && <Spinner />}
        {suite && suite.tests && (
          <Fragment>
            <div>
              <div>
                <h5 className="d-inline mc-text-h5 mc-mr-2">{suite.name}</h5>
                {suite.lastSuiteExecution && (
                  <StatusBadge status={suite.lastSuiteExecution.status} />
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
            <TestList
              tests={suite.tests}
              repositoryOwner={repositoryOwner}
              repositoryName={repositoryName}
              repositoryRef={repositoryRef}
            />
            <Separator />
            <h5 className="mc-text-h5 mc-my-4">Run Suite</h5>
            <ConcurrencyInput
              enabled={concurrencyEnabled}
              onToggle={() => setConcurrencyEnabled(!concurrencyEnabled)}
              concurrency={concurrency}
              onChange={setConcurrency}
            />
            <URLInput
              enabled={urlEnabled}
              onToggle={() => setUrlEnabled(!urlEnabled)}
              url={url}
              onChange={setUrl}
            />
            <WebhookInput
              enabled={webhookEnabled}
              onToggle={() => setWebhookEnabled(!webhookEnabled)}
              webhook={webhook}
              onChange={setWebhook}
            />
            <Button
              className="mc-mb-4"
              onClick={handleRunSuite}
              loading={loading}
            >
              Run Entire suite
            </Button>
            <Separator />
            <h5 className="mc-text-h5 mc-my-4">Suite Executions</h5>
            {loadingSuiteExecutions && <Spinner />}
            {!loadingSuiteExecutions && !suiteExecutions.length && (
              <p>This test suite doesn&#39;t have any execution yet.</p>
            )}
            <div>
              {suiteExecutions.map(suiteExecution => (
                <SuiteExecutionRow
                  key={suiteExecution.id}
                  {...suiteExecution}
                />
              ))}
            </div>
          </Fragment>
        )}
      </div>
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
  suiteExecutions: PropTypes.array,
  loadingSuite: PropTypes.bool,
  loadingSuiteExecutions: PropTypes.bool,
  repositoryOwner: PropTypes.string,
  repositoryName: PropTypes.string,
  repositoryRef: PropTypes.string
}

export default SuitePage
