import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import TestSuites from 'components/TestSuites'
import Logo from './Logo'

const HomePage = ({ fetchTestSuites, testSuites }) => {
  useEffect(() => {
    fetchTestSuites()
  }, [])

  return (
    <div>
      <Logo className="mc-mt-3" />
      <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
      <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Test Suites</h5>
        <Separator />
        <div className="row">
          <div className="col-6">
            {!!testSuites && <TestSuites testSuites={testSuites} />}
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
      tests: PropTypes.object.isRequired
    })
  )
}

export default HomePage
