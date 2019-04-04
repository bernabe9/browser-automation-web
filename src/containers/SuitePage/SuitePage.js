import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator, Button } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import { applyQueryParams } from 'utils/helpers'
import SuiteTest from './SuiteTest'

const SuitePage = ({ fetchSuite, suite }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSuite()
  }, [])

  const handleRunSuite = () => {
    setLoading(true)
    api(applyQueryParams('/run-suite', { suite: suite.id })).then(() => {
      setLoading(false)
      fetchSuite()
    })
  }

  const handleRunSingleTest = path => () => {
    setLoading(true)
    api(applyQueryParams('/run-suite', { suite: suite.id, test: path })).then(
      () => {
        setLoading(false)
        fetchSuite()
      }
    )
  }

  return (
    <div>
      <Header />
      <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
        <div className="row align-items-center">
          <div className="col-auto">
            {!!suite && <h5 className="mc-text-h5">{suite.name}</h5>}
          </div>
          <div className="col-auto">
            <Button onClick={handleRunSuite} loading={loading}>
              Run Entire suite
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mc-py-4">
          {suite &&
            suite.tests &&
            Object.values(suite.tests).map(test => (
              <SuiteTest
                key={test.path}
                loading={loading}
                test={test}
                handleRunSingleTest={handleRunSingleTest}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

SuitePage.propTypes = {
  fetchSuite: PropTypes.func.isRequired,
  suite: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tests: PropTypes.object.isRequired
  })
}

export default SuitePage
