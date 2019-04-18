import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import Environment from 'components/Environment'
import TestSuiteForm from './TestSuiteForm'
import TestsPicker from './TestsPicker'
import SelectedTests from './SelectedTests'

const CreateTestSuite = ({ history }) => {
  const [selectedTests, setSelectedTests] = useState(new Set([]))
  const [submitted, setSubmitted] = useState(false)

  const onAddTest = test => {
    selectedTests.add(test)
    const newSelectedTests = new Set([...selectedTests])
    setSelectedTests(newSelectedTests)
  }

  const onRemoveTest = test => {
    selectedTests.delete(test)
    const newSelectedTests = new Set([...selectedTests])
    setSelectedTests(newSelectedTests)
  }

  const onSubmit = suite => {
    setSubmitted(true)
    if (selectedTests.size === 0) {
      return
    }
    return api('/suites', {
      method: 'post',
      body: { ...suite, tests: selectedTests }
    }).then(() => {
      history.push('/')
    })
  }

  return (
    <div>
      <Header />
      <Environment />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Create Test Suite</h5>
        <Separator />
        <div className="row mc-my-4">
          <div className="col-7">
            <TestsPicker
              onAddTest={onAddTest}
              onRemoveTest={onRemoveTest}
              selectedTests={selectedTests}
            />
          </div>
          <div className="col-5">
            <SelectedTests
              selectedTests={selectedTests}
              showError={submitted && selectedTests.size === 0}
            />
            <TestSuiteForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

CreateTestSuite.propTypes = {
  history: PropTypes.object.isRequired
}

export default CreateTestSuite
