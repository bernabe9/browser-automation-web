import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import Anchor from 'components/Anchor'
import Header from 'components/Header'
import Environment from 'components/Environment'
import routes from 'constants/routesPaths'
import TestsPicker from 'components/TestPicker'
import TestSuiteForm from 'components/TestSuiteForm'
import SelectedTests from 'components/SelectedTests'

const EditTestSuite = ({ history, match }) => {
  const { name, url, description, production, tests } = history.location.state
  const [selectedTests, setSelectedTests] = useState(new Set([...tests]))
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
    const { id, repositoryOwner, repositoryName } = match.params
    const repository = `${repositoryOwner}/${repositoryName}`
    return api('/suites', {
      method: 'put',
      body: { id, ...suite, tests: selectedTests, repository }
    }).then(() => {
      history.push(routes.dashboard(match.params))
    })
  }

  const onDelete = () => {
    const { id } = match.params
    return api('/suites', {
      method: 'delete',
      body: { id }
    }).then(() => {
      window.location = routes.dashboard(match.params)
    })
  }

  return (
    <div>
      <Header />
      <Environment />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mc-text-h5 mc-mr-2">Edit Test Suite</h5>
          <Anchor onClick={onDelete}>Delete Suite</Anchor>
        </div>
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
            <TestSuiteForm
              onSubmit={onSubmit}
              initialValues={{
                name,
                url,
                description,
                production
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

EditTestSuite.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default EditTestSuite
