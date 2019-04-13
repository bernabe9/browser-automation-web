import React, { useEffect } from 'react'

import Header from 'components/Header'

const SuiteExecutionPage = ({ suiteExecution, fetchSuiteExecution }) => {
  useEffect(() => {
    fetchSuiteExecution()
  }, [])

  return (
    <div>
      <Header />
      {suiteExecution && (
        <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
          {JSON.stringify(suiteExecution)}
        </div>
      )}
    </div>
  )
}

export default SuiteExecutionPage
