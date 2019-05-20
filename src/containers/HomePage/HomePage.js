import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import TestSuites from 'components/TestSuites'
import Header from 'components/Header'
import Environment from 'components/Environment'
import Spinner from 'components/Spinner'
import RunAllTest from 'components/RunAllTests'
import RunGithubCheck from 'components/RunGithubCheck'

const HomePage = ({ fetchTestSuites, testSuites, loading }) => {
  useEffect(() => {
    fetchTestSuites()
  }, [])

  return (
    <div>
      <Header />
      <Environment />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Test Suites</h5>
        <Separator />
        {loading && !testSuites.length && <Spinner />}
        {!loading && !testSuites.length && (
          <p className="mc-my-5">
            This repository doesn&#39;t have any test suite yet.
          </p>
        )}
        {!!testSuites.length && (
          <div className="row">
            <div className="col-6">
              {!!testSuites && <TestSuites testSuites={testSuites} />}
            </div>
          </div>
        )}
      </div>
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <div className="row">
          <div className="col-6">
            <h5 className="mc-text-h5">Run All Tests</h5>
            <Separator />
            <RunAllTest />
          </div>
          <div className="col-6">
            <h5 className="mc-text-h5">Run Github Check</h5>
            <Separator />
            <RunGithubCheck />
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  fetchTestSuites: PropTypes.func.isRequired,
  testSuites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tests: PropTypes.array.isRequired
    })
  ),
  loading: PropTypes.bool.isRequired
}

export default HomePage
