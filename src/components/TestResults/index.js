import React from 'react'
import PropTypes from 'prop-types'

import AncestorTitles from './AncestorTitles'
import Result from './Result'

const TestResults = ({ testResults }) => {
  return (
    <div>
      {testResults.map((testResult, index) => (
        <AncestorTitles key={index} ancestors={testResult.ancestorTitles}>
          <Result
            status={testResult.status}
            title={testResult.title}
            screenshots={testResult.screenshots}
          />
        </AncestorTitles>
      ))}
    </div>
  )
}

TestResults.propTypes = {
  testResults: PropTypes.array.isRequired
}

export default TestResults
