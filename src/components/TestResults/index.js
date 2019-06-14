import React from 'react'
import PropTypes from 'prop-types'

import AncestorTitles from './AncestorTitles'
import Result from './Result'

const TestResults = ({ testResults, onRerun }) => {
  return (
    <div>
      {testResults.map((testResult, index) => (
        <AncestorTitles key={index} ancestors={testResult.ancestorTitles}>
          <Result
            status={testResult.status}
            title={testResult.title}
            screenshots={testResult.screenshots}
            onRerun={onRerun}
          />
        </AncestorTitles>
      ))}
    </div>
  )
}

TestResults.propTypes = {
  testResults: PropTypes.array.isRequired,
  onRerun: PropTypes.func
}

export default TestResults
